var mysql = require('mysql');
var Q = require('q');
var logger = require('./logger.js');
var config = require('./../lib/config.js').query;

var query = function(servers,query) {
  this.query = query;
  this.servers = servers;
};

query.prototype.runAll = function() {
  var deferred = Q.defer();
  var promises = [];

  for (var i = 0; i < this.servers.length; i++) {
    var p = this.runOne(this.servers[i]);
    p.server = 'test';
    if(typeof(config.timeout) !== 'undefined' && config.timeout > 0) {
      p = p.timeout(config.timeout);
    }
    promises.push(p);
  };

  Q.allSettled(promises)
  .then(function(results) {
    Logger.info(results);
    deferred.resolve(results);
  });
  return deferred.promise;
}

/**
 * Runs the given query against the passed server
 * @return {promise}
 */
query.prototype.runOne = function(server) {
  var deferred = Q.defer();
  query = this.query;
  logger.info("Running "+query+" on "+server.host);
  //Connection
    //Query
  var connection = mysql.createConnection(server);
  connection.connect(function(err) {
    if(err) {
      deferred.reject("Connection failed for "+server.host,err);
      return;
    }

    connection.query(query, function(err, rows) {
      connection.destroy();
      if(err) {
        logger.error(err);
        deferred.reject("Query failed for "+server.host,err);
        return;
      }
      deferred.resolve({server: server, results: rows});
      connection.destroy();
    });
  })

  return deferred.promise;
}

module.exports = query;