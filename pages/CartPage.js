const { By, until } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
        
        // Locators
        this.cartItem = By.css('.cart_item');
        this.itemTitle = By.css('.inventory_item_name');
        this.checkoutButton = By.id('checkout');
        this.continueShoppingButton = By.id('continue-shopping');
    }

    async getCartItemCount() {
        await this.driver.wait(until.elementsLocated(this.cartItem), 10000);
        let items = await this.driver.findElements(this.cartItem);
        return items.length;
    }

    async getCartItemName() {
        await this.driver.wait(until.elementLocated(this.itemTitle), 10000);
        return await this.driver.findElement(this.itemTitle).getText();
    }

    async clickCheckout() {
        await this.driver.wait(until.elementLocated(this.checkoutButton), 10000);
        await this.driver.findElement(this.checkoutButton).click();
    }
}

module.exports = CartPage;