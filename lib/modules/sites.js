// modules
var micrositeListJson = process.cwd() + '/lib/data/micrositeList.json',
    micrositeList = require(micrositeListJson),
    msg = require(process.cwd() + '/lib/modules/messaging.js'),
    fs = require('fs'),
    _ = require('underscore');

// microsite constructor
function Microsite(sitename, dirname) {
  this.createDate = Date.now(),
  this.isActive = true,
  this.isEmbedded = false,
  this.isOldDesign = false,
  this.siteDirectory = dirname,
  this.url = '',
  this.urlPreview = 'http://preview.techtarget.com:8080/' + sitename,
  this.releases = {
    count: 0,
    last: 0
  };
}

// saves whatever current value of micrositeList is to micrositeList.json
var saveMicrositeList = function(callback) {

  fs.writeFile(micrositeListJson, JSON.stringify(micrositeList, null, 2), function(err) {

    if (err) {
      return msg.err(err);
    } else {
      if (typeof callback === 'function') {
        return callback.call(this);
      }
    }

  });

};

// returns an array of microsite names
var getMicrositeList = function(status) {

  var microsites = micrositeList.sites,
      list = _.keys(microsites),
      sites = [];

  // iterrate through the microsite list and filter according to args.status
  for (var i = 0, len = list.length; i < len; i++) {

    if (status === 'published' && microsites[ list[i] ].isActive) {
      sites.push( list[i] );
    } else if (status === 'retired' && !microsites[ list[i] ].isActive) {
      sites.push( list[i] );
    } else if (typeof status === 'undefined') {
      sites.push( list[i] );
    }

  }

  // return alphabetically sorted list
  return sites.sort();

};

// export getMicrositeList function
exports.getMicrositeList = getMicrositeList;

// check if sitename exists in micrositeList
var doesSiteExist = function(sitename) {

  return micrositeList.sites.hasOwnProperty(sitename);

};

// export doesSiteExist function
exports.doesSiteExist = doesSiteExist;

// prints microsite lists to the console
exports.printMicrositeList = function(status) {

  var sites = getMicrositeList(status);

  count = sites.length;

  if (count > 0) {

    if (status === 'published') {
      msg.con('info', 'countActiveSites', count);
    } else if (status === 'retired') {
      msg.con('info', 'countRetiredSites', count);
    } else {
      msg.con('info', 'countTotalSites', count);
    }

    return msg.log('list', sites.join('\n'));

  } else {
    return msg.con('error', 'noTypeSites', status);
  }

};

// returns an array of microsite urls by environment (prod, preview)
exports.getMicrositeUrls = function(env) {

  var microsites = micrositeList.sites,
      envMap = {
        prod: 'url',
        preview: 'urlPreview'
      };

  // iterrate through the microsite list and return url based on env
  return  _.map( _.keys(microsites), function(site) {
    return { name: site, url: microsites[site][ envMap[env] ]};
  });

};

// returns the value of a site property
exports.getSiteProp = function(sitename, property) {

  // make sure valid site
  if (!doesSiteExist(sitename)) {
    return msg.con('error', 'siteDoesNotExist', sitename);
  }

  var prop = micrositeList.sites[sitename][property];

  // make sure valid property
  if (typeof prop === 'undefined') {
    return msg.con('error', 'notValidProperty', property);
  }

  return prop;

};

// DEPRECATED: use getSiteProp()
// check if sitename is active or retired
exports.isSiteActive = function(sitename) {
  return micrositeList.sites[sitename].isActive;
};

// DEPRECATED: use getSiteProp()
// microsite directory is usually a lowercase version of microsite name
// but not always, so get dir name from micrositeList.json
exports.getSiteDir = function(sitename) {
  return micrositeList.sites[sitename].siteDirectory;
};

// DEPRECATED: use getSiteProp()
// returns the url of a site
exports.getSiteUrl = function(sitename) {
  return micrositeList.sites[sitename].url;
};

// returns micrositeList object
exports.getMicrositeListObject = function() {

  return micrositeList;

};

// returns a list of all the microsite directories
exports.getAllSiteDirs = function(status) {

  // for now, type will just be active sites
  status = 'active';

  var microsites = micrositeList.site,
      list = _.keys(microsites),
      directories = [];

  for (var i = 0, len = list.length; i < len; i++) {

    if (microsites.list[i].isActive) {
      directories.push( microsites.list[i].siteDirectory );
    }

  }

  return directories;

};

// add a new site to micrositeList
exports.addNewSite = function(sitename, dirname) {

  micrositeList.sites[sitename] = new Microsite(sitename, dirname);
  saveMicrositeList(sitename + ' created');
  saveMicrositeList();

};

// updates the property of a site in micrositeList
exports.updateSiteProperty = function(sitename, property, value, successMessage) {

  // bail if the property doesn't exist
  if (!micrositeList.sites[sitename].hasOwnProperty(property)) {
    return msg.con('error', 'notValidProperty', property);
  }

  micrositeList.sites[sitename][property] = value;

  saveMicrositeList( function() {

    // log message on success
    return msg.con('info', 'genericMessage', successMessage);

  });

};