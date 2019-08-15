const path = require('path');
const getCognos = require('../utils/jCognosWrapper');
const chalk = require('chalk');

function getConfiguration(program) {
  program
    .command('config [object]')
    .alias('cf')
    .description('Read or set global configuration settings')
    .option('-w --write', 'Write Setting')
    .option('-k --key [key]', 'Key of the setting')
    .option('-v --value [value]', 'When writing, the required value of the key')
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
    .action(function(cmd, options) {
      var debug = options.debug !== undefined;
      var write = options.write;
      var key = options.key ? options.key : '';
      var value = options.value ? options.value : false;

      if (write && !value) {
        console.error(chalk.red('Missing value for write action'));
        process.exit(1);
      }

      return getCognos(options, debug).then(function(mycognos) {
        if (write) {
          return mycognos
            .setConfig(key, value)
            .then(function() {
              console.log('Set Key ' + key);
            })
            .catch(function(err) {
              console.log(chalk, red(err));
              process.exit(1);
            });
        } else {
          return mycognos
            .getConfigKey(key)
            .then(function(myvalue) {
              console.log(myvalue);
            })
            .catch(function(err) {
              console.log(chalk, red(err));
              process.exit(1);
            });
        }
      });
    });
}

module.exports = getConfiguration;
