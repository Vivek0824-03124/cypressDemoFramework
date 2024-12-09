const selectors = {
  link: {
    navbar: "#nav-xshop-container",
    fresh: "#nav-link-groceries",
    mxPlayer: '[href*="/minitv?ref_="]',
    bestSeller: '[href*="=nav_cs_bestsellers"]',
    electronics: '[href^="/electronics"]',
    amazonPay: '[href*="=nav_cs_apay"]',
    prime: "#nav-link-amazonprime",
    cart: "#nav-cart",
    yourAccount: "#nav-link-accountList",
    account: '[href*="=nav_AccountFlyout_ya"]',
    signOut: '[href*="AccountFlyout_signout"]',
    createWishList: '[href*="createList_lv_redirect"]',
  },
  inputFields: {
    searchBox: "#twotabsearchtextbox",
  },
  button: {
    hamburger: "#nav-hamburger-menu",
    searchDropdownBox: "#nav-search-dropdown-card",
    searchIcon: "#nav-search-submit-button",
    returnAndOrder: "#nav-orders",
  },
  text: {
    productName: ".a-color-state",
  },
  logo: {
    amazonLogo: "#nav-logo-sprites",
  },
};

class HomePage {
  verifyAmazonLogoOnHomePage() {
    cy.wait(2000); // added wait for page to load compeletly
    cy.get(selectors.logo.amazonLogo).compareSnapshot("amazon-logo", {
      failureThreshold: 0.2, // 20% acceptable difference
      failureThresholdType: "percent", // Threshold type (percent or pixel)
    });
  }
  verifyAllElementsAreVisible() {
    cy.get(selectors.link.navbar).should("be.visible");

    const expectedTexts = [
      "Gift Cards",
      "MX Player",
      "Best Sellers",
      "Electronics",
      "Today's Deals",
      "Sell",
      "Customer Service",
      "Home & Kitchen",
    ];

    cy.get("#nav-main a")
      .should("have.length.greaterThan", 0)
      .then(($elements) => {
        const actualTexts = [...$elements].map((el) => el.innerText.trim());

        expectedTexts.forEach((expectedText) => {
          expect(actualTexts).to.include(expectedText);
        });
      });

    cy.get(selectors.link.cart).should("be.visible");

    cy.get(selectors.inputFields.searchBox).should("be.visible");

    cy.get(selectors.button.hamburger).should("be.visible");
    cy.get(selectors.button.returnAndOrder).should("be.visible");
    cy.get(selectors.button.searchDropdownBox).should("be.visible");
    cy.get(selectors.button.searchIcon).should("be.visible");
  }
  verifyInputInSearchBox(productName) {
    cy.get(selectors.inputFields.searchBox).type(productName);
  }

  clickOnSearchIcon() {
    cy.get(selectors.button.searchIcon).click();
  }
  verifyTheProductNameAfterSearch(productName) {
    cy.get(selectors.text.productName).should("have.text", productName);
  }

  clickOnCreateWishList() {
    cy.get(selectors.link.yourAccount).trigger("mouseover");
    cy.get(selectors.link.createWishList).click();
  }

  navigateToYourAccountPage() {
    cy.get(selectors.link.yourAccount).trigger("mouseover");
    cy.get(selectors.link.account).click();
  }

  userAbleToLogoutFromAmazon() {
    cy.get(selectors.link.yourAccount).trigger("mouseover");
    cy.get(selectors.link.signOut).click();
  }
}
export default new HomePage();
