// modules
var msg = require(process.cwd() + '/lib/modules/messaging'),
    sites = require(process.cwd() + '/lib/modules/sites'),
    build = require(process.cwd() + '/lib/modules/build'),
    _ = require('underscore');

var handlerMap = {

  // check if there's a name for the site
  hasSiteName: function(args, note) {
    if (typeof args[0] === 'undefined') {
      throw msg.con('error', 'missingSiteName', note);
    }
  },

  // check if a site exists by this name
  siteExists: function(args) {
    if (!sites.doesSiteExist(args[0])) {
      throw msg.con('error', 'siteDoesNotExist', args[0]);
    }
  },

  // check that a site doesn't already exist by this name
  siteDoesNotExist: function(args) {
    if (sites.doesSiteExist(args[0])) {
      throw msg.con('error', 'siteAlreadyExists');
    }
  },

  // check if directory already exists
  directoryAlreadyExists: function(args) {
    if (build.doesDevDirectoryExist(args[0])) {
      throw msg.con('error', 'dirAlreadyExists');
    }
  },

  // check if a site is already retired
  siteRetired: function(args) {
    if (!sites.getSiteProp(args[0], 'isActive')) {
      throw msg.con('error', 'siteAlreadyRetired', args[0]);
    }
  },

  // check if release notes were supplied
  hasReleaseNotes: function(args) {
    if (typeof args[0] === 'undefined' || typeof args[0] !== 'string') {
      throw msg.con('error', 'noReleaseNotes');
    }
  },

  // check if an environment was specified
  environmentSpecified: function(args) {
    if (typeof args[0] === 'undefined' || typeof args[0] !== 'string') {
      throw msg.con('error', 'noEnvSpecified');
    }
  },

  // check the the environment specified is in the available environments array
  correctEnvironment: function(args) {
    if ( !_.contains(args[0], args[1]) ) {
      throw msg.con('error', 'invalidEnvSpecified');
    }
  },

  // check that site has a build directory
  buildDirectoryExists: function(args) {
    if (!build.doesBuildDirectoryExist(args[0])) {
      throw msg.con('error', 'dirNotBuilt', args[0]);
    }
  }

};

// check for various user errors and return error message if problem discovered
// .that('exceptionName', argumentsArray, [message])
exports.that = function (exception, args, note) {

  var handler = handlerMap[exception];
  handler.call(null, args, note);

};