const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const getCognos = require('../utils/jCognosWrapper');

function getImport(program) {
  program
    .command('import [file]')
    .alias('imp')
    .description('Import Objects')
    //    .option('-s, --silent', 'Ask no questions')
    .option('-w --url [url]', 'URL of cognos server')
    .option('-u --user [user]', 'Cognos Username')
    .option('-p --password [password]', 'Cognos Password')
    .option(
      '-n --namespace [namespace]',
      'Cognos Namespace, when ommitted the default namespace is used'
    )
    .option(
      '-c, --config [config]',
      'A .json configuration file. Any command-line parameter will override settings in this config file. The default is Settings.json.'
    )
    .action(function(file, options) {
      if (file === undefined) {
        file = 'palettes.json';
      }
      var debug = options.parent.debug !== undefined;

      var palettesfile = path.resolve(file);

      var palettes = require(palettesfile);
      var result = getCognos(options, debug)
        .then(function(mycognos) {
          var promisses = [];

          allpalettes = palettes.data;
          for (var i = 0; i < allpalettes.length; i++) {
            var palette = allpalettes[i];

            var upload = {
              content: palette.content,
              defaultName: palette.defaultName,
              public: true
            };

            var id = palette.id ? palette.id : false;

            var prom = mycognos
              .savePalette(upload, id)
              .then(function(data) {
                console.log('Saved Palette ' + data);
              })
              .catch(function(err) {
                console.error(chalk.red(err));
              });

            promisses.push(prom);
          }

          Promise.resolve(promisses).then(function() {
            console.log('Done');
            process.exit(0);
          });
        })
        .catch(function(err) {
          console.log(err);
        });
      Promise.resolve(result);
      return result;
    });

  return program;
}

module.exports = getImport;
