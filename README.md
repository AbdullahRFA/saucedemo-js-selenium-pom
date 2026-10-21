# 🛍️ SauceDemo E2E Automation Framework (JavaScript + Selenium + POM)

A robust, enterprise-grade End-to-End (E2E) test automation framework built for **[Swag Labs (SauceDemo)](https://www.saucedemo.com/)** using **JavaScript (Node.js)**, **Selenium WebDriver**, and the **Page Object Model (POM)** design pattern.

---

## 🚀 Key Features

- **Page Object Model (POM):** Clean separation of test scripts and UI locators for high maintainability and code reusability.
- **Robust Synchronization:** Utilizes Selenium's `Explicit Waits` (`until.elementLocated`) to prevent flakiness and handle dynamic elements.
- **Comprehensive Test Coverage:** Covers critical user journeys including Authentication, Product Catalog Navigation, Sorting, Shopping Cart Operations, and Complete Checkout E2E Flows.
- **Advanced Reporting:** Integrated with **Mochawesome** (HTML Reports) and **Allure Report** for rich visual test execution dashboards.
- **Professional Git Workflow:** Built following feature-branching strategies and clean, conventional commit practices.

---

## 🛠️ Tech Stack

- **Language:** JavaScript (Node.js)
- **Automation Tool:** Selenium WebDriver (`selenium-webdriver`)
- **Test Runner:** Mocha (`mocha`)
- **Assertion Library:** Chai (`chai`)
- **Reporting:** Mochawesome & Allure

---

## 📂 Project Directory Structure

```text
saucedemo-js-selenium-pom/
│
├── pages/                  # Page Object Classes (Encapsulation of locators & actions)
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── tests/                  # Test Specification Files (Mocha test suites)
│   ├── login.test.js
│   ├── products.test.js
│   ├── cart.test.js
│   └── checkout.test.js
│
├── utils/                  # Helper utilities (Driver setup & configurations)
│   └── baseDriver.js
│
├── mochawesome-report/     # Generated HTML & JSON test reports
├── allure-report/          # Generated Allure test reports
├── package.json            # Project dependencies and script shortcuts
└── README.md               # Project documentation
```

---

## ⚙️ Getting Started & Installation

Follow these steps to set up and run the project locally:

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (LTS version recommended)
- **Google Chrome Browser**

### 2. Clone the Repository
```bash
git clone git@github.com:AbdullahRFA/saucedemo-js-selenium-pom.git
cd saucedemo-js-selenium-pom
```

### 3. Install Dependencies
```bash
npm install
```

---

## 🧪 Running Test Cases

You can run individual test suites or execute all tests combined using the commands below:

### Run All Tests
```bash
npx mocha tests/**/*.test.js --timeout 20000
```

### Run Specific Page Tests
- **Login Tests:**
  ```bash
  npx mocha tests/login.test.js --timeout 20000
  ```
- **Products Tests:**
  ```bash
  npx mocha tests/products.test.js --timeout 20000
  ```
- **Cart Tests:**
  ```bash
  npx mocha tests/cart.test.js --timeout 20000
  ```
- **E2E Checkout Flow Test:**
  ```bash
  npx mocha tests/checkout.test.js --timeout 20000
  ```

---

## 📊 Test Reporting

### 1. HTML Report (Mochawesome)
To generate and view clean HTML test execution reports:
```bash
npx mocha tests/**/*.test.js --reporter mochawesome --timeout 20000
```
### 1.1 Report ScreenShot
![Report Screenshot](/Screenshot/HTML%20Report.png)

### 2. Allure Report
To generate advanced analytical dashboards with Allure:
```bash
# Run tests with allure reporter
npx mocha tests/**/*.test.js --reporter allure-mocha --timeout 20000

# Generate and open the allure report
npx allure generate allure-results --clean -o allure-report && npx allure open allure-report
```
### 2.1 Report ScreenShot
 ![Report Screenshot](/Screenshot/Allure%20Report.png)

---

## 📝 Test Cases Covered

| Test ID | Module | Description | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC01** | Login | Login with valid standard credentials | Redirects to `/inventory.html` |
| **TC02** | Login | Login with locked-out user | Displays locked out error message |
| **TC03** | Login | Login with invalid password | Displays username/password mismatch error |
| **TC04** | Products | Verify product page title and item count | Title is "Products", count > 0 |
| **TC05** | Products | Add product to cart | Cart badge updates to "1" |
| **TC06** | Products | Sort products by Price (Low to High) | Products sorted correctly by price |
| **TC07** | Cart | Verify correct product inside cart | Item count is 1, correct item title matches |
| **TC08** | Cart | Navigate to checkout page | Redirects to `/checkout-step-one.html` |
| **TC09** | E2E | Complete full checkout and purchase flow | Displays "Thank you for your order!" message |

---

## 👨‍💻 Author
**Abdullah Nazmus-Sakib**  
*Automation QA Engineer*
- **GitHub:** [@AbdullahRFA](https://github.com/AbdullahRFA)
- **LinkedIn:** [@AbdullahRFA](https://www.linkedin.com/in/abdullahrfa/)