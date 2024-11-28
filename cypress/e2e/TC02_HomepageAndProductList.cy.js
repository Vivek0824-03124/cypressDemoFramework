import HomePage from "../AmazonPageObject/HomePage.js";
import ProductListPage from "../AmazonPageObject/ProductListPage.js";

describe("Amazon Home Page Validation", () => {
  let userData;
  before(() => {
    cy.launchUrl();
    cy.fixture("productDetails").then((data) => {
      userData = data;
    });
    const folderToDelete = "cypress/snapshots/actual"; // Adjust the path as needed
    cy.task("deleteFolder", folderToDelete);
  });
  it("Verify Home Page Functionality", () => {
    HomePage.verifyAmazonLogoOnHomePage();
    HomePage.verifyAllElementsAreVisible();
    HomePage.verifyInputInSearchBox(userData.productType);
    HomePage.clickOnSearchIcon();
    HomePage.verifyTheProductNameAfterSearch('"laptop"');
    ProductListPage.verifyListOfSearchResult();
    ProductListPage.applyFilterByBrand(userData.brandName);
    ProductListPage.selectRatingOnProductListPage(userData.rating);
    ProductListPage.verifyBrandNameOfProductsListedAfterApplyingFilter(
      userData.brandName
    );
    ProductListPage.verifyRatingOfListedProduct();
    ProductListPage.clickOnProductLink(userData.productName);
  });
});
