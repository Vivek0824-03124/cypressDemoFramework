import Settings from "../AmazonPageObject/AddressSettings";
import HomePage from "../AmazonPageObject/HomePage";

describe("Amazon Account Settings Validation", () => {
  before(() => {
    cy.loginAmazon();
  });
  it("Verify account setting functionality", () => {
    cy.generateRandomData().then((data) => {
      HomePage.navigateToYourAccountPage();
      Settings.clickOnYourAddresses();
      Settings.addNewAddressInAmazonAccount(data);
      Settings.verifyAddressSaved(data);
      Settings.verifyUserCanRemoveAddess();
    });
  });
  after(() => {
    cy.logoutAmazon();
  });
});
