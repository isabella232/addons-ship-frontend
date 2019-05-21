"use strict";
exports.__esModule = true;
var next = require("next");
var express = require("express");
// const express = require('express')
var port = parseInt(process.env.PORT, 10) || 3000;
var dev = process.env.NODE_ENV !== 'production';
var app = next({ dev: dev });
var handle = app.getRequestHandler();
app.prepare().then(function () {
    var server = express();
    server.get('/a', function (req, res) {
        return app.render(req, res, '/a', req.query);
    });
});
