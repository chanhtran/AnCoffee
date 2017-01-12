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

router.get('/:id', function(req, res, next) {
    var connection = null;
    db
        .getConnection()
        .then(function(conn) {
            connection = conn;
            return menuService.getEditMenu(connection, req.params.id);
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
        .then(function(result) {
            data = result;
            return connection.commit();
        })
        .then(function() {
            res.json(data)
        })
        .catch(function(err) {
            next(err);
            return connection.rollback();
        })
        .finally(function() {
            if (connection) connection.release();
        })
        .done();
});

router.delete('/:id', function(req, res, next) {
    var connection = null;
    db
        .getConnection()
        .then(function(conn) {
            connection = conn;
            return menuService.deleteMenu(connection, req.params.id);
        })
        .then(function(result) {
            data = result;
            return connection.commit();
        })
        .then(function() {
            res.json(data)
        })
        .catch(function(err) {
            next(err);
            return connection.rollback();
        })
        .finally(function() {
            if (connection) connection.release();
        })
        .done();
})


module.exports = router;