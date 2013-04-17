$(document).on('ready', function() {

  'use strict';

  // for now using a json file generated from the micrositeList.json file in lib
  function getMicrositeList( ) {
    return $.getJSON('javascript/microsites.json').pipe(function (data) {
      return data.sites;
    });
  }

  // moment.js lib
  moment().format();

  var micrositeListUrl = 'javascript/microsites.json',
      request = $.ajax( micrositeListUrl, { dataType: 'json' } ),
      micrositeList = request.pipe( function( data ) {
        return data.sites;
      }),
      arr = [],
      rows = { 'sites': []},
      rowsCount = 1,
      created,
      ifEmbedded = '',
      data = {},
      rowHtml = '{{#sites}}' +
                '<tr>' +
                '<td class="count">{{ num }}</td>' +
                '<td class="localDevSite"><a href="{{ localEngPath }}">{{ name }}</a></td>' +
                '<td class="createDate">{{ createDate }}</td>' +
                '<td class="state {{state.class}}"><span>{{state.class}}</span><i class="{{state.icon}} icon-white" title="{{state.title}}"></i></td>' +
                // '<td class="releases">{{ releases }}</td>' +
                // '<td>{{ lastRelease }}</td>' +
                '<td class="localBuiltSite"><a href="{{ localProdPath }}"><i class="icon-edit"></i></a></td>' +
                '<td class="pdSite"><a href="{{ pdPath }}"><i class="icon-share"></i></a></td>' +
                '<td class="previewSite"><a href="{{ previewPath }}?vgnextnomenu=1"><i class="icon-check"></i></a></td>' +
                '<td class="publishedSite"><a href="{{ sitePath }}">{{ sitePath }}</a></td>' +
                '</tr>' +
                '{{/sites}}',
      template = Handlebars.compile(rowHtml);

  micrositeList.done(function (items) {

    // get array of site names
    for (var site in items) {
      arr.push(site);
    }

    // sort array on alpha site name
    arr.sort();

    var getStateIcon = function(state) {
      if (state) {
        return {
          'class': 'active',
          icon: 'icon-ok',
          title: 'Published'
        };
      }
      return  {
        'class': 'inactive',
        icon: 'icon-remove',
        title: 'Retired'
      };
    }

    var buildRows = function (type, i) {

      ifEmbedded = (items[ arr[i] ].isEmbedded) ? 'embedded.html' : '';

      data = {
        num: rowsCount,
        name: arr[i],
        createDate: moment( new Date(items[ arr[i] ].createDate) ).format('YYYY-MM-DD'),
        releases: items[ arr[i] ].releases.count,
        state: getStateIcon(items[ arr[i] ].isActive),
        lastRelease: moment( items[ arr[i] ].releases.last ).fromNow(),
        localEngPath: 'http://microsites.eng.techtarget.com/' + items[ arr[i] ].siteDirectory + '/' + ifEmbedded,
        localProdPath: 'http://microsites.techtarget.com/' + items[ arr[i] ].siteDirectory + '/' + ifEmbedded,
        pdPath: 'http://productdevelopment.techtarget.com/microsites/media.techtarget.com/' + items[ arr[i] ].siteDirectory + '/' + ifEmbedded,
        previewPath: items[ arr[i] ].urlPreview,
        sitePath: items[ arr[i] ].url
      };

      rows.sites.push(data);

      rowsCount++;

    };

    // iterrate through json and build table rows
    for (var i = 0, len = arr.length; i < len; i++) {
      buildRows('published', i);
    }

    // append row template & init table sorting
    var table = $('#micrositeListTable');
    table
      .find('tbody')
      .append( template(rows) );

    table.tablesorter();

    // open links in new window
    $('#micrositeListTable').on('click', 'td', function (e) {
      e.preventDefault();
      var href = $(this).children('a').attr('href');
      if (typeof href !== 'undefined') {
        window.open( href );
      }
    });

  });

});