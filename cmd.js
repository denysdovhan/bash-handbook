#!/usr/bin/env node

var fs = require('fs');
var obj = require('through2').obj;
var pager = require('default-pager');
var msee = require('msee');

fs.createReadStream(__dirname + '/README.md')
  .pipe(obj(function (chunk, enc, cb) {
    this.push(msee.parse(chunk.toString()));
    cb();
  }))
  .pipe(pager());
