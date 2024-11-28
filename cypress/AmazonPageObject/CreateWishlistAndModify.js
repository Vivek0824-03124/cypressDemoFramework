const selectors = {
  inputFields: {
    listName: "#list-name",
  },
  button: {
    createList: "#createList input",
    createListCreateButton: '[class$="create-list-create-button"]',
    addToCart: '[data-action="add-to-cart"]',
    delete: '[name="submit.deleteItem"]',
    confirmDeletion: "#list-delete-confirm input",
    deleteList: '[data-action="a-modal"] input',
  },
  text: {
    wishListName: '[id^="wl-list-entry-title"]',
    deleted: '[class="a-list-item"] .a-alert-content',
    createNewList: ".a-popover-header-content",
  },
  link: {
    undo: "[id*='itemUndoLink']",
    productTitle: '[id*="itemName_"]',
    moreOptions: '[alt="More Options"]',
    manageList: "#editYourList",
  },
};

class WishList {
  userCreateNewWishList(wishListName) {
    cy.get(selectors.button.createList).click();
    cy.get(selectors.text.createNewList).should(
      "have.text",
      "Create a new list"
    );
    cy.get(selectors.inputFields.listName).click().clear().type(wishListName);
    cy.get(selectors.button.createListCreateButton).click();
  }

  userVerifyTheWishListIsCreatedSuccessfully(wishListName) {
    let name;
    cy.get(selectors.text.wishListName)
      .invoke("text")
      .then((text) => {
        name = text.trim();
        assert.equal(
          text.trim(),
          wishListName,
          "Wishlist name is not matching"
        );
      });
  }

  verifyProductDetailsAndButtonsInWishList(productName) {
    cy.get(selectors.link.productTitle)
      .invoke("attr", "title")
      .should("include", productName);
    cy.get(selectors.button.addToCart).should("be.visible");
    cy.get(selectors.button.delete).should("be.visible");
  }

  verifyDeleteButton() {
    cy.get(selectors.button.delete).click();
    cy.get(selectors.text.deleted).should("have.text", "Deleted");
  }

  verifyUndoButton() {
    cy.get(selectors.link.undo).click();
    cy.get(selectors.link.productTitle).should("be.visible");
  }

  userDeleteItemFromCart() {
    cy.get(selectors.button.delete).click();
  }

  userDeleteWishList() {
    cy.get(selectors.link.moreOptions).click();
    cy.get(selectors.link.manageList).click();
    cy.get(selectors.button.deleteList).scrollIntoView().click();
    cy.get(selectors.button.confirmDeletion).should("be.visible");
    cy.get(selectors.button.confirmDeletion).wait(2000).click({ force: true });
    cy.get(selectors.button.createList).should("be.visible");
  }
}
export default new WishList();
