const { By, until } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        // Locators using data-test attributes 
        this.usernameField = By.id('user-name');
        this.passwordField = By.id('password');
        this.loginButton = By.id('login-button');
        this.errorMessage = By.css('h3[data-test="error"]');
    }

    async open() {
        await this.driver.get('https://www.saucedemo.com/');
    }

    async setUsername(username) {
        await this.driver.wait(until.elementLocated(this.usernameField), 5000);
        await this.driver.findElement(this.usernameField).sendKeys(username);
    }

    async setPassword(password) {
        await this.driver.findElement(this.passwordField).sendKeys(password);
    }

    async clickLoginButton() {
        await this.driver.findElement(this.loginButton).click();
    }

    // All-in-one login helper method for convenience
    async login(username, password) {
        await this.setUsername(username);
        await this.setPassword(password);
        await this.clickLoginButton();
    }

    async getErrorMessage() {
        await this.driver.wait(until.elementLocated(this.errorMessage), 5000);
        return await this.driver.findElement(this.errorMessage).getText();
    }
}

module.exports = LoginPage;