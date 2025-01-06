import WishList from "../AmazonPageObject/CreateWishlistAndModify.js";
import HomePage from "../AmazonPageObject/HomePage.js";
import ProductDetails from "../AmazonPageObject/ProductDetailsPage.js";

describe("Amazon WishList Validation", () => {
  let userData;
  before(() => {
    cy.loginAmazon();
    cy.fixture("productDetails").then((data) => {
      userData = data;
    });
  });
  it("Create wishlist", () => {
    HomePage.clickOnCreateWishList();
    WishList.userCreateNewWishList(userData.wishListName);
    WishList.userVerifyTheWishListIsCreatedSuccessfully(userData.wishListName);
    cy.SearchProduct(userData.productType, userData.brandName, userData.rating);
    ProductDetails.clickOnAddToWishlistButtonAndVerifyMessage(
      userData.wishListName
    );
    ProductDetails.clickOnViewYourListLink();
    WishList.verifyProductDetailsAndButtonsInWishList(userData.productName);
    WishList.verifyDeleteButton();
    WishList.verifyUndoButton();
    WishList.userDeleteItemFromCart();
    WishList.userDeleteWishList();
  });
});
