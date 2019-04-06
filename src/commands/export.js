const getCognos = require('../utils/jCognosWrapper');
const chalk = require('chalk');

function getExport(program) {
  program
    .command('export')
    .alias('exp')
    .description('Export Palettes')
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
    .action(function(options) {
      var debug = options.parent.debug !== undefined;

      var result = getCognos(options, debug)
        .then(function(mycognos) {
          var palettes = mycognos.getPalettes();
          palettes.then(function(jaja) {
            var str = JSON.stringify(jaja, null, 4);
            console.log(str);

            process.exit(0);
          });
        })
        .catch(function(err) {
          console.error(chalk.red(err));
        });
      return result;
    });

  return program;
}

module.exports = getExport;
