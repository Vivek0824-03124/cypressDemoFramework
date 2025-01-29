const selectors = {
  link: {
    productLink: '[data-cy="title-recipe"] h2',
    cart: "#nav-cart-count",
  },
  checkbox: {
    brandNameList: "#brandsRefinements",
    company: 'input[type="checkbox"]',
  },
  button: {
    starRating: ".a-star-medium-4",
    addToCart: '[data-cy="add-to-cart"] button',
  },
  text: {
    rating: '[data-cy="reviews-ratings-slot"] span',
    productLink: '[data-cy="title-recipe"]',
    price: '[href*="eq2305AU"] [class="a-price-whole"]',
    productTile: '[role="listitem"]',
  },
};

class ProductListPage {
  verifyListOfSearchResult() {
    cy.get(selectors.link.productLink).each(($el) => {
      cy.wrap($el)
        .invoke("text")
        .should("match", /Laptop|Chromebook/);
    });
  }

  applyFilterByBrand(brandName) {
    cy.get(selectors.checkbox.brandNameList)
      .contains("span.a-size-base", brandName)
      .should("exist")
      .parents("li")
      .find(selectors.checkbox.company)
      .check({ force: true });
  }

  selectRatingOnProductListPage(text) {
    cy.get(selectors.button.starRating).click();
  }

  verifyBrandNameOfProductsListedAfterApplyingFilter(brandName) {
    cy.get(selectors.link.productLink).each(($el) => {
      cy.wrap($el).invoke("text").should("include", brandName);
    });
  }
  verifyRatingOfListedProduct() {
    cy.get(selectors.text.rating).each(($el) => {
      cy.wrap($el).invoke("text").should("match", /4.|5./);
    });
  }
  clickOnProductLink(productName) {
    cy.get(selectors.text.productLink)
      .contains(productName)
      .invoke("removeAttr", "target")
      .click();
  }

  clickOnAddToCartButton(productName) {
    cy.get(selectors.link.productLink)
      .contains(productName)
      .parentsUntil(selectors.text.productTile)
      .find(selectors.button.addToCart)
      .click();
  }

  clickOnCartLink() {
    cy.get(selectors.link.cart).click({ force: true });
  }

  fetchPriceOnProductListPage() {
    return cy.get(selectors.text.price).invoke("text");
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

    cy.get(selectors.button.proceedToCheckout).should("be.visible");
    cy.get(selectors.text.addedToCart).should("have.text", "Added to cart");
  }
}
export default new ProductListPage();
