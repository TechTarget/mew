//  modules
var micrositeList = require(process.cwd() + '/lib/data/micrositeList.json'),
    cfg = require(process.cwd() + '/lib/config/user.json'),
    fs = require('fs'),
    openBrowser = require('open');

var outputPath = process.cwd() + '/docs/javascript/',
    outputFilename = 'microsites.json';

fs.writeFile(outputPath + outputFilename, JSON.stringify(micrositeList, null, 2), function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log('updated ' + outputFilename);
  }
});

// open documentation in browser
if (cfg.useLocalServers) {
  openBrowser(cfg.localServers.documentation, cfg.browser);
}