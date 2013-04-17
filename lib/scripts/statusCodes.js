// NOTE: this script is slow and poorly written; will not scale

// modules
var sites = require(process.cwd() + '/lib/modules/sites.js'),
    async = require('async'),
    request = require('request'),
    table = require('cli-table'),
    multimeter = require('multimeter');

var multi = multimeter(process),
    siteList = sites.getMicrositeUrls('prod'),
    siteListLength = siteList.length,
    sortBy = 'name', // name, url, statusCode
    inc = 1,
    t = new table({
      head: [
        '',
        '',
        'Site Name',
        'URL'
      ],
      colWidths: [3, 5, 26, 20],
      style : {
        compact : true,
        head: ['white','bold'],
        'padding-left': 1,
        'padding-right': 1
      }
    }),
    statusCodeMap = {
      '200': '\033[32m200\033[39m',
      '301': '\033[33m301\033[39m',
      '302': '\033[33m302\033[39m',
      '404': '\033[31m404\033[39m'
    };

// progress bar
var bar = multi.rel(0, 0, {
  width: 10,
  before: '[',
  after: '] ',
  solid: { background: 'blue', foreground: 'white', text: '|' },
  empty: { background: null, foreground: null, text: ' ' }
});

// increments the progress bar
var moveBar = function (prog) {
  if (prog >= 100) {
    multi.charm.cursor(true);
  } else {
    bar.ratio(prog, siteListLength, msg = prog + ' / ' + siteListLength);
    inc++;
  }
};

// make requests and add each site's http status code to siteList array
var getStatusCode = function (site, callback) {

  request({
    url: site.url,
    followRedirect: false
  }, function (error, res) {

    if (error) {
      if (typeof res === 'undefined') {
        site.statusCode = '404';
      }
    } else {
      site.statusCode = res.statusCode;
    }

    // increment progress bar
    moveBar(inc);

    callback(null, site);

  });

};

// compares the status code to what is set in the isActive property of micrositeList.json
var compareStatus = function (site) {

  var status,
      active = sites.getSiteProp(site.name, 'isActive');

  if (site.statusCode === 200) {
    status = true;
  } else {
    status = false;
  }

  if (status !== active) {

    // make sure that site isn't an old version of a published site
    // in that situation the mis-match is expected because the retired site url
    // would still be the same as the newer published version
    if (!sites.getSiteProp(site.name, 'isOldDesign')) {
      return 'X';
    }

  }

  return '';

};

// get started...
console.log('Checking microsite status codes...\n\n');

// iterrate through sites and output a table to command line
async.map(siteList, getStatusCode, function (err, results){

  if (err){
    return console.error(err);
  } else {

    // sort results
    async.sortBy(results, function (site, callback) {
      callback(err, site[sortBy]);
    }, function(err, results){

      // push results to table
      for (i = 0, len = results.length; i < len; i++) {
        t.push( [ compareStatus(results[i]), statusCodeMap[results[i].statusCode], results[i].name, results[i].url] );
      }

      // render table to console
      console.log(t.toString());

      // kill the multimeter process
      multi.write('\n').destroy();

    });

  }

});