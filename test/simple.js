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
  browsers.forEach(browser => {
    const browserName = browser.name;
    const version  = browser.version;
    describe(`testing javascript in ${browserName}`, () => {

            beforeEach(() => {
              if (process.env.SAUCE_USERNAME != undefined) {
                 this.browser = new webdriver.Builder()
                 .usingServer('http://'+ process.env.SAUCE_USERNAME+':'+process.env.SAUCE_ACCESS_KEY+'@ondemand.saucelabs.com:80/wd/hub')
                 .withCapabilities({
                   'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
                   build: process.env.TRAVIS_BUILD_NUMBER,
                   username: process.env.SAUCE_USERNAME,
                   accessKey: process.env.SAUCE_ACCESS_KEY,
                   browserName: browserName,
                   version: version
                 }).build();
               } else {
                 this.browser = new webdriver.Builder()
                 .withCapabilities({
                   browserName: browserName,
                   version: version
                 }).build();
               }

              return this.browser.get("http://getfocus.io");
             });

           afterEach(() => this.browser.quit());

         it('should handle clicking on a headline', done => {
           const headline = this.browser.findElement(webdriver.By.css('h3'));
           headline.click();
           headline.getText().then(txt => {
             assert.equal(txt, "Les librairies FOCUS");
             done();
           });
         });
         it('should handle clicking on an other page', done => {
           this.browser.get('http://getfocus.io/position-offer/');
           const headline = this.browser.findElement(webdriver.By.css('h2'));
           headline.click();
           headline.getText().then(txt => {
             assert.equal(txt, "Développeur front-end");
             done();
           });
         });
    });
  });
};

testGenerator(require('./browsers'));
