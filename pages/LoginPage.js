const { By, until } = require('selenium-webdriver');

class LoginPage {
    // Locators for the login page elements
    constructor(driver) {
        this.driver = driver;
        // Locators using data-test attributes 
        this.usernameField = By.id('user-name');
        this.passwordField = By.id('password');
        this.loginButton = By.id('login-button');
        this.errorMessage = By.css('h3[data-test="error"]');
    }
// Method to open the login page
    async open() {
        await this.driver.get('https://www.saucedemo.com/');
    }
// Methods to insert username, password, click login button, and get error message
    async setUsername(username) {
        await this.driver.wait(until.elementLocated(this.usernameField), 15000);
        await this.driver.findElement(this.usernameField).sendKeys(username);
    }
// Method to set the password in the password field
    async setPassword(password) {
        await this.driver.wait(until.elementLocated(this.passwordField), 15000);
        await this.driver.findElement(this.passwordField).sendKeys(password);
    }
//  Method to click the login button
    async clickLoginButton() {
        await this.driver.wait(until.elementLocated(this.loginButton), 15000);
        await this.driver.findElement(this.loginButton).click();
    }

    // All-in-one login helper method for convenience
    async login(username, password) {
        await this.driver.wait(until.elementLocated(this.usernameField), 15000);
        await this.setUsername(username);
        await this.setPassword(password);
        await this.clickLoginButton();
    }
// Method to get the error message text displayed on the login page
    async getErrorMessage() {
        await this.driver.wait(until.elementLocated(this.errorMessage), 15000);
        return await this.driver.findElement(this.errorMessage).getText();
    }
}

module.exports = LoginPage;