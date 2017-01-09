'use strict';

var mysql = require('mysql');
var q = require('q');

var connectionPool = mysql.createPool({ host: 'localhost', port: 3306, user: 'root', password: '', database: 'ancoffee' });

function Connection(conn) {
    this.conn = conn;
    console.log('connecttion');
}

Connection.prototype.escape = function(param) {
    return this
        .conn
        .escape(param);
};

Connection.prototype.query = function query(sql, params) {
    var deferred = q.defer();
    var querySql = prepareQuery(sql, params);

    this
        .conn
        .query(querySql, function(err, rows) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(rows);
        });

    return deferred.promise;
};

Connection.prototype.release = function release() {
    if (this.conn) {
        this
            .conn
            .release();
    }
}

Connection.prototype.beginTransaction = function beginTransaction() {
    var deferred = q.defer();
    this
        .conn
        .beginTransaction(function(err, rows) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(rows);
        });

    return deferred.promise;
}

Connection.prototype.commit = function commit() {
    var deferred = q.defer();
    this
        .conn
        .commit(function(err, rows) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(rows);
        });

    return deferred.promise;
}

Connection.prototype.rollback = function rollback() {
    var deferred = q.defer();
    this
        .conn
        .rollback(function(err, rows) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(rows);
        });

    return deferred.promise;
}

function prepareQuery(query, parameters) {
    if (!parameters)
        return query;
    return query.replace(/\:(\w+)/g, function(txt, key) {
        if (parameters.hasOwnProperty(key)) {
            return mysql.escape(parameters[key]);
        }
        return txt;
    });
}

var getConnection = function() {
    var deferred = q.defer();
    connectionPool.getConnection(function(error, connection) {
        if (error) {
            deferred.reject(error);
        } else {
            deferred.resolve(new Connection(connection));
        }
    });

    return deferred.promise;
}

module.exports = {
    getConnection: getConnection
};