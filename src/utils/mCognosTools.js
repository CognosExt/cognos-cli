const fs = require('fs');
const path = require('path');
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');

const configFile = require('../utils/configXML');

class mCognosTools {
  constructor() {
    var me = this;
    me.debug = false;
  }

  CheckIfmCognos() {
    /* First check if we are in the Root of an mCognos project */
    var packagejson = path.resolve('package.json');
    try {
      var pack = require(packagejson);
      if (pack.name !== 'mCognos') {
        console.error(chalk.red('This is not an mCognos root directory'));
        process.exit(1);
      }
    } catch (err) {
      console.error(
        chalk.red(
          'Are you sure you are in an mCognos root directory? package.json not found.'
        )
      );
      process.exit(1);
    }
    this.version = pack.version;
  }

  LoadOptions(file, options) {
    this.file = file;
    this.debug = options.parent.debug !== undefined;
    this.silent = options.silent !== undefined;
    this.customize = options.customize !== undefined;
    if (this.debug) {
      console.log(this);
    }

    if (this.debug) {
      console.log('options.customize: ' + chalk.cyan(this.customize));
      console.log('options.silent: ' + chalk.cyan(this.silent));
      console.log('An optional file: ' + chalk.cyan(this.file));
    }
  }

  SetConfigurationFile() {
    this.cfile = path.resolve(this.file);
  }

  LoadSettings() {
    var settings = {};
    try {
      this.settings = require(this.cfile);
    } catch (err) {
      if (this.file === false) {
        console.error(
          chalk.red(
            'Can not find the CustomSettingsTemplate file. Are you running this command in the mCognos root folder?'
          )
        );
      } else {
        console.error(chalk.red('File not found: ' + this.file));
      }
      process.exit(1);
    }
  }

  PromptUser() {
    co(function*() {
      var settings = this.settings;
      // appId
      var appId = yield prompt(
        settings.appId ? 'appId (' + settings.appId + '): ' : 'appId: '
      );
      settings.appId = appId ? appId : settings.appId;
      // name
      var name = yield prompt(
        settings.name ? 'name (' + settings.name + '): ' : 'name: '
      );
      settings.name = name ? name : settings.name;
      // description
      var description = yield prompt.multiline(
        settings.description
          ? 'description (' + settings.description + '): '
          : 'description: '
      );
      settings.description = description ? description : settings.description;
      //commands/
      // authorname
      var authorname = yield prompt(
        settings.author.name
          ? 'author name (' + settings.author.name + '): '
          : 'author name: '
      );
      settings.author.name = authorname ? authorname : settings.author.name;

      // authoremail
      var authoremail = yield prompt(
        settings.author.email
          ? 'author email (' + settings.author.email + '): '
          : 'author email: '
      );

      settings.author.email = validateEmail(authoremail)
        ? authoremail
        : settings.author.email;

      // license
      var license = yield prompt(
        settings.license ? 'license (' + settings.license + '): ' : 'license: '
      );
      settings.license = license ? license : settings.license;

      // default prompt
      if (settings.prompts) {
        var prompts = Object.keys(settings.prompts);
        if (prompts.length > 0) {
          var myprompt = yield prompt(
            prompts[0]
              ? 'Default filter prompt (' + prompts[0] + '): '
              : 'Default filter prompt: '
          );

          if (myprompt !== prompts[0]) {
            delete settings.prompts[prompts[0]];
          }
          if (myprompt) {
            var myvalue = yield prompt(
              settings.prompts[myprompt]
                ? 'Default prompt filter (' + settings.prompts[myprompt] + '): '
                : 'Default prompt filter: '
            );

            settings.prompts[myprompt] = myvalue ? myvalue : '';
          }
        }
      }
      this.settings = settings;
    });
  }

  WriteSettings() {
    fs.writeFileSync(
      './CustomSettings.json',
      JSON.stringify(this.settings, null, 2),
      'utf8',
      function(err) {
        if (err) {
          console.error('There was an error', err);
          console.log(err);
        }
      }
    );
    console.log(chalk.green('CustomSettings.json was saved.'));
  }

  WriteXMLFile() {
    var settings = this.settings;
    if (this.debug) {
      console.log(settings);
      console.log(configFile.XML());
    }
    configFile.setId(settings.appId);
    configFile.setVersion(this.version);
    configFile.setDescription(settings.description);
    configFile.setAuthor(settings.author.name);
    configFile.setAuthorEmail(settings.author.email);
    fs.writeFileSync('./config.xml', configFile.XML(), 'utf8', function(err) {
      if (err) {
        return console.error(chalk.red(err));
      }
    });
    console.log(chalk.green('config.xml was saved'));
  }
}

module.exports = new mCognosTools();
