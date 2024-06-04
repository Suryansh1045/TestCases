const { Builder, By, Key, until,Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const edge = require('selenium-webdriver/edge');


let options = new chrome.Options();
options.excludeSwitches(['enable-logging']);
options.addArguments('headless');  // Run in headless mode
options.addArguments('disable-gpu');  // Applicable for some environments
options.addArguments('disable-dev-shm-usage');  // Overcome limited resource problems
options.addArguments('no-sandbox');  // Bypass OS security model
options.addArguments('log-level=3');  // Reduce console log level
options.addArguments('disable-logging');  // Disable logging
options.addArguments('output=/dev/null');  // Disable logging


const chromeDriver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

     
    
module.exports = {
    chromeDriver,
    Key,
    By,
    until,Builder
};