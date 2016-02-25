//https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options#TestConfigurationOptions-BrowserName
'use strict'
var assert = require("assert");
var webdriver = require("selenium-webdriver");
var URL = 'http://getfocus.io';
function createBrowser(browserName, url, context){
  return function createdBrowser(){
    if (process.env.SAUCE_USERNAME != undefined) {
      context.browser = new webdriver.Builder()
      .usingServer('http://'+ process.env.SAUCE_USERNAME+':'+process.env.SAUCE_ACCESS_KEY+'@ondemand.saucelabs.com:80/wd/hub')
      .withCapabilities({
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        build: process.env.TRAVIS_BUILD_NUMBER,
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        browserName: browserName
      }).build();
    } else {
      context.browser = new webdriver.Builder()
      .withCapabilities({
        browserName: browserName
      }).build();
    }

    return context.browser.get(url);
  }
}
function quitBrowser(context){
    return function(){
      return context.browser.quit();
    }
}

function testTitle(done, context){
  var headline = context.browser.findElement(webdriver.By.css('h3'));
  headline.click();
  headline.getText().then(function(txt) {
    assert.equal(txt, "Les librairies FOCUS");
    done();
  });
}
/*
describe('testing chrome', () => {
  var ctx = {};
  beforeEach(() => createBrowser('chrome', URL, ctx));
  afterEach(() => quitBrowser(ctx));
  it('should handle clicking on a headline', done => testTitle(done, ctx));
});

describe('testing firefox', () => {
  var ctx = {};
  beforeEach(() => createBrowser('firefox', URL, ctx));
  afterEach(() => quitBrowser(ctx));
  it('should handle clicking on a headline', done => testTitle(done, ctx));
});

describe('testing internet explorer', () => {
  var ctx = {};
  beforeEach(() => createBrowser('internet explorer', URL, ctx));
  afterEach(() => quitBrowser(ctx));
  it('should handle clicking on a headline', done => testTitle(done, ctx));
});
*/


const testGenerator = browsers => {
  browsers.forEach(browserName => {

describe("testing javascript in " + browserName, function() {
        beforeEach(function() {
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

       return this.browser.get("http://getfocus.io");
     });

     afterEach(function() {
       return this.browser.quit();
     });

     it("should handle clicking on a headline", function(done) {
       var headline = this.browser.findElement(webdriver.By.css('h3'));
       headline.click();
       headline.getText().then(function(txt) {
         assert.equal(txt, "Les librairies FOCUS");
         done();
       });
     });
});


  }
}
testGenerator(['chrome', 'firefox', 'internet explorer', 'iPhone', 'iPad']);
