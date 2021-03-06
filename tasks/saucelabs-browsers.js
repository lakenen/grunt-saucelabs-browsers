/*
 * grunt-saucelabs-browsers
 * https://github.com/lakenen/grunt-saucelabs-browsers
 *
 * Copyright (c) 2014 Cameron Lakenen
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');

var SELENIUM_VERSIONS = ['all', 'selenium-rc', 'webdriver'];

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

  grunt.registerMultiTask('saucelabs-browsers', 'Request SauceLabs supported browsers', function() {

    var options = this.options({
        url: 'https://saucelabs.com/rest/v1/info/browsers/',
        seleniumVersion: 'all',
        filter: function (browsers) {
          // just set the browsers on the grunt config by default
          return browsers;
        },
        transform: defaultTransform
      }),
      filter = options.filter,
      transform = options.transform,
      done = this.async();

    if (SELENIUM_VERSIONS.indexOf(options.seleniumVersion) === -1) {
      throw new Error('invalid `seleniumVersion` option ' + options.seleniumVersion);
    }

    if (!filter || typeof filter !== 'function') {
      throw new Error('`filter` option must be a function');
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
        grunt.log.ok(browsers.length + ' total browser(s)');
        browsers = filter(browsers.map(transform));
        grunt.log.ok('filtered to ' + browsers.length + ' browser(s)');
        grunt.config('saucelabs.browsers', browsers);
      }
      done(error);
    }

    request.get(options.url + options.seleniumVersion, responseHandler);
  });

};
