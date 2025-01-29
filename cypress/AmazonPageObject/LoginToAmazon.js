const selectors = {
  inputFields: {
    userName: '[type="email"]',
    password: "#ap_password",
  },
  button: {
    signIn: "#nav-link-accountList",
    btn_continue: "#continue",
    btn_signIn: "#signInSubmit",
  },
  text: {
    txt_firstName: "#nav-link-accountList-nav-line-1",
    txt_errorMessage: ".a-size-large",
  },
};

class LoginToAmazon {
  clickOnSignInButton() {
    cy.get(selectors.button.signIn).click({ force: true });
  }

  setUserName(username) {
    cy.get(selectors.inputFields.userName).type(username);
  }
  clickOnContinueButton() {
    cy.get(selectors.button.btn_continue).click();
  }
  setUserPassword(password) {
    cy.get(selectors.inputFields.password).type(password);
  }

  clickOnSignIn() {
    cy.get(selectors.button.btn_signIn).click();
  }

  verifyErrorMessgageForWrongCred(errorMessage) {
    cy.get(selectors.text.txt_errorMessage)
      .should("be.visible")
      .and("have.text", errorMessage);
  }

  verifyUserFirstNameOnHomePage(userFirstName) {
    cy.get(selectors.text.txt_firstName)
      .invoke("text")
      .then((text) => {
        assert.equal(text, userFirstName, "Not Equal");
      });
  }
}

export default new LoginToAmazon(); //pass object
