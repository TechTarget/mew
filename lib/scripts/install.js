// modules
var pkg = require(process.cwd() + '/package.json'),
    fs = require('fs'),
    prompt = require('prompt'),
    util = require('util');

// ascii logo
sVer = pkg.version,
configPath = './lib/configNew/',
configFileName = 'user.json',

// configuration model
config = {
  username: '',
  fullname: '',
  email: '',
  language: 'en',
  os: '',
  browser: '',
  useLocalServers: false,
  localServers: {
    documentation: '',
    dev: '',
    build: ''
  },
  ftp: {
    host: '',
    port: 21,
    mediaPath: '',
    username: '',
    password: ''
  },
  cdn: {
    url: '',
    mediaPath: '',
    username: '',
    password: ''
  },
  smtp: {
    emailService: '',
    emailUser: '',
    emailPassword: ''
  },
  notifications: {
    create: {
      sendEmails: false,
      emailTemplateName: 'newSiteEmail',
      emailSubject: 'New microsite created: ',
      recipients: []
    },
    release: {
      sendEmails: false,
      emailTemplateName: 'releaseEmail',
      emailSubject: 'Release details for: ',
      recipients: []
    }
  }
};

// saves current value of config object is to file system
var saveConfigFile = function (callback) {

  fs.writeFile(configPath + configFileName, JSON.stringify(config, null, 2), function(err) {

    if (err) {
      return msg.err(err);
    } else {
      if (typeof callback === 'function') {
        return callback.call(this);
      }
    }

  });

};

var makeConfigFile = function() {

  console.log('make config file now');

  // prompt user for information for configuration

  // save config file to disk
  saveConfigFile( function() {
    console.log('saved config file');
  });
};


// https://github.com/flatiron/prompt
// http://jamesreggers.com/2012/08/08/using-npm-scripts-for-client-side-module-installation/
// (note: passwords must be base64 encoded)













// BEGIN INSTALL

// console.log('\n');
// console.log(logo);
// console.log('\ninstalling MEW version ' + sVer + '...\n');

// check if config dir exists
fs.exists(configPath, function(exists) {

  if (exists) {

    // check if config file exists
    fs.exists(configFileName, function(exists) {

      // if config folder and file exist, do nothing
      // otherwise make the config file
      if (exists) {
        return;
      } else {
        makeConfigFile();
      }

    });

  } else {

    // create config dir then make the config file
    fs.mkdir(configPath, function(err) {

      if (err) { return console.log(err); }

      makeConfigFile();

    });

  }

});






// console.log('\nAll done!');
// console.log('now open user.json and fill out the rest...');
// console.log('passwords must be Base64 encoded!');