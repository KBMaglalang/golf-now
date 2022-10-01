describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should visit Homepage", () => {
    // The new page should contain an h1 with "About page"
    cy.get("h3").contains("Top Selling Products");
  });

  it("should go to About page", () => {
    // Find a link with an href attribute containing "about" and click it
    cy.contains("p", "About Us").click();

    // The new url should include "/about"
    cy.url().should("include", "/about");

    // The new page should contain an h1 with "About page"
    cy.get("h3").contains("About");
  });

  it("should go to CLUBS page", () => {
    cy.contains("a", "Clubs").click();
    cy.url().should("include", "/products/clubs");
    cy.get("h3").contains("Clubs");
  });

  it("should go to BALLS page", () => {
    cy.contains("a", "Balls").click();
    cy.url().should("include", "/products/balls");
    cy.get("h3").contains("Balls");
  });

  it("should go to SHOES page", () => {
    cy.contains("a", "Shoes").click();
    cy.url().should("include", "/products/shoes");
    cy.get("h3").contains("Shoes");
  });

  it("should go to CLOTHING page", () => {
    cy.contains("a", "Clothing").click();
    cy.url().should("include", "/products/clothing");
    cy.get("h3").contains("Clothing");
  });

  it("should go to BAGS AND CARTS page", () => {
    cy.contains("a", "Bags & Carts").click();
    cy.url().should("include", "/products/bag-carts");
    cy.get("h3").contains("Bag Carts");
  });

  it("should go to GOLF TECH page", () => {
    cy.contains("a", "Golf Tech").click();
    cy.url().should("include", "/products/golf-tech");
    cy.get("h3").contains("Golf Tech");
  });

  it("should go to BRAND page", () => {
    cy.contains("a", "Brand").click();
    cy.url().should("include", "/products/brand");
    cy.get("h3").contains("Brand");
  });

  it("should go to CART page", () => {
    cy.get('[aria-label="cart"]').click();
    cy.url().should("include", "/cart");
    cy.get("h3").contains("Your Cart");
  });
});
