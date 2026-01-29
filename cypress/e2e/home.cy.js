describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the header with navigation', () => {
    cy.get('header').should('be.visible');
    cy.get('nav').should('be.visible');
  });

  it('should display the hero section', () => {
    cy.get('h1').should('be.visible');
  });

  it('should display category cards', () => {
    cy.get('[class*="card"]').should('have.length.at.least', 1);
  });

  it('should navigate to category page when clicking a category', () => {
    cy.get('[class*="card"]').first().click();
    cy.url().should('include', '/category/');
  });

  it('should have working navigation links', () => {
    cy.get('a[href="/cart"]').should('exist');
  });

  it('should display footer', () => {
    cy.get('footer').should('be.visible');
  });
});
