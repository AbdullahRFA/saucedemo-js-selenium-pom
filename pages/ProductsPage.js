const { By, until } = require('selenium-webdriver');

class ProductsPage {
    constructor(driver) {
        this.driver = driver;
        
        // Locators
        this.productTitle = By.css('.title');
        this.inventoryItems = By.css('.inventory_item');
        this.addToCartBackpackBtn = By.id('add-to-cart-sauce-labs-backpack');
        this.removeBackpackBtn = By.id('remove-sauce-labs-backpack');
        this.cartBadge = By.css('.shopping_cart_badge');
        this.cartIcon = By.css('.shopping_cart_link');
        this.sortDropdown = By.css('.product_sort_container');
    }

    async getPageTitle() {
        await this.driver.wait(until.elementLocated(this.productTitle), 5000);
        return await this.driver.findElement(this.productTitle).getText();
    }

    async getProductCount() {
        let items = await this.driver.findElements(this.inventoryItems);
        return items.length;
    }

    async addBackpackToCart() {
        await this.driver.findElement(this.addToCartBackpackBtn).click();
    }

    async getCartBadgeCount() {
        await this.driver.wait(until.elementLocated(this.cartBadge), 5000);
        return await this.driver.findElement(this.cartBadge).getText();
    }

    async clickCartIcon() {
        await this.driver.findElement(this.cartIcon).click();
    }

    async sortBy(optionValue) {
        // optionValue examples: 'az', 'za', 'lohi', 'hilo'
        let dropdown = await this.driver.findElement(this.sortDropdown);
        await dropdown.findElement(By.css(`option[value="${optionValue}"]`)).click();
    }
}

module.exports = ProductsPage;

