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
var meow = require('meow');

var cli = meow([
  'Usage',
  '  bash-handbook',
  '',
  'Options',
  '  --lang, -l  Translation language',
  '',
  'Examples',
  '  bash-handbook',
  '  bash-handbook --lang pt-br'
], {
  string: [
    'lang'
  ],
  alias: {
    l: 'lang',
    h: 'help'
  },
  default: {
    lang: ''
  }
});

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

process.env.PAGER = process.env.PAGER || 'less';
process.env.LESS  = process.env.LESS  || 'FRX';

var lang = cli.flags.lang.toLowerCase()
  .split('-')
  .map(function (l, i) {
    return i === 0 ? l : l.toUpperCase();
  })
  .join('-');

var translation = join(__dirname, !lang ?
  '../README.md' :
  '../translations/' + lang + '/README.md');

fs.stat(translation, function (err, stats) {
  if (err) {
    console.log('The %s translation does not exist', chalk.bold(lang));
    return;
  }

  fs.createReadStream(translation)
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
});
