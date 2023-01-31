"use strict";
const fun = require('./app');
const serverless = require('serverless-http');
module.exports.handler = serverless(fun);
