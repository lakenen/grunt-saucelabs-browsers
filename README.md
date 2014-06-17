# grunt-saucelabs-browsers

> Request SauceLabs supported browsers

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-saucelabs-browsers --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-saucelabs-browsers');
```

## The "saucelabs-browsers" task

### Overview
In your project's Gruntfile, add a section named `saucelabs-browsers` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'saucelabs-browsers': {
    options: {
      // Task-specific options go here.
    }
  },
});
```

### Options

#### options.url
Type: `String`
Default value: `https://saucelabs.com/rest/v1/info/browsers/`

A base url for requesting the list of browsers.

#### options.seleniumVersion
Type: `String`
Default value: `all`

A Selenium version to request browsers for. This value is appended to the url when making a request to the SauceLabs API. Possible values: `all`, `selenium-rc`, or `webdriver`.

#### options.filter
Type: `Function`
Default value: `function () {}`

A function to filter the list of available platforms. Return a set of browsers you wish to have included in `grunt.config('saucelabs.browsers')`.

#### options.transform
Type: `Function`
Default value: see [tasks/saucelabs-browsers.js#L15](tasks/saucelabs-browsers.js#L15)

A function to transform the raw API response data into something easier to work with.

### Usage Examples

#### Default Options
In this example, the default options are used to get all the browsers. They are then set on the `saucelabs.browsers` grunt config.

```js
grunt.initConfig({
  'saucelabs-browsers': {
    all: {
      options: {}
    }
  }
});
```

#### Custom Options
In this example, we filter to get only chrome browsers.

```js
grunt.initConfig({
  'saucelabs-browsers': {
    chrome: {
      options: {
        filter: function (browsers) {
          return browsers.filter(function (browser) {
            return /chrome/i.test(browser.browserName);
          });
        }
      }
    }
  }
});
```

#### Using With Other Grunt Plugins

```js
grunt.initConfig({
  'saucelabs-browsers': {
    chrome: {
      options: {
        filter: function (browsers) {
          return browsers.filter(function (browser) {
            return /chrome/i.test(browser.browserName);
          });
        }
      }
    }
  },
  'saucelabs-qunit': {
    options: {
      browsers: '<%= saucelabs.browsers %>',
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

- 0.1.0 - use multi task, rename callback -> filter
- 0.0.0 - initial functionality


## License

([The MIT License](LICENSE))

Copyright 2014 Cameron Lakenen
