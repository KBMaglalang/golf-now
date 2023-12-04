describe("Header Navigation Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("checks homepage loads", () => {
    cy.contains(/GolfNow/i);
  });

  // header
  it("check for category page new", () => {
    cy.get('[data-test="category-new"]').click();
    cy.get('[data-test="category-header"]').contains(/new/i);
  });
  it("check for category page deals", () => {
    cy.get('[data-test="category-deals"]').click();
    cy.get('[data-test="category-header"]').contains(/deals/i);
  });
  it("check for category page clubs", () => {
    cy.get('[data-test="category-clubs"]').click();
    cy.get('[data-test="category-header"]').contains(/clubs/i);
  });
  it("check for category page golf balls", () => {
    cy.get('[data-test="category-balls"]').click();
    cy.get('[data-test="category-header"]').contains(/balls/i);
  });
  it("check for category page golf shoes", () => {
    cy.get('[data-test="category-shoes"]').click();
    cy.get('[data-test="category-header"]').contains(/shoes/i);
  });
  it("check for category page golf clothing", () => {
    cy.get('[data-test="category-clothing"]').click();
    cy.get('[data-test="category-header"]').contains(/clothing/i);
  });
  it("check for category page golf bag-carts", () => {
    cy.get('[data-test="category-bag-carts"]').click();
    cy.get('[data-test="category-header"]').contains(/bag/i);
  });
  it("check for category page golf golf-tech", () => {
    cy.get('[data-test="category-golf-tech"]').click();
    cy.get('[data-test="category-header"]').contains(/tech/i);
  });
  // return to homepage
});

describe("Footer Navigation Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("checks homepage loads", () => {
    cy.contains(/GolfNow/i);
  });

  // footer
  it("check for footer page new", () => {
    cy.get('[data-test="footer-new"]').click();
    cy.get('[data-test="category-header"]').contains(/new/i);
  });
  it("check for footer page deals", () => {
    cy.get('[data-test="footer-deals"]').click();
    cy.get('[data-test="category-header"]').contains(/deals/i);
  });
  it("check for footer clubs", () => {
    cy.get('[data-test="footer-clubs"]').click();
    cy.get('[data-test="category-header"]').contains(/clubs/i);
  });
  it("check for footer golf balls", () => {
    cy.get('[data-test="footer-balls"]').click();
    cy.get('[data-test="category-header"]').contains(/balls/i);
  });
  it("check for footer golf shoes", () => {
    cy.get('[data-test="footer-shoes"]').click();
    cy.get('[data-test="category-header"]').contains(/shoes/i);
  });
  it("check for footer golf clothing", () => {
    cy.get('[data-test="footer-clothing"]').click();
    cy.get('[data-test="category-header"]').contains(/clothing/i);
  });
  it("check for footer golf bag-carts", () => {
    cy.get('[data-test="footer-bag-carts"]').click();
    cy.get('[data-test="category-header"]').contains(/bag/i);
  });
  it("check for footer  golf-tech", () => {
    cy.get('[data-test="footer-golf-tech"]').click();
    cy.get('[data-test="category-header"]').contains(/tech/i);
  });

  it("check for footer  about-us", () => {
    cy.get('[data-test="footer-about-us"]').click();
    cy.get('[data-test="category-header"]').contains(/About/i);
  });
  it("check for footer  contact", () => {
    cy.get('[data-test="footer-contact"]').click();
    cy.get('[data-test="category-header"]').contains(/Contact/i);
  });
  it("check for footer  terms-of-use", () => {
    cy.get('[data-test="footer-terms-of-use"]').click();
    cy.get('[data-test="category-header"]').contains(/Terms/i);
  });
  it("check for footer  privacy-policy", () => {
    cy.get('[data-test="footer-privacy-policy"]').click();
    cy.get('[data-test="category-header"]').contains(/Privacy/i);
  });
  it("check for footer  cookie-policy", () => {
    cy.get('[data-test="footer-cookie-policy"]').click();
    cy.get('[data-test="category-header"]').contains(/Cookie/i);
  });
});

describe("Search Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("checks homepage loads", () => {
    cy.contains(/GolfNow/i);
  });

  it("should go to the search page from the input box", () => {
    cy.get('[data-test="search-input"]').type("{enter}");
    cy.get('[data-test="category-header"]').contains(/Search/i);
  });
  it("should go to teh search page from search button", () => {
    cy.get('[data-test="search-button"]').click();
    cy.get('[data-test="category-header"]').contains(/Search/i);
  });
});

// other pages
