const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;
const filename = 'config.xml';

class ConfigXML {
  constructor() {
    var me = this;
    try {
      var data = fs.readFileSync(filename, 'utf-8');
      me.DOM = new DOMParser().parseFromString(data, 'text/xml');
    } catch (e) {}
  }

  setId(appId) {
    this.DOM.getElementsByTagName('widget')[0].setAttribute('id', appId);
  }
  setVersion(version) {
    this.DOM.getElementsByTagName('widget')[0].setAttribute('version', version);
  }
  setDescription(description) {
    this.DOM.getElementsByTagName(
      'description'
    )[0].childNodes[0].data = description;
  }
  setAuthor(author) {
    this.DOM.getElementsByTagName('author')[0].childNodes[0].data = author;
  }
  setAuthorEmail(email) {
    this.DOM.getElementsByTagName('author')[0].setAttribute('email', email);
  }
  XML() {
    //SERIALIZE TO STRING
    var xmlString = new XMLSerializer().serializeToString(this.DOM);
    return xmlString;
  }
}

module.exports = new ConfigXML();
