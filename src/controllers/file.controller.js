const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { fileService } = require('../services');
const path = require('path');

const uploadFile = catchAsync(async (req, res) => {
  const fileInformation = await fileService.uploadFile(req);
  res.status(httpStatus.CREATED).send(fileInformation);
});

const downloadFile = catchAsync(async (req, res) => {
  const { publicKey } = req.params;
  const file = await fileService.getFileByKey({ publicKey });
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  await fileService.updateDownloadCounter({ publicKey });
  const filePath = path.join(rootFolder, file.fileName);
  res.download(filePath);
});

const deleteFile = catchAsync(async (req, res) => {
  await fileService.deleteFileByKey(req.params.privateKey);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  uploadFile,
  downloadFile,
  deleteFile,
};
