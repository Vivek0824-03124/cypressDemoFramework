const selectors = {
  link: {
    proceedToBuy: '[value="Proceed to checkout"]',
    productLinkInSavedCart: ".a-text-normal > .a-truncate > .a-truncate-full",
    moveToCart: '[value="Move to cart"]',
    share: '[title="Share"]',
    emailShare: '[title="Share via e-mail"]',
    pinterest: '[title="Pin it on Pinterest"]',
    facebookShare: '[title="Share on Facebook"]',
    xShare: '[title="X"]',
    copyLinkUrl: '[class="link-section"]',
    closeButton: ".a-button-close",
    decreaseByOne: '[aria-label="Decrease quantity by one"]',
  },
  button: {
    delete: '[value="Delete"]',
    saveForlater: '[value="Save for later"]',
    seeMoreLikeThis: '[value="See more like this"]',
    increaseByOne: '[aria-label="Increase quantity by one"]',
  },
  text: {
    productName: 'h4 [class*="product-title"]',
    productPrice: '[class*="product-price"]',
    quantity: '[data-action="quantity"]',
    subtotal: '[data-name="Subtotals"][class*=activecart]',
    subtotalBuyBox: "#sc-subtotal-label-buybox",
    deleteSuccessMessage: '[data-feature-id="delete-success-message"]',
    saveForLater: '[data-action="save-for-later"]',
    shareWithFriends: "#a-popover-content-1 h3",
    deleteItemInCartMessage: ".sc-list-item-removed-msg span",
    saveForLaterMessage: ".sc-list-item-removed-msg span",
  },
  image: {
    productImage: '[class*="product-link"] img',
  },
};

class ShoppingCart {
  verifyProductDetailsOnShoppingCartPage(productTitle, productMRP) {
    cy.get(selectors.text.productName).should("include.text", productTitle);
    cy.get(
      '.aok-align-center > .a-price > [aria-hidden="true"] > .a-price-whole'
    ).should("include.text", productMRP);
    cy.get(selectors.image.productImage).should("be.visible");
  }

  verifyTextAndButtons() {
    cy.get(selectors.text.subtotal).should("be.visible");
    cy.get(selectors.text.quantity).should("be.visible");
    cy.get(selectors.link.proceedToBuy).should("be.visible");
    Object.values(selectors.button).forEach((locator) => {
      cy.get(locator).should("be.visible");
    });
  }
  verifyQuantityModification() {
    cy.get(selectors.text.quantity).should("be.visible");
    cy.get(selectors.button.increaseByOne).click();
    cy.wait(2000);
    cy.get(selectors.text.quantity)
      .invoke("attr", "data-old-value")
      .should("equal", "2");
    cy.get(selectors.text.subtotalBuyBox).should("include.text", "2 items");
    cy.get(selectors.link.decreaseByOne).click();
  }
  verifyShareButton() {
    cy.get(selectors.link.share).scrollIntoView().click({ force: true });
    cy.get(selectors.text.shareWithFriends).should(
      "have.text",
      "Share this product with friends"
    );
    cy.get(selectors.link.emailShare)
      .should("be.visible")
      .get(selectors.link.facebookShare)
      .should("be.visible")
      .get(selectors.link.pinterest)
      .should("be.visible")
      .get(selectors.link.xShare)
      .should("be.visible");
    cy.get(selectors.link.copyLinkUrl).should("be.visible");
    cy.reload();
  }
  verifySaveForLaterButtonFunctionality(productName) {
    cy.wait(2000); //click opertion got performed but not reflecting on UI due to this 2sec wait added
    cy.get(selectors.button.saveForlater).eq(0).click();
    cy.get(selectors.text.saveForLaterMessage).should(
      "include.text",
      " has been moved to Save For Later. "
    );

    cy.get(selectors.text.saveForLater)
      .should("include.text", productName)
      .and("include.text", " has been moved to Save For Later. ");
    cy.get("#sc-saved-cart-caption").first().click();
    cy.get(selectors.link.productLinkInSavedCart).should(
      "include.text",
      productName
    );
    cy.get(selectors.link.moveToCart).should("be.visible");
  }

  verifyMoveToCartButton() {
    cy.get(selectors.link.moveToCart).eq(0).click();
    cy.get(selectors.text.subtotal).should("include.text", "Subtotal (1 item)");
  }
  verifyUserIsAbleToRemoveProductFromCart(productName) {
    cy.get(selectors.button.delete).eq(0).click();
    cy.get(selectors.text.deleteItemInCartMessage).should(
      "include.text",
      " was removed from Shopping Cart. "
    );
    cy.get(selectors.text.deleteSuccessMessage)
      .should("include.text", productName)
      .and("include.text", " was removed from Shopping Cart. ");
  }
}

export default new ShoppingCart();
