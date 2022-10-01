describe("Search", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("search for a product that exists", () => {
    cy.get('[aria-label="search"]').type("Wingman{enter}");

    cy.get("main div").should("contain", "Wingman GPS Speaker");
  });

  it("search for a product that does not exit", () => {
    cy.get('[aria-label="search"]').type("Car{enter}");

    cy.get("main div").should("contain", "Nothing Found");
  });
});
