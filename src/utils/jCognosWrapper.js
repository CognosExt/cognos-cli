const jcognos = require('jcognos');
const path = require('path');
const chalk = require('chalk');

/*program.debug = settings.debug;
program.url = settings.url;
program.user = settings.user;
program.namespace = settings.namespace;
program.password = settings.password;
*/

function getCognos(options, debug = false) {
  /* First Load default Settings file, if it exists */
  var settingsjson = path.resolve('Settings.json');
  var settings = {
    url: '',
    user: '',
    namespace: '',
    password: '',
  };
  try {
    settings = require(settingsjson);
  } catch (e) {
    // use the defaults
  }
  if (options.config !== undefined) {
    var lconfig = path.resolve(options.config);
    var settings = require(lconfig);
  }

  var url = options.url ? options.url : settings.url;
  var user = options.user ? options.user : settings.user;
  var password = options.password ? options.password : settings.password;
  var namespace = options.namespace ? options.namespace : settings.namespace;
  if (debug) {
    console.log('url: ' + url);
    console.log('user: ' + user);
    console.log('password length: ' + password.length);
    console.log('namespace: ' + namespace);
  }

  if (!url) {
    console.error(chalk.red('--url parameter missing.'));
    process.exit(1);
  }
  if (!user) {
    console.error(chalk.red('--user parameter missing.'));
    process.exit(1);
  }
  if (!password) {
    console.error(chalk.red('--password parameter missing.'));
    process.exit(1);
  }

  return jcognos
    .getCognos(url, debug, 60000, true)
    .then(function (lcognos) {
      if (!lcognos.loggedin) {
        return lcognos.login(user, password, namespace);
      }
      return Promise.resolve(lcognos);
    })
    .catch(function (err) {
      console.log(chalk.red(err));
      process.exit(1);
    });
}

module.exports = getCognos;
