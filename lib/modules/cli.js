var app = require(process.cwd() + '/lib/app'),
    sites = require(process.cwd() + '/lib/modules/sites'),
    program = require('commander'),
    pkg = require(process.cwd() + '/package.json');

program
  .version(pkg.version)
  .option('-d, --docs', 'view MEW documentation in browser')
  .option('-s, --statusCodes', 'view http status codes of "published" microsites')
  .option('-l, --list', 'returns a list of all microsites')
  .option('-p, --published', 'returns a list of just the "published" microsites')
  .option('-r, --retired', 'returns a list of just the "retired" microsites');

program
  .command('create [sitename]')
  .description('\n- create a new microsite\n')
  .option('-d, --directory [dirname]', 'Name of the directory containing new site')
  .action(function(sitename, options) {
    app.createSite(sitename, options.directory);
  });

program
  .command('dev [sitename]')
  .description('\n- starts local server, "watches" site files & compiles assets and refreshes browser\n')
  .action(function(sitename) {
    app.developSite(sitename);
  });

program
  .command('build [sitename]')
  .description('\n- build microsite assests (js, css & images) prior to release\n')
  .action(function(sitename) {
    app.buildSite(sitename);
  });

program
  .command('release [sitename]')
  .description('\n- release a microsite to a specified environment\n')
  .option('-m, --message [message]', 'Release notes')
  .option('-e, --environment [env]', 'Which environment to release to')
  .option('-a, --assets [assets]', 'Specify which assets to release (Ie. JS, CSS or IMAGES; default is all)')
  .action(function (sitename, options) {
    app.releaseSite(sitename, options.message, options.assets, options.environment);
  });

program
  .command('purge [sitename]')
  .description('\n- purge microsite assests (js, css & images) on CDN\n')
  .option('-a, --assets [assets]', 'Specify which assets to release (Ie. JS, CSS or IMAGES; default is all)')
  .action(function(sitename, options) {
    app.purgeCdn(sitename, options.assets);
  });

program
  .command('retire [sitename]')
  .description('\n- retire an existing microsite\n')
  .action(function(sitename) {
    app.retireSite(sitename);
  });

program.parse(process.argv);

if (!program.args.length) {

  if (program.docs) {

    var cp = require('child_process');
    cp.fork('./docs/docs');

  } else if (program.statusCodes) {

    var cp = require('child_process');
    cp.fork('./lib/scripts/statusCodes.js');

  } else if (program.list) {

    sites.printMicrositeList();

  } else if (program.published) {

    sites.printMicrositeList('published');

  } else if (program.retired) {

    sites.printMicrositeList('retired');

  } else {

    // show help by default
    program.parse([process.argv[0], process.argv[1], '-h']);
    process.exit(0);

  }

}