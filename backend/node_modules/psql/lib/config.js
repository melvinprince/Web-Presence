var config = require('yaml-config');
var settings = config.readConfig('./config/app.yml');

module.exports = settings;