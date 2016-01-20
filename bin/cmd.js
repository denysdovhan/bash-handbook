#!/usr/bin/env node

var fs = require('fs');
var obj = require('through2').obj;
var pager = require('default-pager');
var msee = require('msee');
var join = require('path').join;
var boxen = require('boxen');
var chalk = require('chalk');
var updateNotifier = require('update-notifier');
var pkg = require('../package.json');

var boxenOpts = {
  borderColor: 'yellow',
  margin: {
    bottom: 1
  },
  padding: {
    right: 1,
    left: 1
  }
};

var mseeOpts = {
  paragraphEnd: '\n\n'
};

var notifier = updateNotifier({
  pkg: pkg
});

fs.createReadStream(join(__dirname, '../README.md'))
  .pipe(obj(function (chunk, enc, cb) {
    var message = [];

    if (notifier.update) {
      message.push('Update available: ' + chalk.green.bold(notifier.update.latest) + chalk.dim(' (current: ' + notifier.update.current + ')'));
      message.push('Run ' + chalk.blue('npm install -g ' + pkg.name) + ' to update.');
      this.push(boxen(message.join('\n'), boxenOpts));
    }

    this.push(msee.parse(chunk.toString(), mseeOpts));
    cb();
  }))
  .pipe(pager());
