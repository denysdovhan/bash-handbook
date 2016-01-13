#!/usr/bin/env node

var fs = require('fs');
var obj = require('through2').obj;
var pager = require('default-pager');
var msee = require('msee');
var join = require('path').join;

var mseeOpts = {
  paragraphEnd: '\n\n'
};

fs.createReadStream(join(__dirname, '../README.md'))
  .pipe(obj(function (chunk, enc, cb) {
    this.push(msee.parse(chunk.toString(), mseeOpts));
    cb();
  }))
  .pipe(pager());
