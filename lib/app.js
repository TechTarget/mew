// modules
var cfg = require(process.cwd() + '/lib/config/user.json'),
    msg = require(process.cwd() + '/lib/modules/messaging'),
    check = require(process.cwd() + '/lib/modules/exceptionHandling'),
    sites = require(process.cwd() + '/lib/modules/sites'),
    build = require(process.cwd() + '/lib/modules/build'),
    release = require(process.cwd() + '/lib/modules/release'),
    notify = require(process.cwd() + '/lib/modules/notify'),
    _ = require('underscore'),
    openBrowser = require('open'),
    wrench = require('wrench');

// creates a new microsite instance and copies in boilerplate code
exports.createSite = function (sitename, dirname) {

  var url;

  // check user errors
  try {
    check.that('hasSiteName', [sitename], 'create');
    check.that('siteDoesNotExist', [sitename]);
  } catch (e) {
    return;
  }

  // if no directory name argument is passed, default to
  // using a lowercase version of the sitename
  if (typeof dirname === 'undefined') {
    dirname = sitename.toLowerCase();
  }

  // make sure the directory is lowercase before creating
  dirname.toLowerCase();

  // make sure that the dirname doesn't already exist
  try {
    check.that('directoryAlreadyExists', [dirname]);
  } catch (e) {
    return;
  }

  // add the new site to micrositeList
  sites.addNewSite(sitename, dirname);

  // copy boilerplate folder into new microsite directory
  build.copyBoilerplate(dirname);

  // local url to view site
  url = cfg.localDevelopmentServer + dirname + '/';

  // open new microsite in browser
  openBrowser(url, cfg.browser);

  // log success
  msg.con('info', 'siteCreated', sitename);

  // send email on site creation if enabled
  if (cfg.notifications.create.sendEmails) {
    msg.con('info', 'emailSending', sitename + ' creation');
    notify.send('create', {
      site: sitename,
      user: cfg.fullname
    });
  }

  return;

};

// for developing a new site
exports.developSite = function (sitename) {

  // 0. starts a simple node server that displays
  // 1. should watch the dev directory of sitename for file changes
  // 2. on file change it will compile necessary scripts and refresh the browser
  //  - different possibilities for this... could use native watch tools for sass & jade?

  // check user errors
  try {
    check.that('hasSiteName', [sitename], 'develop');
    check.that('siteExists', [sitename]);
  } catch (e) {
    return;
  }

  return msg.log('info', 'watching ' + sitename + '...');

};

// first it compiles the site code inside 'src' to a new folder called 'build'
exports.buildSite = function (sitename) {

  // 1. check if build directory exists, if not create it
  // 2. compile javascript modules to javascript directory
  // 3. compile sass to style.css in css directory
  // 4. compile jade templates
  //    -- need to variable flag to switch require.js in jade template to script.js
  // 5. create minified versions of js & css
  // 6. create source maps

  // need to check for existense of "build" folder itself mkdirp?

  // check user errors
  try {
    check.that('hasSiteName', [sitename], 'build');
    check.that('siteExists', [sitename]);
  } catch (e) {
    return;
  }

  // does the build directory exist? if not, create it
  if (!build.doesBuildDirectoryExist(sitename)) {
    build.createBuildDirectory( sites.getSiteDir(sitename) );
  }

  // compile js w/ require.js
  // build.compileAssets(sitename);

  return;

};

// this function "releases" a microsite by FTPing the file assets
// from the build directory to the media server environment specified
exports.releaseSite = function (sitename, message, assets, env) {

  // 1. check that all required vars have been passed by command line
  // 2. check that the build directory has been created
  // 3. check which assets need to be released
    // @todo, ftp release files need to take into account the environment in their paths
  // 4. ftp to server
  // 5. increment 'releases' property in micrositeList.json
  // 6. store release notes somewhere?

  var dirname, localPaths, remotePaths, environments = ['eng', 'qa', 'prod']; // media server environments

  // check user errors
  try {
    check.that('hasSiteName', [sitename], 'release');
    check.that('siteExists', [sitename]);
    check.that('hasReleaseNotes', [message]);
    check.that('environmentSpecified', [env]);
    check.that('correctEnvironment', [environments, env]);
    check.that('buildDirectoryExists', [sites.getSiteDir(sitename)]);
  } catch (e) {
    return;
  }

  msg.con('info', 'releasingSite', sitename);

  // get directory name of site being released
  dirname = sites.getSiteDir(sitename);

  // get an array of requested assets
  assets = build.assetsToArray(assets);

  // paths of local files that will be uploaded to media server
  localPaths = build.getAssetPaths(sitename, 'local', assets, env);

  // ftp files to remote server
  release.pushToRemoteServer(localPaths, dirname, env);

  // send email on release if enabled
  if (cfg.notifications.release.sendEmails) {

    // paths of files as they will be found on the media server
    remotePaths = build.getAssetPaths(sitename, 'ftp', assets, env);
    msg.con('info', 'emailSending', 'release notes');
    notify.send('release', {
      site: sitename,
      msg: message,
      date: '04/09/2013',
      files: remotePaths
    });

  }

  return;

};

// this function produces a set of urls that will be purged on the CDN
// then spawns a child process and passes those URLs to a CasperJS/PhantomJS script
// that then automates the process of purging files with the CDN tool
// assets is optional and defaults to "all'
exports.purgeCdn = function (sitename, assets) {

  var urls, spawn, purge;

  // check user errors
  try {
    check.that('hasSiteName', [sitename], 'purge');
    check.that('siteExists', [sitename]);
    check.that('buildDirectoryExists', [sites.getSiteDir(sitename)]);
  } catch (e) {
    return;
  }

  // get an array of requested assets
  assets = build.assetsToArray(assets);

  // get array of urls to be purged on cdn
  urls = build.getAssetPaths(sitename, 'cdn', assets);

  // check if any urls are returned
  if (urls.length < 1) {
    return msg.con('error', 'cdnPurgeNoUrls', sitename);
  }

  // start CDN purge
  msg.con('info', 'cdnPurgeStart');

  // list the urls that are being purged
  msg.log('list', '\t', urls.join('\n\t'));

  // pass urls to purge.js
  spawn = require('child_process').spawn;
  purge = spawn('casperjs', ['./lib/scripts/purgeCdn.js', urls]);

  // log purge.js results to console
  purge.stdout.on('data', function (data) {
    return msg.log('list', data);
  });

  purge.stdout.on('close', function (data) {
    msg.con('info', 'cdnPurgeEnd');
  });

  purge.stderr.on('data', function (data) {
    return msg.log('error', data);
  });

  return;

};

// "retire" a site by switching it's "isActive" property in micrositeList.json
exports.retireSite = function (sitename) {

  // check user errors
  try {
    check.that('hasSiteName', [sitename], 'retire');
    check.that('siteExists', [sitename]);
    check.that('siteRetired', [sitename]);
  } catch (e) {
    return;
  }

  return sites.updateSiteProperty(sitename, 'isActive', false, sitename + msg.str('info', 'siteRetired'));

};