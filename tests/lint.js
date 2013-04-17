// modules
var fs = require('fs'),
    jshint = require('jshint').JSHINT,
    wrench = require('wrench'),
    _ = require('underscore');

// ✓ ✔ ✕ ✖ ✗ ✘
var pass = ' \033[32m✔\033[39m ',
    fail = ' \033[31m✘\033[39m ';

var getJsFiles = function () {

  // array of all the files in the build directory
  var files = wrench.readdirSyncRecursive('./lib');

  // filter out of files array anything that doesn't end with js or json
  var regexp = /(.*\.(js|json))/gi;
  files = _.filter(files, function (file) {
    return file.match(regexp);
  });

  // add in rest of path name
  files = _.map(files, function (file) {
    return './lib/' + file;
  });

  return files;

};

var files = getJsFiles();

var lint = function (data, filename) {

  if ( jshint( data.toString() ) ) {

    console.log(pass + filename + ' has no errors.');

  } else {

    console.log(fail + filename + ' has errors');
    var out = jshint.data(),
    errors = out.errors;
    for(var j=0;j<errors.length;j++) {
      console.log('\t' + errors[j].line + ':' + errors[j].character + ' -> ' + errors[j].reason + ' -> ' + errors[j].evidence);
    }

  }

};

// iterrate javascript files though linter and record output to console

console.log('Linting javascript... \n');

for (var i = 0, len = files.length; i < len; i++) {

  lint( fs.readFileSync(files[i], 'utf8'), files[i] );

}

console.log('\n');