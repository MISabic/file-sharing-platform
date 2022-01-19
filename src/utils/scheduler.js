const cron = require('node-cron');
const config = require('../config/config');
const fileService = require('../services/file.service');

cron.schedule(`59 23 */${config.allowedInactivityPeriod} * *`, async () => {
    await fileService.deleteInactiveFile();
})