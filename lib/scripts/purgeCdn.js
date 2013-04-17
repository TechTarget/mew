// this is a CasperJS script (needs to be installed along with PhantomJS)

// load configuration file
var fs = require('fs');
var cfg = JSON.parse(fs.read('./lib/config/user.json'));

// location of local copy of jQuery
var jqLocal = './sites/dev/_global/javascript/jquery.js';

// instantiate casperjs
var casper = require('casper').create({
  verbose: true,
  logLevel: 'info', // debug
  clientScripts:  [
    jqLocal
  ],
  pageSettings: {
    loadPlugins: true
  },
  onError: function(self, m) {
    console.log('FATAL:' + m);
    self.exit();
  }
});

// display color in console logs
var colorizer = require('colorizer').create('Colorizer');

// CDN login credentials
var cdnUser = cfg.cdn.username;
var cdnPassword = window.atob(cfg.cdn.password); // decode from Base64

// CDN urls
var cdnUrl = cfg.cdn.url;
var cdnLoginUrl = cdnUrl + 'login.jsp';
var cdnLandingUrl = cdnUrl + 'index.jsp';
var cdnPurgeToolUrl = cdnUrl + 'purgetool/purgetool2.jsp';

// email addy where purge tool confirm emails are sent
var emailForConfirm = cfg.email;

// check if arguments have been passed into script
if (casper.cli.args.length === 0 ) {
  casper.echo(' No URLs passed ', 'ERROR').exit();
}

// startup casper and login to CDN
casper.start(cdnLoginUrl, function() {

  // couldn't use casper 'fill' method since there's no id on login form :/
  // so just execute in browser w/ jQuery
  // note: need to pass an object of any vars that will be needed
  this.evaluate(function(username, password) {
    jQuery.noConflict();
    jQuery('#user_id').val(username);
    jQuery('input:password').val(password);
    jQuery('form').submit();
  }, {
    username: cdnUser,
    password: cdnPassword
  });

});

// once we're logged in, move from landing page directly to purge tool
// this way we don't need to muck with iframes or flash plugins
casper.then(function() {

  // make sure we've been logged in
  this.waitFor(function check() {
    return (this.getCurrentUrl() === cdnLandingUrl);
  },
  function then() { // go to purge tool
    this.open(cdnPurgeToolUrl);
  },
  function timeout() { // or log error
    this.echo(' Couldn\'t login :( ', 'ERROR');
  });

});

// add urls to purge then submit form
casper.then(function() {

  // we have to use a global function to submit the form, so jQuery instead of .fill again
  this.evaluate(function(email, urls) {
    jQuery.noConflict();
    jQuery('#maillistText').val(email);
    jQuery('#urllist')
      .val(urls)
      .val(function( i, value ) {

        // replace commas after each url with line-breaks
        value = value.replace(/,/g, '\n');
        return value;

      });
    purge_exec(document.theForm);
  }, {
    email: emailForConfirm,
    urls: casper.cli.args
  });

});

// time to go
casper.run(function() {
  this.exit();
});