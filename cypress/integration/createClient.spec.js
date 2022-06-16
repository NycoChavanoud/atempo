describe("createClient", () => {
  const firstname = "Coco";
  const lastname = "L'asticot";
  const email = "pwet@gmail.com";
  const problematic = "Stress";

  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit("/clients/creationClient");
  });
  xit("should create a new client", () => {
    cy.get('[data-cy="firstname"]').type(firstname);
    cy.get('[data-cy="lastname"]').type(lastname);
    cy.get('[data-cy="email"]').type(email);
    cy.get('[data-cy="problematic"]').type(problematic);
    cy.get('[data-cy="submitBtn"]').click();
    cy.contains("Client sauvegardé.").should("be.visible");
  });
});
