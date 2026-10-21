const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function createDriver() {
    let options = new chrome.Options();

    //password manager, autofill, and breach alert popups
    options.setUserPreferences({
        "credentials_enable_service": false,
        "profile.password_manager_enabled": false,
        "profile.password_manager_leak_detection": false // this bridge closes the "This site has been reported as unsafe" warning
    });

    options.addArguments("--disable-infobars");
    options.addArguments("--disable-save-password-bubble");

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    await driver.manage().window().maximize();
    return driver;
}

module.exports = { createDriver };