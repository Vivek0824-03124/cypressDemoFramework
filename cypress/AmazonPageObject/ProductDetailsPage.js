const selectors = {
  link: {
    customerReview: "#averageCustomerReviews",
    seeAllReview: '[data-hook="see-all-reviews-link-foot"]',
    location: '[id*="deliveryShortLine"]',
    wishListName: "#huc-list-link",
    viewYourList: "#huc-view-your-list-button a",
    cartContainer: "#nav-cart-count-container",
  },
  input: {
    filterReview: "#filterByKeywordTextBox",
    updatePinCode: '[autocomplete="postal-code"]',
  },
  button: {
    addToCart: '#add-to-cart-button[type="submit"]',
    addToCartBtn: "#add-to-cart-button",
    buyNow: "#buy-now-button",
    search: '[type="submit"]+[id="a-autoid-2-announce"]',
    viewCart: "#attach-view-cart-button-form",
    proceedToCheckout: "#attach-sidesheet-checkout-button",
    addToWishlist: "#add-to-wishlist-button-submit",
    seeAllBuyingOptions: ".a-button-text",
  },
  image: {
    productImage: "#landingImage",
  },
  text: {
    productTitle: "#title",
    priceSymbol: ".a-price-symbol",
    offerPrice: ".a-price span",
    reviewBody: "[id*=customer_review]",
    addedToCart: "#attachDisplayAddBaseAlert h4",
    oneItemAdded: "#huc-atwl-header-section",
  },
};

class ProductDetails {
  verifyProductNameAndPriceOnProductDetailsPage(productName, price) {
    cy.get(selectors.text.productTitle).should("include.text", productName);
    cy.get(selectors.text.offerPrice).eq(0).should("include.text", price);
    cy.get(selectors.text.priceSymbol).should("be.visible");
  }

  verifyRatingOnProductDetailsPage() {
    cy.get(selectors.link.customerReview).should("be.visible");
  }

  verifyImageOfProductOnProductDetailsPage() {
    cy.get(selectors.image.productImage).compareSnapshot("laptopImage", 0.2);
  }

  verifyBuyNowAndAddToCartButtonIsVisible() {
    cy.get(`${selectors.button.addToCart}, ${selectors.button.addToCartBtn}`)
      .should("be.visible")
      .and("not.be.disabled");
    cy.get(selectors.button.buyNow).should("be.visible");
  }

  verifyPinCodeUpdateFunctionality(pincode) {
    let previousPincode;
    let deliveryPincode;
    cy.get(selectors.link.location).invoke("text").as("location");
    cy.get("@location").then((text) => {
      previousPincode = text.trim();

      cy.log(`Previous Pincode: ${previousPincode}`);

      cy.get(selectors.link.location).click();
      if (previousPincode === pincode) deliveryPincode = pincode + 1;
      else {
        deliveryPincode = pincode;
      }
      cy.wait(2000); //  wait for dialouge box to load properly
      cy.get(selectors.input.updatePinCode)
        .clear()
        .type(deliveryPincode, { delay: 100 })
        .type("{enter}");
      cy.wait(2000); // wait for page to reload
      cy.get("@location").then((newText) => {
        const updatedPincode = newText.trim();
        cy.log(`Updated Pincode: ${updatedPincode}`);

        expect(updatedPincode).to.not.equal(
          previousPincode,
          "Pincode should be updated"
        );
      });
    });
  }

  clickOnAddToCartButtonAndVerifyProductAddedMessage() {
    cy.get(
      `${selectors.button.addToCart}, ${selectors.button.addToCartBtn}`
    ).then(($elements) => {
      if ($elements.length > 1) {
        cy.wrap($elements.eq(1)).click();
      } else {
        cy.wrap($elements.eq(0)).click();
      }
    });
    cy.get(selectors.button.viewCart).should("be.visible");
    cy.wait(5000);
    cy.get(selectors.button.proceedToCheckout).should("be.visible");
    cy.get(selectors.text.addedToCart).should("have.text", "Added to cart");
  }

  clickOnCartButtonAfterAddingProductIntoCart() {
    cy.get(selectors.button.viewCart).click();
  }

  verifyReviewOfProductsOnProductDetailsPage(keyword) {
    cy.get(selectors.link.seeAllReview).click();
    cy.get(selectors.input.filterReview).type(`${keyword}{enter}`);
    cy.wait(2000); // wait for page to load completely
    cy.get(selectors.text.reviewBody).each(($el) => {
      cy.wrap($el)
        .invoke("text")
        .then((text) => {
          expect(text.toLowerCase()).to.include(keyword.toLowerCase());
        });
    });
    cy.get(selectors.button.seeAllBuyingOptions)
      .contains("See All Buying Options")
      .click();
  }

  clickOnAddToWishlistButtonAndVerifyMessage(nameOfWishList) {
    cy.get(selectors.button.addToWishlist).click();
    cy.get(selectors.text.oneItemAdded)
      .first()
      .contains("One item added to")
      .should("be.visible");
    cy.get(selectors.link.wishListName).should("have.text", nameOfWishList);
  }

  clickOnViewYourListLink() {
    cy.get(selectors.link.viewYourList).click();
  }
}
export default new ProductDetails();
