import ShoppingCart from "../AmazonPageObject/ShoppingCart.js";
import ProductDetails from "../AmazonPageObject/ProductDetailsPage.js";
import ProductListPage from "../AmazonPageObject/ProductListPage.js";

describe("Amazon Shopping Cart Validation", () => {
  let userData;
  let productPrice;

  before(() => {
    cy.loginAmazon();
    cy.launchUrl();
    cy.fixture("productDetails").then((data) => {
      userData = data;
      cy.SearchProduct(
        userData.productType,
        userData.brandName,
        userData.rating
      );
      ProductListPage.fetchPriceOnProductListPage().then((price) => {
        productPrice = price;
      });
      // cy.addProductIntoCart();
    });
  });
  it("User verify Shopping Cart Functionality", () => {
    ProductListPage.clickOnAddToCartButton(userData.productName);
    ProductListPage.clickOnCartLink();
    // ProductDetails.clickOnCartButtonAfterAddingProductIntoCart();
    ShoppingCart.verifyProductDetailsOnShoppingCartPage(
      userData.productName,
      productPrice
    );
    ShoppingCart.verifyTextAndButtons();
    ShoppingCart.verifyQuantityModification();
    ShoppingCart.verifyShareButton();
    ShoppingCart.verifySaveForLaterButtonFunctionality(userData.productName);
    ShoppingCart.verifyMoveToCartButton();
    ShoppingCart.verifyUserIsAbleToRemoveProductFromCart(userData.productName);
  });
});
