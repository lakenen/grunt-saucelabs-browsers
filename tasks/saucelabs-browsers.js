/*
 * grunt-saucelabs-browsers
 * https://github.com/lakenen/grunt-saucelabs-browsers
 *
 * Copyright (c) 2014 Cameron Lakenen
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');

module.exports = function(grunt) {

  function defaultTransform(browser) {
    /*jshint camelcase:false */
    return {
      browserName: browser.api_name,
      longBrowserName: browser.long_name,
      version: browser.short_version,
      platform: browser.os
    };
  }

  grunt.registerTask('saucelabs-browsers', 'Request SauceLabs supported browsers', function() {

    var options = this.options({
        url: 'https://saucelabs.com/rest/v1/info/browsers/all',
        callback: function (err, browsers) {
          // just set the browsers on the grunt config by default
          return browsers;
        },
        transform: defaultTransform
      }),
      callback = options.callback,
      transform = options.transform,
      done = this.async();

    if (!callback || typeof callback !== 'function') {
      throw new Error('`callback` option must be a function');
    }

    function responseHandler(error, response, body) {
      var browsers;

      response = response || { statusCode: 0 };

      grunt.verbose.subhead('Response');
      grunt.verbose.ok(response.statusCode);
      grunt.verbose.writeln(body);

      if (error) {
        grunt.fail.fatal(error);
      } else {
        browsers = JSON.parse(body);
        grunt.log.ok(browsers.length + ' browsers found');
        grunt.config('saucelabs.browsers', callback(error, browsers.map(transform)));
      }
      done(error);
    }

    request(options, responseHandler);
  });

};
