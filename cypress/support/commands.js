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
  let attempts = 0;
  const maxRetries = 5;

  function launchAmazonUrl() {
    attempts++;

    cy.visit("https://amazon.in");

    cy.get("body").then((body) => {
      if (body.find("#nav-link-accountList").length > 0) {
        cy.get("#nav-link-accountList").should("be.visible");
      } else if (attempts < maxRetries) {
        cy.log(`Attempt ${attempts} failed, retrying...`);
        cy.reload();
        launchAmazonUrl();
      } else {
        throw new Error("Launch failed after maximum retries.");
      }
    });
  }

  launchAmazonUrl();
});

Cypress.Commands.add("LaunchAmazonUrlThroughGoogle", () => {
  cy.visit("https://www.google.co.in/");
  cy.get(".gLFyf").type("Amazon{Enter}");
  cy.get('[href="https://www.amazon.in/"] h3').click();
  cy.origin("https://www.amazon.in", () => {
    cy.get("#nav-logo-sprites").should("be.visible");
  });
});

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("a.ue.log is not a function")) {
    return false;
  }
  return true;
});

Cypress.Commands.add("loginAmazon", () => {
  let userData;
  cy.fixture("cred").then((data) => {
    cy.session("userSession", () => {
      cy.launchUrl();
      userData = data;
      LoginToAmazon.clickOnSignInButton();
      LoginToAmazon.setUserName(userData.userName);
      LoginToAmazon.clickOnContinueButton();
      LoginToAmazon.setUserPassword(userData.password);
      LoginToAmazon.clickOnSignIn();
      LoginToAmazon.verifyUserFirstNameOnHomePage(userData.userFirstName);
    });
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
