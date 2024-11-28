import ProductDetails from "../AmazonPageObject/ProductDetailsPage.js";
import ShoppingCart from "../AmazonPageObject/ShoppingCart.js";

describe("Amazon API Validation", () => {
  let userData;

  before(() => {
    cy.fixture("productDetails").then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.launchUrl();
    cy.SearchProduct(userData.productType, userData.brandName, userData.rating);
  });
  it.only("cy.intercept(), should mock the product name and display it on the UI", () => {
    ProductDetails.mockTheNameOfTheProductOnProductDetailsPage();
  });

  it("cy.request(), check status code", () => {});
});
