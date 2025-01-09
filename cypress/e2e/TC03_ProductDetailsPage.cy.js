import ProductDetails from "../AmazonPageObject/ProductDetailsPage.js";
import ShoppingCart from "../AmazonPageObject/ShoppingCart.js";

describe("Amazon Product details Validation", () => {
  let userData;

  before(() => {
    cy.loginAmazon();
    cy.fixture("productDetails").then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.launchUrl();

    cy.SearchProduct(userData.productType, userData.brandName, userData.rating);
  });
  it("User verify Product details page", () => {
    ProductDetails.verifyProductNameAndPriceOnProductDetailsPage(
      userData.productName,
      userData.price
    );
    cy.generateRandomData().then((data) => {
      ProductDetails.verifyPinCodeUpdateFunctionality(data.pinCode);
    });
    ProductDetails.verifyRatingOnProductDetailsPage();
    ProductDetails.verifyReviewOfProductsOnProductDetailsPage(userData.keyword);
  });
  // splited into 2 It blocks, just to excerise cooking handling
  it("User verify Add to Cart Functionality", () => {
    ProductDetails.verifyBuyNowAndAddToCartButtonIsVisible();
    ProductDetails.clickOnAddToCartButtonAndVerifyProductAddedMessage();
    ProductDetails.clickOnCartButtonAfterAddingProductIntoCart();
    ShoppingCart.verifyUserIsAbleToRemoveProductFromCart(userData.productName);
  });
});
