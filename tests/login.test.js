const { expect } = require("chai");
const { createDriver } = require("../utils/baseDriver");
const LoginPage = require("../pages/LoginPage");

describe("SauceDemo Login Page Tests", function () {
  // Set a timeout for each test to allow for page load and interactions
  this.timeout(10000);
  let driver;
  let loginPage;

  // for each test, the browser will open and a LoginPage object will be created
  beforeEach(async function () {
    driver = await createDriver();
    loginPage = new LoginPage(driver);
    await loginPage.open();
  });

  // for each test, the browser will be closed after the test completes
  afterEach(async function () {
    // if driver created successfully, then quit the driver to close the browser
    if (driver) {
      await driver.quit();
    }
  });

  it("TC01: Should login successfully with valid standard credentials", async function () {
    await loginPage.login("standard_user", "secret_sauce");

    // Validation: After successful login, user should be redirected to the products page and we will check the URL
    let currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include("/inventory.html");
  });

  it("TC02: Should show error message with locked out user", async function () {
    await loginPage.login("locked_out_user", "secret_sauce");

    let errorText = await loginPage.getErrorMessage();
    expect(errorText).to.include("Sorry, this user has been locked out");
  });

  it("TC03: Should show error message with invalid password", async function () {
    await loginPage.login("standard_user", "wrong_password");

    let errorText = await loginPage.getErrorMessage();
    expect(errorText).to.include("Username and password do not match");
  });
});
