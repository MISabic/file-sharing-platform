const Joi = require('joi');

const downloadFile = {
  params: Joi.object().keys({
    publicKey: Joi.string().guid({
      version: [
        'uuidv4',
        'uuidv5'
      ]
    }),
  }),
};

const deleteFile = {
  params: Joi.object().keys({
    privateKey: Joi.string().guid({
      version: [
        'uuidv4',
        'uuidv5'
      ]
    }),
  }),
};

module.exports = {
  downloadFile,
  deleteFile,
};
