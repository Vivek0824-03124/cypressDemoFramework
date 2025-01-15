import ProductDetails from "../AmazonPageObject/ProductDetailsPage.js";
import ProductListPage from "../AmazonPageObject/ProductListPage.js";
import ShoppingCart from "../AmazonPageObject/ShoppingCart.js";

describe("Amazon Product details Validation", () => {
  let userData;
  let productPrice;

  before(() => {
    cy.loginAmazon();
    cy.fixture("productDetails").then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.launchUrl();
    cy.SearchProduct(userData.productType, userData.brandName, userData.rating);
    ProductListPage.fetchPriceOnProductListPage().then((price) => {
      productPrice = price;
    });
  });
  it("User verify Product details page", () => {
    ProductListPage.clickOnProductLink(userData.productName);
    ProductDetails.verifyProductNameAndPriceOnProductDetailsPage(
      userData.productName,
      productPrice
    );
    ProductDetails.verifyBuyNowAndAddToCartButtonIsVisible();
    cy.generateRandomData().then((data) => {
      ProductDetails.verifyPinCodeUpdateFunctionality(data.pinCode);
    });
    ProductDetails.verifyRatingOnProductDetailsPage();
    ProductDetails.verifyReviewOfProductsOnProductDetailsPage(userData.keyword);
  });
  // splited into 2 It blocks, just to excerise cooking handling
  it.only("User verify Add to Cart Functionality", () => {
    ProductListPage.clickOnAddToCartButton(userData.productName);
    ProductListPage.clickOnCartLink();
    // ProductDetails.clickOnAddToCartButtonAndVerifyProductAddedMessage();
    // ProductDetails.clickOnCartButtonAfterAddingProductIntoCart();
    ShoppingCart.verifyUserIsAbleToRemoveProductFromCart(userData.productName);
  });
});
