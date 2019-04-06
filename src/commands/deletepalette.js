const chalk = require('chalk');
const co = require('co');
const prompt = require('co-prompt');

const getCognos = require('../utils/jCognosWrapper');

function deletePalette(program) {
  program
    .command('deletepalette [id]')
    .alias('rmp')
    .description('Delete Palette(s)')
    .option('-a, --all', 'Delete all public palettes')
    .option('-s, --silent', 'Ask no questions')
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
    .action(function(id, options) {
      if (id && this.all) {
        console.error('Either delete an id or all, not both');
        process.exit(1);
      }

      this.all = options.all !== undefined;
      this.silent = options.silent !== undefined;

      var debug = options.parent.debug !== undefined;

      if (id) {
        var prom = getCognos(options, debug)
          .then(function(mycognos) {
            return mycognos.deletePalette(id);
          })
          .then(function() {
            console.log('Palette deleted ' + id);
            process.exit(0);
          })
          .catch(function(e) {
            console.error(chalk.red(e));
          });
        return prom;
      }
      if (this.all) {
        var sure = co(function*() {
          if (this.silent) {
            return true;
          }
          var result = yield prompt(
            'Are you sure you want to delete all palettes? (Y/N)'
          );

          if (result !== 'Y') {
            console.log('Delete Cancelled.');
            process.exit(0);
          }
          return result;
        }).then(function() {
          var result = getCognos(options, debug)
            .then(function(mycognos) {
              var palettes = mycognos.getPalettes();
              var proms = [];
              palettes.then(function(plts) {
                for (i = 0; i < plts.data.length; i++) {
                  var id = plts.data[i].id;
                  var prom = mycognos
                    .deletePalette(id)
                    .then(function() {
                      console.log('Deleted Palette ' + id);
                    })
                    .catch(function(err) {
                      console.error(chalk.red(err));
                    });

                  proms.push(prom);
                }

                Promise.all(proms).then(function() {
                  console.log('Deleted ' + proms.length + ' Palettes');
                  process.exit(0);
                });
              });
            })
            .catch(function(err) {
              console.log(err);
            });
          return result;
        });
      }
    });
  return program;
}

module.exports = deletePalette;
