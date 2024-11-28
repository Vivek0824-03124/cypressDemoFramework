import LoginToAmazon from "../AmazonPageObject/LoginToAmazon.js";
let userData;

before(() => {
  cy.fixture("cred").then((data) => {
    userData = data;
  });
});
beforeEach(() => {
  cy.launchUrl();
  LoginToAmazon.clickOnSignInButton();
  LoginToAmazon.setUserName(userData.userName);
  LoginToAmazon.clickOnContinueButton();
});
describe("Amazon Login", () => {
  it("should not able to log with invalid credentials", () => {
    LoginToAmazon.setUserPassword(userData.password1);
    LoginToAmazon.clickOnSignIn();
    LoginToAmazon.verifyErrorMessgageForWrongCred(
      "Solve this puzzle to protect your account"
    );
  });

  it("should log in successfully with valid credentials", () => {
    LoginToAmazon.setUserPassword(userData.password);
    LoginToAmazon.clickOnSignIn();
    LoginToAmazon.verifyUserFirstNameOnHomePage(userData.userFirstName);
  });
});
