#!/usr/bin/env node
const getUpload = require('./commands/upload');
//const getExamples = require("./commands/examples");
const package = require('../package.json');
const getMCognosInit = require('./commands/mcognosinit');
const getMCognosUpdate = require('./commands/mcognosupdate');

var program = require('commander');
program.option('-d, --debug', 'Shows debug output').version(package.version);
getUpload(program);
//program = getExamples(program);
getMCognosInit(program);
getMCognosUpdate(program);
program.parse(process.argv);
