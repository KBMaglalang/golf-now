describe("Order", () => {
  before(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("should have nothing in the cart", () => {
    cy.get('[aria-label="cart"]').click();
    cy.url().should("include", "/cart");
    cy.get("main").contains("Cart is Empty");
  });

  it("should add product to cart", () => {
    cy.clearLocalStorage();
    cy.visit("/");
    cy.contains("Rogue ST Max Driver").click();
    cy.get("h6").should("contain", "40128761");

    cy.contains("Add to Cart").click();

    cy.get('[aria-label="cart"]').click();
    cy.url().should("include", "/cart");
    cy.get("main").contains("Rogue ST Max Driver");
  });

  it("should not be able to add to cart", () => {
    cy.clearLocalStorage();

    cy.visit("/");
    cy.contains("a", "Balls").click();
    cy.url().should("include", "/products/balls");

    cy.contains("2022 Tour Speed Golf Balls").click();
    cy.get("h6").should("contain", "4012846101");

    cy.contains("Add to Cart").should("be.disabled");

    cy.get('[aria-label="cart"]').click();
    cy.url().should("include", "/cart");
    cy.get("main").should("not.contain", "2022 Tour Speed Golf Balls");
  });
});
