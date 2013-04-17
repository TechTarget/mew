// modules
var cfg = require(process.cwd() + '/lib/config/user.json'),
    msg = require(process.cwd() + '/lib/modules/messaging'),
    sites = require(process.cwd() + '/lib/modules/sites'),
    requirejs = require('requirejs'),
    fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    wrench = require('wrench');

// various directories
var dirs = {
  dev: './sites/dev/', // location of dev dirs
  build: './sites/build/', // location of build dirs
  boilerplate: './sites/dev/_boilerplate' // location of the boilerplate directory
};

// make dirs available for export
exports.dirs = dirs;

// pass in strings from console and this function returns a 'cleaned up' array
var cleanAssets = function(assets) {

  var fixedAssets = [];

  // convert asset strings to array
  assets = assets.split(',');

  // remove whitespace
  _.map(assets, function(asset) {
    fixedAssets.push(asset.replace(/\s/g, ''));
  });

  // if for some reason this func doesn't work, return null
  if (!_.isArray(fixedAssets)) {
    return fixedAssets = [null];
  }

  return fixedAssets;

};

// checks that all the assets passed are valid
var isValidAsset = function(assets) {

  // asset directories on the media server
  var assetTypes = ['javascript', 'css', 'images'],
      invalidAssetTypes = [];

  assets = cleanAssets(assets);

  _.each(assets, function(asset) {

    if ( !_.contains(assetTypes, asset) ) {
      return invalidAssetTypes.push(asset);
    }

  });

  // if any of the asset(s) specified are not valid return false
  if (invalidAssetTypes.length) {
    return false;
  }

  return true;

};

exports.isValidAsset = isValidAsset;
// make available for export

// use can specifiy which types of assets should be released
// if assets have been passed, convert to array and confirm
// that it's an allowable type of asset
// if no assets are specified, assign all possible asset types to assets var
exports.assetsToArray = function (assets) {

  var defaultAssets = ['javascript', 'css', 'images'];

  if (typeof assets !== 'undefined') {

    // make sure they're all valid assets
    // @todo pretty sure this is redundant
    if (isValidAsset(assets)) {

      // ugh, this is being called twice :(
      assets = cleanAssets(assets);

    }

  } else {
    assets = defaultAssets;
  }

  return assets;

};

// returns an array of all the compiled front-end file names of the microsite assets
// destination can be 'ftp', 'cdn', or null, the latter of which just returns a file list
// assetTypes are either 'javascript', 'css', 'images' or any combination of the three
// environment is 'eng', 'qa' or 'prod'
exports.getAssetPaths = function (sitename, destination, assetTypes, environment) {

  // vars to hold various files & directory paths
  var files, filePaths = [], assetFiles = {};

  // regex to filter out any file that doesn't end with 'css, js, png, gif, jpg, jpeg'
  var allowedFileTypes = /(.*.(jpe?g|gif|png|css|js))/gi;

  // microsite directory
  var siteDir = sites.getSiteDir(sitename);

  // local directory of assets
  var localDir = path.join(__dirname, '../../', dirs.build, siteDir, '/');

  // file paths
  var destinationMap = {
    local: localDir,
    ftp: cfg.ftp.mediaPath[environment] + path.join('microsites/', siteDir, '/'),
    cdn: cfg.cdn.mediaPath + path.join('microsites/', siteDir, '/')
  };

  // update assetFiles object with asset types and file names that will be released
  _.map(assetTypes, function (assetType) {

    // get all the assets of requested type
    files = wrench.readdirSyncRecursive(localDir + assetType);

    // remove unallowed file types
    assetFiles[assetType] = _.filter(files, function (file) {
      return file.match(allowedFileTypes);
    });

  });

  // return the assetFiles object if no destination indicated
  if (typeof destination === 'undefined' || !destination) {
    return assetFiles;
  }

  // create array of file paths
  _.map(assetFiles, function (files, assetType) {

    _.map(files, function(file) {
      filePaths.push(destinationMap[destination] + assetType + '/' + file);
    });

  });

  return filePaths;

};

// copies the boilerplate directory into the specified directory
exports.copyBoilerplate = function(dirname) {
  return wrench.copyDirSyncRecursive(dirs.boilerplate, dirs.dev + dirname);
};

// create build directory
exports.createBuildDirectory = function(dirname) {

  msg.con('info', 'creatingBuildDirectory');
  return wrench.mkdirSyncRecursive(dirs.build + dirname, parseInt('0777', 8));

};

// check if a local dev directory exists
exports.doesDevDirectoryExist = function (dirname) {

  // if no dirname is sent, returning true will prevent anything from being created
  if (typeof dirname === 'undefined') { return true; }

  var devDir = path.join(__dirname, '../../', dirs.dev, dirname);
  return fs.existsSync(devDir);

};

// check if a local build directory exists
exports.doesBuildDirectoryExist = function (dirname) {

  var buildDir = path.join(__dirname, '../../', dirs.build, dirname);
  return fs.existsSync(buildDir);

};

// compile func
exports.compileAssets = function (sitename) {

  var requirejs = require('requirejs');

  var config = {
    name: dirs.dev + '_global/javascript/almond',
    include: dirs.dev + sitename + '/javascript/main',
    out: dirs.build + sitename + '/javascript/script.js',
    wrap: true,
    optimize: 'none'
  };

  requirejs.optimize(config, function (buildResponse) {
    // console.log(config);
    // console.log(buildResponse);
    //buildResponse is just a text output of the modules
    //included. Load the built file for the contents.
    //Use config.out to get the optimized file contents.
    var contents = fs.readFileSync(config.out, 'utf8');
    console.log(contents);
    // return msg.con('info', 'buildingSiteStart', sitename);
  }, function (err) {
    return msg.con('error', 'genericError', err);
  });

};