var winston = require('winston');
var myCustomLevels = {
    levels: {
      debug: 0,
      info: 1,
      warning: 2,
      error: 3
    },
    colors: {
      debug: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red'
    }
  };

Logger = new (winston.Logger)({ levels: myCustomLevels.levels });
Logger.add(winston.transports.Console,{level: 'error', colorize: true });

module.exports = Logger;