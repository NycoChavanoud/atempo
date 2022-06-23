describe("createClient", () => {
  const firstname = "Alain";
  const lastname = "Chabat";
  const email = "pwet@gmail.com";
  const phone = "0909090909";
  const address = "6 pont des oeufs";
  const website_url = "chabaland.com";
  const fb_url = "facebook.com/chabattt";
  const insta_url = "instagram.com/chabattt";

  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit("/modification-profile");
  });
  xit("should edit my profile", () => {
    cy.get('[data-cy="firstname"]').type(firstname);
    cy.get('[data-cy="lastname"]').type(lastname);
    cy.get('[data-cy="email"]').type(email);
    cy.get('[data-cy="phone"]').type(phone);
    cy.get('[data-cy="address"]').type(address);
    cy.get('[data-cy="website_url"]').type(website_url);
    cy.get('[data-cy="fb_url"]').type(fb_url);
    cy.get('[data-cy="insta_url"]').type(insta_url);
    cy.get('[data-cy="submitBtn"]').click();
    cy.contains("C'est sauvegardé !").should("be.visible");
  });
});
