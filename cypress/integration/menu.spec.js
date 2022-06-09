describe("homepage", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit("/menu");
  });

  xit("displays a link button", () => {
    cy.contains("Tableau de bord").click();
    cy.url().should("include", "/dashboard");
  });
});
