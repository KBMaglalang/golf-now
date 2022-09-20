describe("Search", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("search for a product that exists", () => {
    cy.get('[class="searchForm"]').type("Batteries");
    cy.get('[class="searchForm"]').find("button").click();

    cy.get("main div").should("contain", "CR2 Rechargable Batteries");
  });

  it("search for a product that does not exit", () => {
    cy.get('[class="searchForm"]').type("Car");
    cy.get('[class="searchForm"]').find("button").click();

    cy.get("main div").should("contain", "Nothing Found");
  });
});
