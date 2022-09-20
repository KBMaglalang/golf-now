describe("Order", () => {
  before(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("should have nothing in the cart", () => {
    cy.get('[alt="cart"]').click();
    cy.url().should("include", "/cart");
    cy.get("span").contains("Cart is Empty");
  });

  it("should add product to cart", () => {
    cy.clearLocalStorage();
    cy.visit("/");
    cy.contains("Under Armour").click();
    cy.get("h4").should("contain", "40010826");

    cy.get("button").last().click();

    cy.get('[alt="cart"]').click();
    cy.url().should("include", "/cart");
    cy.get("span").contains("Men's Playoff 2.0 Short Sleeve Polo");
  });

  it("should not be able to add to cart", () => {
    cy.clearLocalStorage();

    cy.visit("/");
    cy.contains("li", "Balls").click();
    cy.url().should("include", "/products/balls");

    cy.contains("2022 Tour Speed Golf Balls").click();
    cy.get("h4").should("contain", "4012846101");

    cy.get("button").last().should("be.disabled");

    cy.get('[alt="cart"]').click();
    cy.url().should("include", "/cart");
    cy.get("span").should("not.contain", "2022 Tour Speed Golf Balls");
  });
});
