const selectors = {
  inputFields: {
    listName: "#list-name",
    fullName: "#address-ui-widgets-enterAddressFullName",
    mobNumber: "#address-ui-widgets-enterAddressPhoneNumber",
    pinCode: "#address-ui-widgets-enterAddressPostalCode",
    address: "#address-ui-widgets-enterAddressLine1",
    address2: "#address-ui-widgets-enterAddressLine2",
    landMark: "#address-ui-widgets-landmark",
    townCity: '[aria-label="Town/City"]',
    state: '[id$="AddressStateOrRegion"]',
  },
  button: {
    addAddress: "#address-ui-widgets-form-submit-button",
    no_deleteAddressModal: "#deleteAddressModal-0-cancel-btn-announce",
    yes_deleteAddressModal: "#deleteAddressModal-0-submit-btn input",
  },
  text: {
    savedAddress: "#ya-myab-display-address-block-0",
    addNewAddress: "#address-ui-widgets-reload-url~h2",
    alertMessage: '[class*="alert-success"] h4',
    confirmDeletion: "#a-popover-header-3",
  },
  link: {
    yourAddress: '[data-card-identifier="AddressesAnd1Click"]',
    addAddress: "#ya-myab-address-add-link",
    editAddress: '[aria-label="Edit this address"]',
    removeAddress: '[aria-label="Delete this address"]',
    setAsDefault: '[aria-label="Set this address as default"]',
    updatedAddress: "#glow-ingress-line2",
  },
};
class Settings {
  clickOnYourAddresses() {
    cy.get(selectors.link.yourAddress).click();
  }

  addNewAddressInAmazonAccount(data) {
    cy.get(selectors.link.addAddress).click();
    cy.get(selectors.text.addNewAddress).should(
      "have.text",
      "Add a new address"
    );
    cy.get(selectors.inputFields.fullName)
      .click()
      .type(data.name, { delay: 300 });
    cy.get(selectors.inputFields.mobNumber)
      .clear()
      .type(data.phone, { delay: 100 });
    cy.get(selectors.inputFields.pinCode).clear().type(data.pinCode);
    cy.get(selectors.inputFields.address).type(data.address);
    cy.get(selectors.inputFields.address2).type("Janta Inter College Ballia");
    cy.get(selectors.inputFields.landMark).type(data.landmark);

    cy.get(selectors.button.addAddress).click();
  }

  verifyAddressSaved(data) {
    cy.get(selectors.text.alertMessage).should("have.text", "Address saved");
    cy.get(selectors.text.savedAddress).should("be.visible");
    cy.get(selectors.link.editAddress)
      .should("be.visible")
      .get(selectors.link.removeAddress)
      .should("be.visible")
      .get(selectors.link.setAsDefault)
      .should("be.visible");
    // cy.reload();
    // cy.get(selectors.link.updatedAddress).should("include.text", data.pinCode);
  }

  verifyUserCanRemoveAddess() {
    cy.get(selectors.link.removeAddress).click();
    cy.get(selectors.text.confirmDeletion).should(
      "have.text",
      "Confirm Deletion"
    );
    cy.get(selectors.button.no_deleteAddressModal).should("be.visible");
    cy.get(selectors.button.yes_deleteAddressModal).should("be.visible");
    cy.wait(3000); //to make dom stable
    cy.get(selectors.button.yes_deleteAddressModal).click({ force: true });
    cy.get(selectors.text.alertMessage)
      .should("have.text", "Address deleted")
      .and("be.visible");
  }
}

export default new Settings();
