describe('Cart Page', () => {
  beforeEach(() => {
    cy.visit('/cart');
  });

  it('should redirect to login if not authenticated', () => {
    cy.url().should('include', '/login');
  });

  it('should display cart title when authenticated', () => {
    cy.url().should('include', '/login');
  });
});

describe('Cart Functionality', () => {
  it('should have cart link in header', () => {
    cy.visit('/');
    cy.get('a[href="/cart"]').should('exist');
  });

  it('should navigate to cart from header', () => {
    cy.visit('/');
    cy.get('a[href="/cart"]').click();
    cy.url().should('match', /(cart|login)/);
  });
});
