// check product that has no stock
xdescribe("check product that has no stock", () => {
  beforeEach(() => {
    cy.visit("/clothing/40010826");
  });

  it("checks page loads", () => {
    cy.contains(/GolfNow/i);
  });

  it("should contain no stock product", () => {
    cy.get('[data-test="product-name"]').contains(/Short Sleeve Polo/i);
    cy.get('[data-test="product-stock"]').contains(/Stock: 0/i);
  });

  // buy now button should be disabled
  it("should not be able to activate buy now", () => {
    cy.get('[data-test="product-buy-now"]').should("be.disabled");
  });

  // increase quantity should be disabled
  it("should not be able to increase quantity", () => {
    cy.get('[data-test="product-quantity-increment"]').should("be.disabled");
  });

  // decrease quantity should be disabled
  it("should not be able to decrease quantity", () => {
    cy.get('[data-test="product-quantity-decrement"]').should("be.disabled");
  });

  // input quantity should be disabled
  it("should not be able to change the input", () => {
    cy.get('[data-test="product-quantity-input"]').should("be.disabled");
  });

  // add to cart should be disabled
  it("should not be able to add product to cart", () => {
    cy.get('[data-test="product-add-to-cart"]').should("be.disabled");
  });
});

// check product with stock
describe("check product with stock", () => {
  beforeEach(() => {
    cy.visit("/shoes/40125786");
  });

  it("checks page loads", () => {
    cy.contains(/GolfNow/i);
  });

  // should contain product with stock
  it("should contain product with stock", () => {
    cy.get('[data-test="product-name"]').contains(/Men's Ignite VI Slide/i);
    cy.get('[data-test="product-stock"]').contains(/Stock: 20/i);
  });

  // buy now button should be enabled and clickable
  it("should be able to activate buy now", () => {
    cy.get('[data-test="product-buy-now"]').should("be.enabled");
    cy.get('[data-test="product-buy-now"]').click();
    cy.get('[data-test="cart-button"]').click();
    cy.get('[data-test="cart-list"]').contains(/Men's Ignite VI/i);
    cy.get('[data-test="cart-list-item-quantity"]').contains(/1/i);
  });

  // increase quantity should be enabled
  it("should be able to increase quantity", () => {
    cy.get('[data-test="product-quantity-increment"]').should("be.enabled");
    cy.get('[data-test="product-quantity-increment"]').click();
    cy.get('[data-test="product-quantity-input"]').should("have.value", "2");
  });

  // decrease quantity should be enabled
  it("should be able to decrease quantity", () => {
    cy.get('[data-test="product-quantity-decrement"]').should("be.enabled");
    cy.get('[data-test="product-quantity-decrement"]').click();
    cy.get('[data-test="product-quantity-input"]').should("have.value", "1");
  });
  1;

  // input quantity should be enabled
  it("should be able to change the input", () => {
    cy.get('[data-test="product-quantity-input"]').should("be.enabled");
    cy.get('[data-test="product-quantity-input"]').clear();
    cy.get('[data-test="product-quantity-input"]').type("0");
    cy.get('[data-test="product-quantity-input"]').should("have.value", "10");
  });

  // add to cart should be enabled
  it("should be able to add the quantity to the cart", () => {
    cy.get('[data-test="product-add-to-cart"]').should("be.enabled");
    cy.get('[data-test="product-quantity-input"]').clear();
    cy.get('[data-test="product-quantity-input"]').type("3");
    cy.get('[data-test="product-quantity-input"]').should("have.value", "13");
    cy.get('[data-test="product-add-to-cart"]').click();
    cy.get('[data-test="cart-button"]').click();
    cy.get('[data-test="cart-list"]').contains(/Men's Ignite VI/i);
    cy.get('[data-test="cart-list-item-quantity"]').contains(/13/i);
  });
});
