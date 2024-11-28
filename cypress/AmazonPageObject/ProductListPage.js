const selectors = {
  link: {
    productLink: '[data-cy="title-recipe"] h2 a span',
  },
  checkbox: {
    brandNameList: "#brandsRefinements",
    company: 'input[type="checkbox"]',
  },
  button: {
    starRating: '[aria-label="4 Stars & Up"]',
  },
  text: {
    rating: '[data-cy="reviews-ratings-slot"] span',
    productLink: '[data-cy="title-recipe"]',
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
    cy.get(selectors.button.starRating).should("include.text", text);
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
}
export default new ProductListPage();
