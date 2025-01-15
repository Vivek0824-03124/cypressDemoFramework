import WishList from "../AmazonPageObject/CreateWishlistAndModify.js";
import HomePage from "../AmazonPageObject/HomePage.js";
import ProductDetails from "../AmazonPageObject/ProductDetailsPage.js";
import ProductListPage from "../AmazonPageObject/ProductListPage.js";

describe("Amazon WishList Validation", () => {
  let userData;
  before(() => {
    cy.loginAmazon();
    cy.fixture("productDetails").then((data) => {
      userData = data;
    });
  });
  it("Create wishlist", () => {
    cy.launchUrl();
    HomePage.clickOnCreateWishList();
    WishList.userCreateNewWishList(userData.wishListName);
    WishList.userVerifyTheWishListIsCreatedSuccessfully(userData.wishListName);
    cy.SearchProduct(userData.productType, userData.brandName, userData.rating);
    ProductListPage.clickOnProductLink(userData.productName);
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
