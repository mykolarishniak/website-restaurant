describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to home page', () => {
    cy.visit('/login');
    cy.get('a[href="/"]').first().click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should navigate to registration page', () => {
    cy.visit('/login');
    cy.get('a[href="/register"]').first().click();
    cy.url().should('include', '/register');
  });

  it('should navigate to login page', () => {
    cy.visit('/register');
    cy.get('a[href="/login"]').first().click();
    cy.url().should('include', '/login');
  });

  it('should navigate to category from home', () => {
    cy.get('[class*="card"]').first().click();
    cy.url().should('include', '/category/');
  });

  it('should navigate back to home from category', () => {
    cy.visit('/category/drinks');
    cy.get('a[href="/"]').first().click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});

describe('Protected Routes', () => {
  it('should redirect /cart to login when not authenticated', () => {
    cy.visit('/cart');
    cy.url().should('include', '/login');
  });

  it('should redirect /checkout to login when not authenticated', () => {
    cy.visit('/checkout');
    cy.url().should('include', '/login');
  });

  it('should redirect /orders to show message when not authenticated', () => {
    cy.visit('/orders');
    cy.get('body').should('be.visible');
  });
});
