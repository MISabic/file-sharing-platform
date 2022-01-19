const express = require('express');
const validate = require('../../middlewares/validate');
const config = require('../../config/config');
const { requestLimiter } = require('../../middlewares/rateLimiter');
const uploadFile = require('../../middlewares/fileUpload');
const fileValidation = require('../../validations/file.validation');
const fileController = require('../../controllers/file.controller');

const router = express.Router();

router.post('/', requestLimiter(config.dailyUploadLimit), uploadFile.single('file'), fileController.uploadFile);
router.get('/:publicKey', requestLimiter(config.dailyDownloadLimit), validate(fileValidation.downloadFile), fileController.downloadFile);
router.delete('/:privateKey', validate(fileValidation.deleteFile), fileController.deleteFile);

module.exports = router;
