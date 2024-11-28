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
    reviewBody: "[id*=customer_review] > .a-spacing-small.review-data",
    addedToCart: "#attachDisplayAddBaseAlert h4",
    oneItemAdded: 'div>[class*="header-main"]',
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
    cy.get(selectors.button.addToCart)
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
    cy.get(selectors.button.addToCart).click();
    cy.get(selectors.text.addedToCart).should("have.text", "Added to cart");
    cy.get(selectors.button.viewCart).should("be.visible");
    cy.get(selectors.button.proceedToCheckout).should("be.visible");
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
      .contains("One item added to")
      .should("be.visible");
    cy.get(selectors.link.wishListName).should("have.text", nameOfWishList);
  }

  clickOnViewYourListLink() {
    cy.get(selectors.link.viewYourList).click();
  }

  mockTheNameOfTheProductOnProductDetailsPage() {
    cy.intercept("GET", "api/marketplaces/A21TJRUUN4KGV/*", {
      statusCode: 200,
      body: {
        productPrice: "50000",
      },
    }).as("mockProductPrice");

    cy.reload();
    
    cy.wait("@mockProductPrice").then((intercept) => {
      expect(intercept.response.body.productPrice).equal("50000");
    });
  }
}
export default new ProductDetails();
