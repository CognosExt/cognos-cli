const path = require('path');
const getCognos = require('../utils/jCognosWrapper');
const chalk = require('chalk');

function getUpload(program) {
  program
    .command('upload [object]')
    .alias('up')
    .description(
      'Upload either an extention or theme. eg. upload theme -e MyTheme.zip'
    )
    .option('-w --url [url]', 'URL of cognos server')
    .option('-u --user [user]', 'Cognos Username')
    .option('-p --password [password]', 'Cognos Password')
    .option(
      '-n --namespace [namespace]',
      'Cognos Namespace, when ommitted the default namespace is used'
    )
    .option(
      '-e, --extname <extname>',
      'The name of the extension or theme or for Visualisations, the id. Mandatory.'
    )
    .option(
      '-c, --config [config]',
      'A .json configuration file. Any command-line parameter will override settings in this config file. The default is Settings.json.'
    )
    .action(function (object, options) {
      if (
        typeof object !== 'string' ||
        !(
          object === 'theme' ||
          object === 'extension' ||
          object === 'visualisation'
        )
      ) {
        console.error(
          chalk.red(
            'The object type must be one of "theme" or "extension" or "visualisation"'
          )
        );
        process.exit(1);
      }
      console.log(options.extname);
      var file = path.resolve(options.extname);
      var debug = options.debug !== undefined;

      var extname = options.extname !== undefined;
      console.log(file);

      var prom = getCognos(options, true)
        .then(function (mycognos) {
          if (object == 'extension') {
            mycognos
              .uploadExtension(file, extname, 'extentions', { sslcheck: false })
              .then(function () {
                console.log('Uploaded Extension');
              })
              .catch(function (err) {
                console.log('Error uploading', err);
              });
          } else if (object == 'theme') {
            mycognos
              .uploadExtension(file, extname, 'themes', { sslcheck: false })
              .then(function () {
                console.log('Uploaded Theme');
              })
              .catch(function (err) {
                console.log('Error uploading', err);
              });
          } else if (object == 'visualisation') {
            console.log(options.extname);
            extname = options.extname.slice(0, -4);
            console.log(extname);
            mycognos
              .uploadExtension(file, extname, 'visualisation', {
                sslcheck: false,
              })
              .then(function () {
                console.log('Uploaded Visualisation');
              })
              .catch(function (err) {
                console.log('Error uploading', err);
              });
          } else if (object == 'file') {
            mycognos
              .upLoadDataFile(file)
              .then(function () {
                console.log('Uploaded Data File');
              })
              .catch(function (err) {
                console.log('Error uploading', err);
              });
          } else {
            console.error(chalk.red('Upload object unknown'));
            process.exit(1);
          }

          Promise.resolve(mycognos).then(function () {
            console.log('Done uploading');
            process.exit(0);
          });
        })
        .catch(function (err) {
          console.log(chalk.red(err));
          process.exit(1);
        });
      return prom;
    });

  return program;
}

module.exports = getUpload;
