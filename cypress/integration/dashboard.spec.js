describe("dashboard", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  xit("clicks on the sessions button", () => {
    cy.visit("/dashboard");
    cy.get('[data-cy="sessions"]').click();
    cy.url().should("include", "/dashboard");
  });

  xit("clicks on the clients button", () => {
    cy.visit("/dashboard");
    cy.get('[data-cy="clients"]').click();
    cy.url().should("include", "/dashboard");
  });
});
