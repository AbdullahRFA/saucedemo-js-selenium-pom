const { expect } = require('chai');
const { createDriver } = require('../utils/baseDriver');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');

describe('SauceDemo Cart Page Tests', function () {
    this.timeout(10000);

    let driver;
    let loginPage;
    let productsPage;
    let cartPage;

    beforeEach(async function () {
        driver = await createDriver();
        loginPage = new LoginPage(driver);
        productsPage = new ProductsPage(driver);
        cartPage = new CartPage(driver);
        
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        
        // প্রোডাক্ট কার্টে অ্যাড করা
        await productsPage.addBackpackToCart();
        
        // নিশ্চিত হওয়া যে কার্ট ব্যাজ আপডেট হয়েছে (এতে সিঙ্ক্রোনাইজেশনের প্রবলেম দূর হবে)
        let badgeCount = await productsPage.getCartBadgeCount();
        expect(badgeCount).to.equal('1');

        // এরপর কার্ট আইকনে ক্লিক করে কার্ট পেজে যাওয়া
        await productsPage.clickCartIcon();
    });

    afterEach(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('TC07: Should display the correct product in the cart', async function () {
        let itemCount = await cartPage.getCartItemCount();
        expect(itemCount).to.equal(1);

        let itemName = await cartPage.getCartItemName();
        expect(itemName).to.equal('Sauce Labs Backpack');
    });

    it('TC08: Should navigate to checkout page when clicking checkout button', async function () {
        await cartPage.clickCheckout();

        let currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('/checkout-step-one.html');
    });
});