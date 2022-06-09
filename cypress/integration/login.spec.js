describe("signUp", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  xit("is accessible from the connexion page", () => {
    cy.visit("/inscription");
    cy.contains("Inscription").click();
    cy.url().should("include", "/inscription");
  });
});

describe("signIn", () => {
  const email = "test2@test2.com";
  const wrongEmail = "test666@test.com";
  const password = "147258369";
  const wrongPassword = "0000";

  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit("/");
  });

  xit("is accessible from the connexion page", () => {
    cy.contains("Connectez-vous").click();
    cy.url().should("include", "/");
  });

  xit("Can login with correct credentials", () => {
    cy.get('[data-cy="email"]').type(email);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="signInButton"]').click();
  });

  xit("login with incorrect credentials", () => {
    cy.get('[data-cy="email"]').type(wrongEmail);
    cy.get('[data-cy="password"]').type(wrongPassword);
    cy.get('[data-cy="signInButton"]').click();
  });
});
