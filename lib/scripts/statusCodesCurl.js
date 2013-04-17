// modules
var sites = require(process.cwd() + '/lib/modules/sites.js'),
    _ = require('underscore');

var siteList = _.sortBy(sites.getMicrositeUrls('prod'), function(site) {
      return site.name;
    }),
    spawn = require('child_process').spawn,
    curl = '';

var getStatusCodesWithCurl = function (siteName, url) {

  curl = spawn('curl', ['-s', '-o', '/dev/null', '-w', '"%{http_code}"', url]);

  curl.stdout.on('data', function (data) {
    console.log(data + ' -> ' + siteName);
  });

  curl.stderr.on('data', function (data) {
    console.log('error: ' + data);
  });

};

_.map(siteList, function(site, i) {
  getStatusCodesWithCurl(site.name, site.url);
});