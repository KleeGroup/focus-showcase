//https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options#TestConfigurationOptions-BrowserName
'use strict'
var assert = require("assert");
var webdriver = require("selenium-webdriver");
var URL = 'http://getfocus.io';
function createBrowser(browserName, url){
  return function createdBrowser(){
    if (process.env.SAUCE_USERNAME != undefined) {
      this.browser = new webdriver.Builder()
      .usingServer('http://'+ process.env.SAUCE_USERNAME+':'+process.env.SAUCE_ACCESS_KEY+'@ondemand.saucelabs.com:80/wd/hub')
      .withCapabilities({
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        build: process.env.TRAVIS_BUILD_NUMBER,
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        browserName: browserName
      }).build();
    } else {
      this.browser = new webdriver.Builder()
      .withCapabilities({
        browserName: browserName
      }).build();
    }

    return this.browser.get(url);
  }
}
function quitBrowser(){
    return function(){
      return this.browser.quit();
    }
}

function testTitle(done){
  var headline = this.browser.findElement(webdriver.By.css('h3'));
  headline.click();
  headline.getText().then(function(txt) {
    assert.equal(txt, "Les librairies FOCUS");
    done();
  });
}

describe('testing chrome', () => {
  beforeEach(() => createBrowser('chrome', URL));
  afterEach(() => quitBrowser);
  it('should handle clicking on a headline', done => testTitle(done));
});

describe('testing firefox', () => {
  beforeEach(() => createBrowser('firefox', URL));
  afterEach(() => quitBrowser);
  it('should handle clicking on a headline', done => testTitle(done));
});

describe('testing internet explorer', () => {
  beforeEach(() => createBrowser('internet explorer', URL));
  afterEach(() => quitBrowser);
  it('should handle clicking on a headline', done => testTitle(done));
});
