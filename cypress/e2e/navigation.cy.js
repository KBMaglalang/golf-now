describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should visit Homepage", () => {
    // The new page should contain an h1 with "About page"
    cy.get("h1").contains("Top Selling Products");
  });

  it("should go to About page", () => {
    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="about"]').click();

    // The new url should include "/about"
    cy.url().should("include", "/about");

    // The new page should contain an h1 with "About page"
    cy.get("h1").contains("About");
  });

  it("should go to CLUBS page", () => {
    cy.contains("li", "Clubs").click();
    cy.url().should("include", "/products/clubs");
    cy.get("h1").contains("Clubs");
  });

  it("should go to BALLS page", () => {
    cy.contains("li", "Balls").click();
    cy.url().should("include", "/products/balls");
    cy.get("h1").contains("Balls");
  });

  it("should go to SHOES page", () => {
    cy.contains("li", "Shoes").click();
    cy.url().should("include", "/products/shoes");
    cy.get("h1").contains("Shoes");
  });

  it("should go to CLOTHING page", () => {
    cy.contains("li", "Clothing").click();
    cy.url().should("include", "/products/clothing");
    cy.get("h1").contains("Clothing");
  });

  it("should go to BAGS AND CARTS page", () => {
    cy.contains("li", "Bags & Carts").click();
    cy.url().should("include", "/products/bag-carts");
    cy.get("h1").contains("Bag-carts");
  });

  it("should go to GOLF TECH page", () => {
    cy.contains("li", "Golf Tech").click();
    cy.url().should("include", "/products/golf-tech");
    cy.get("h1").contains("Golf-tech");
  });

  it("should go to BRAND page", () => {
    cy.contains("li", "Brand").click();
    cy.url().should("include", "/products/brand");
    cy.get("h1").contains("Brand");
  });

  it("should go to CART page", () => {
    cy.get('[alt="cart"]').click();
    cy.url().should("include", "/cart");
    cy.get("h1").contains("Your Cart");
  });
  // it ("should go to SPECIFIC PRODUCT page", () => {});
});
