import LoginToAmazon from "../AmazonPageObject/LoginToAmazon.js";
let userData;

before(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.fixture("cred").then((data) => {
    userData = data;
  });
});
describe("Amazon Login", () => {
  it("should not able to log with invalid credentials", () => {
    // cy.LaunchAmazonUrlThroughGoogle();
    cy.launchUrl();
    LoginToAmazon.clickOnSignInButton();
    LoginToAmazon.setUserName(userData.userName);
    LoginToAmazon.clickOnContinueButton();
    LoginToAmazon.setUserPassword(userData.password1);
    LoginToAmazon.clickOnSignIn();
    LoginToAmazon.verifyErrorMessgageForWrongCred(
      "Solve this puzzle to protect your account"
    );
  });

  it("should log in successfully with valid credentials", () => {
    cy.loginAmazon();
  });
});
