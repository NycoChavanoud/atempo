describe("dashboard", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  it("clicks on the sessions button", () => {
    cy.visit("/dashboard");
    cy.get('[data-cy="sessions"]').click();
    cy.url().should("include", "/dashboard");
  });

  it("clicks on the clients button", () => {
    cy.visit("/dashboard");
    cy.get('[data-cy="clients"]').click();
    cy.url().should("include", "/dashboard");
  });
});
