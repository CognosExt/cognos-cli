var config = {};
try {
  config = require('./CognosConfig');
} catch (e) {
  // do nothing
}

module.exports = config;
