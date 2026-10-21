const { By, until } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        
        // Step One Locators
        this.firstNameField = By.id('first-name');
        this.lastNameField = By.id('last-name');
        this.postalCodeField = By.id('postal-code');
        this.continueButton = By.id('continue');

        // Step Two Locators
        this.finishButton = By.id('finish');

        // Complete Page Locators
        this.completeHeader = By.css('.complete-header');
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.driver.wait(until.elementLocated(this.firstNameField), 5000);
        await this.driver.findElement(this.firstNameField).sendKeys(firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(lastName);
        await this.driver.findElement(this.postalCodeField).sendKeys(postalCode);
    }

    async clickContinue() {
        await this.driver.findElement(this.continueButton).click();
    }

    async clickFinish() {
        await this.driver.wait(until.elementLocated(this.finishButton), 5000);
        await this.driver.findElement(this.finishButton).click();
    }

    async getCompleteHeaderMessage() {
        await this.driver.wait(until.elementLocated(this.completeHeader), 5000);
        return await this.driver.findElement(this.completeHeader).getText();
    }
}

module.exports = CheckoutPage;