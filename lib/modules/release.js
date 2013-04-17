// modules
var cfg = require(process.cwd() + '/lib/config/user.json'),
    msg = require(process.cwd() + '/lib/modules/messaging'),
    _ = require('underscore'),
    jsftp = require('jsftp'),

    // file object types
    typeMap = ['file','folder'];

    // map environment value to correct remote path
    remoteServerPathMap = {
      eng: '/eng/test/',
      qa: '/qa/microsites/',
      prod: '/prod/microsites/'
    },

    // configuration for ftp connection
    ftpConfig = {
      host: cfg.ftp.host,
      port: cfg.ftp.port,
      onConnect: clientOnConnect,
      onError: clientOnError
    },

    // login info for ftp connection
    ftpAuth = {
      user: cfg.ftp.username,
      pass: new Buffer(cfg.ftp.password, 'base64').toString('ascii')
    };

// fires on start of successful FTP session
function clientOnConnect(foo) {
  return msg.con('info', 'ftpStarted', ftpConfig.host);
}

// fires when FTP session can't start
// one possible reason is that user isn't on network or vpn
function clientOnError(err) {
  if (err.code === 'ENOTFOUND') {
    return msg.con('error', 'ftpErrorVpn', ftpConfig.host);
  }
  return msg.con('error', 'ftpError', err);
}

// changes the remote working directory and creats one if it doesn't already exist
function ftpCwd(inPath, cb) {
  ftp.raw.cwd(inPath, function(err) {
    if(err){
      ftp.raw.mkd(inPath, function(err) {
        if(err) {
          log.error('Error creating new remote folder ' + inPath + ' --> ' + err);
          cb(err);
        } else {
          log.ok('New remote folder created ' + inPath.yellow);
          ftpCwd(inPath, cb);
        }
      });
    } else {
      cb(null);
    }
  });
}

// ftp files to remote server
exports.pushToRemoteServer = function(filePaths, dirname, env) {

  dirname = 'anotherDir3456';

  // console.log('begin release...');
  // console.log(filePaths);

  // start ftp session
  var ftp = new jsftp(ftpConfig);

  ftp.auth(ftpAuth.user, ftpAuth.pass, function(err, res) {

    if (err) return console.error(err);

    // change to the microsite directory of requested environment
    ftp.raw.cwd(remoteServerPathMap[env], function(err, res) {

      if (err) return console.error(err);

      // console.log(res.text);

    });

    // Listing a directory
    // ftp.ls(remoteServerPathMap[env], function(err, files){
    //   if (err) return console.error(err);
    //   _.each(files, function(file) {
    //     if (typeof file !== 'undefined') {
    //       console.log( typeMap[file.type] );
    //     }
    //   });
    // });

    // attempt to create a directory
    ftp.raw.mkd(dirname, function(err, res) {

      if (err) {
        if (err.code === 550) {
          return msg.con('warn', 'remoteDirAlreadyExists', dirname);
        } else {
          return console.error(err);
        }
      }

      // created a directory for sitename
      if (res.code === 257) {
        msg.con('info', 'creatingRemoteDirectory', dirname);
      } else {
        msg.log('info', res);
      }

    });

    // log out
    ftp.raw.quit(function(err) {

      if (err) { return console.log(err); }

      // all done
      return msg.con('info', 'ftpFinished');

    });

  });

};