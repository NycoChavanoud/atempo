describe("homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  xit("displays a title", () => {
    cy.get("h1").should("not.be.empty");
  });
});
