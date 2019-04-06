#!/usr/bin/env node
const getUpload = require('./commands/upload');
//const getExamples = require("./commands/examples");
const package = require('../package.json');
const getMCognosInit = require('./commands/mcognosinit');
const getMCognosUpdate = require('./commands/mcognosupdate');
const getExport = require('./commands/export');
const getImport = require('./commands/import');
const defaultPalettes = require('./commands/defaultpalettes');
const deletePalette = require('./commands/deletepalette');

var program = require('commander');

program.option('-d, --debug', 'Shows debug output').version(package.version);
getUpload(program);
getMCognosInit(program);
getMCognosUpdate(program);
getExport(program);
getImport(program);
defaultPalettes(program);
deletePalette(program);
program.parse(process.argv);
