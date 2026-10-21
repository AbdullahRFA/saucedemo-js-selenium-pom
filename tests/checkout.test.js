const { expect } = require('chai');
const { createDriver } = require('../utils/baseDriver');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

describe('SauceDemo E2E Checkout Flow Tests', function () {
    this.timeout(20000); // Set a longer timeout for the full E2E flow

    let driver;
    let loginPage;
    let productsPage;
    let cartPage;
    let checkoutPage;

    beforeEach(async function () {
        driver = await createDriver();
        loginPage = new LoginPage(driver);
        productsPage = new ProductsPage(driver);
        cartPage = new CartPage(driver);
        checkoutPage = new CheckoutPage(driver);
    });

    afterEach(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('TC09: Should complete the full E2E purchase flow successfully', async function () {
        // 1. Ensure the login page is opened and the user logs in with valid credentials
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        // 2. Add a product to the cart and verify the cart badge updates
        await productsPage.addBackpackToCart();
        let badgeCount = await productsPage.getCartBadgeCount();
        expect(badgeCount).to.equal('1');
        await productsPage.clickCartIcon();

        // 3. Verify that the cart has the correct item before proceeding to checkout
        let itemCount = await cartPage.getCartItemCount();
        expect(itemCount).to.equal(1);
        await cartPage.clickCheckout();

        // 4. Fill in the checkout information and continue
        await checkoutPage.fillCheckoutInformation('Abdullah', 'Nazmus', '1216');
        await checkoutPage.clickContinue();

        // 5. Validate that the checkout overview page is displayed
        await checkoutPage.clickFinish();

        // 6. Verify that the order completion message is displayed
        let successMessage = await checkoutPage.getCompleteHeaderMessage();
        expect(successMessage).to.include('Thank you for your order!');
    });
});