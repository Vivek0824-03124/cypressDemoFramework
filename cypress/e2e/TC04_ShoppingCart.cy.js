import ShoppingCart from "../AmazonPageObject/ShoppingCart.js";
import ProductDetails from "../AmazonPageObject/ProductDetailsPage.js";

describe("Amazon Shopping Cart Validation", () => {
  let userData;
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
      cy.addProductIntoCart();
    });
  });
  it("User verify Shopping Cart Functionality", () => {
    ProductDetails.clickOnCartButtonAfterAddingProductIntoCart();
    ShoppingCart.verifyProductDetailsOnShoppingCartPage(
      userData.productName,
      userData.price
    );
    ShoppingCart.verifyTextAndButtons();
    ShoppingCart.verifyQuantityModification();
    ShoppingCart.verifyShareButton();
    ShoppingCart.verifySaveForLaterButtonFunctionality(userData.productName);
    ShoppingCart.verifyMoveToCartButton();
    ShoppingCart.verifyUserIsAbleToRemoveProductFromCart(userData.productName);
  });
});
