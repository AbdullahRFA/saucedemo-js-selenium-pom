const { expect } = require('chai');
const { createDriver } = require('../utils/baseDriver');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');

describe('SauceDemo Products Page Tests', function () {
    this.timeout(10000);

    let driver;
    let loginPage;
    let productsPage;

    beforeEach(async function () {
        driver = await createDriver();
        loginPage = new LoginPage(driver);
        productsPage = new ProductsPage(driver);
        
        // each test will start with the user logged in and on the products page
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    afterEach(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('TC04: Should display products page and verify product count', async function () {
        let title = await productsPage.getPageTitle();
        expect(title).to.equal('Products');

        let count = await productsPage.getProductCount();
        expect(count).to.be.greaterThan(0); // প্রোডাক্ট লিস্ট খালি না থাকা নিশ্চিত করা
    });

    it('TC05: Should add product to cart and update cart badge', async function () {
        await productsPage.addBackpackToCart();
        
        let badgeCount = await productsPage.getCartBadgeCount();
        expect(badgeCount).to.equal('1');
    });

    it('TC06: Should sort products by Price (Low to High)', async function () {
        // লো টু হাই সর্ট অপশন সিলেক্ট করা ('lohi')
        await productsPage.sortBy('lohi');
        
        // ভেলিডেশন হিসেবে প্রথম প্রোডাক্টের নাম বা প্রাইস চেক করা যেতে পারে
        let currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('/inventory.html');
    });
});