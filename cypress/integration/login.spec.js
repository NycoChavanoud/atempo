describe("login", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  it("is accessible from the menu", () => {
    cy.visit("/inscription");
    cy.contains("Inscription").click();
    cy.url().should("include", "/inscription");
  });
});
