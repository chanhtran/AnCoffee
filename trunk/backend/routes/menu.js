var express = require('express');
var q = require('q');
var db = require('../database/dbConnection');
var menuService = require('../services/menu');
var router = express.Router();

router.get('/', function(req, res, next) {
    var connection = null;
    db
        .getConnection()
        .then(function(conn) {
            connection = conn;
            return menuService.getMenus(connection);
        })
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            next(err);
        })
        .finally(function() {
            if (connection)
                connection.release();
        })
        .done();
});

router.post('/', function(req, res, next) {
    var connection = null;
    db
        .getConnection()
        .then(function(conn) {
            connection = conn;
            return menuService.addMenu(connection, req.body);
        })
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            next(err);
        })
        .finally(function() {
            if (connection)
                connection.release();
        })
        .done();
});

module.exports = router;