const chalk = require('chalk');
const download = require('download-git-repo');

const mCognosTools = require('../utils/mCognosTools');

function getMCognos(program) {
  program
    .command('mcognosupdate [file]')
    .alias('mcu')
    .description('Update all files with your mCognos configuration')
    .option('-c, --customize', 'Customize mCognos current configuration')
    .option('-s, --silent', 'Ask no questions')
    .action(function(file, options) {
      if (file === undefined) {
        file = 'CustomSettings.json';
      }
      mCognosTools.CheckIfmCognos();

      mCognosTools.LoadOptions(file, options);

      mCognosTools.SetConfigurationFile();

      mCognosTools.LoadSettings();

      if (!mCognosTools.silent && mCognosTools.customize) {
        mCognosTools.PromptUser();
      }

      mCognosTools.WriteSettings();

      mCognosTools.WriteXMLFile();
      process.exit(0);
    });

  return program;
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function downloadProject() {
  download('flipxfx/download-git-repo-fixture', 'test/tmp', function(err) {
    console.log(err ? 'Error' : 'Success');
  });
}

module.exports = getMCognos;
