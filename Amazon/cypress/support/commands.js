import LoginToAmazon from "../AmazonPageObject/LoginToAmazon.js";
import HomePage from "../AmazonPageObject/HomePage.js";
import ProductListPage from "../AmazonPageObject/ProductListPage.js";
import ProductDetails from "../AmazonPageObject/ProductDetailsPage.js";
import { faker } from "@faker-js/faker";

const {
  addCompareSnapshotCommand,
} = require("cypress-visual-regression/dist/command");

addCompareSnapshotCommand({
  failureThreshold: 0.01, // 1% acceptable pixel difference
  failureThresholdType: "percent", // Compare differences by percentage
});

Cypress.Commands.add("launchUrl", () => {
  cy.visit("https://amazon.in");
});

Cypress.Commands.add("loginAmazon", () => {
  let userData;
  cy.fixture("cred").then((data) => {
    userData = data;

    LoginToAmazon.clickOnSignInButton();
    LoginToAmazon.setUserName(userData.userName);
    LoginToAmazon.clickOnContinueButton();
    LoginToAmazon.setUserPassword(userData.password);
    LoginToAmazon.clickOnSignIn();
    LoginToAmazon.verifyUserFirstNameOnHomePage(userData.userFirstName);
  });
});

Cypress.Commands.add("logoutAmazon", () => {
  HomePage.userAbleToLogoutFromAmazon();
});

Cypress.Commands.add("SearchProduct", (productName, brandName, rating) => {
  let userData;
  cy.fixture("productDetails").then((data) => {
    userData = data;
    HomePage.verifyInputInSearchBox(productName);
    HomePage.clickOnSearchIcon();
    ProductListPage.applyFilterByBrand(brandName);
    ProductListPage.selectRatingOnProductListPage(rating);
    ProductListPage.clickOnProductLink(userData.productName);
  });
});

Cypress.Commands.add("addProductIntoCart", (productName, brandName, rating) => {
  ProductDetails.clickOnAddToCartButtonAndVerifyProductAddedMessage();
});

Cypress.Commands.add("generateRandomData", () => {
  return {
    name: faker.person.fullName(),
    address: faker.location.buildingNumber(),
    landmark: faker.location.street(),
    phone: faker.number.int({ min: 6000000000, max: 9999999999 }).toString(), //to generate indian phone no
    pinCode: faker.number.int({ min: 221711, max: 221719 }).toString(), //to generate indian zipCode
  };
});
