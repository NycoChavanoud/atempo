describe("homepage", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit("/menu");
  });

  it("displays a link button", () => {
    cy.contains("Tableau de bord").click();
    cy.url().should("include", "/dashboard");
  });
});
