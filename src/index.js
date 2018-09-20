#!/usr/bin/env node
const path = require('path');
const jcognos = require('jcognos');

var program = require('commander');
program
  .arguments('<action> <file>')
  .option('-a, --address <address>', 'The address of the cognos instance.')
  .option('-u, --username <username>', 'The user to authenticate as')
  .option('-p, --password <password>', "The user's password")
  .option(
    '-n, --namespace <namespace>',
    'The cognos namespace, if not the default'
  )
  .option(
    '-e, --extname <extname>',
    'The name of the extension or theme. Mandatory.'
  )
  .option('-p, --debug', 'Produce more output for debugging.')
  .option(
    '-c, --config <config>',
    'A .json configuration file. Any command-line parameter will override settings in this config file'
  )
  .action(function(action, file) {
    var file = path.resolve(file);
    if (program.config) {
      var lconfig = path.resolve(program.config);
      var config = require(lconfig);
    }
    program.address = config.address ? config.address : program.address;
    program.username = config.username ? config.username : program.username;
    program.password = config.password ? config.password : program.password;
    program.namespace = config.namespace ? config.namespace : program.namespace;
    program.extname = config.extname ? config.extname : program.extname;
    program.debug = config.debug ? config.debug : program.debug;

    jcognos.getCognos(program.address, program.debug).then(function(lcognos) {
      lcognos.login(program.username, program.password).then(function() {
        if (action == 'extension') {
          lcognos
            .uploadExtension(file, program.extname)
            .then(function() {
              console.log('Uploaded Extension');
            })
            .catch(function(err) {
              console.log('Error uploading', err);
            });
        } else if (action == 'theme') {
          lcognos
            .uploadExtension(file, program.extname, 'themes')
            .then(function() {
              console.log('Uploaded Theme');
            })
            .catch(function(err) {
              console.log('Error uploading', err);
            });
        } else if (action == 'file') {
          lcognos
            .upLoadDataFile(file)
            .then(function() {
              console.log('Uploaded Data File');
            })
            .catch(function(err) {
              console.log('Error uploading', err);
            });
        }
      });
    });
  })
  .parse(process.argv);
