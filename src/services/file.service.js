const httpStatus = require('http-status');
const uuid = require('uuid');
const { File } = require('../models');
const ApiError = require('../utils/ApiError');
const path = require('path');
const fs = require('fs');
const { deleteFile } = require('../validations/file.validation');

const uploadFile = async ({ file }) => {
  const { filename } = file;

  const fileInformation = {
    publicKey: uuid.v4(),
    privateKey: uuid.v4(),
  };
  await File.create({ fileName: filename, ...fileInformation });
  return fileInformation;
};

const getInactiveFileNames = async () => {
  return await File.find({ downloadCounter: { $eq: 0 } }).select('fileName');
};

const getFileByKey = async (key) => {
  return File.findOne(key);
};

const updateDownloadCounter = async (key) => {
  await File.updateOne(key, {$inc: {downloadCounter: 1}});
};

const deleteInactiveFile = async () => {
  const files = await getInactiveFileNames();
  for(file of files) {
    const filePath = path.join(rootFolder, file.fileName);
    fs.unlink(filePath, () => {});
  }
  await File.deleteMany({ downloadCounter: { $eq: 0 } });
  await File.updateMany({}, { downloadCounter: 0 });
};

const deleteFileByKey = async (privateKey) => {
  const file = await getFileByKey({ privateKey });
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }

  const filePath = path.join(rootFolder, file.fileName);
  fs.unlink(filePath, () => console.log("File deleted successfully"));
  await file.remove();
  return file;
};

module.exports = {
  uploadFile,
  getFileByKey,
  updateDownloadCounter,
  deleteInactiveFile,
  deleteFileByKey,
};
