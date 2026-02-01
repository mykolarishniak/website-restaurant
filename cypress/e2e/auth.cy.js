describe('Authentication', () => {
  const testEmail = `test${Date.now()}@example.com`;
  const testPassword = 'testPassword123';
  const testUsername = 'TestUser';

  describe('Registration Page', () => {
    beforeEach(() => {
      cy.visit('/register');
    });

    it('should display registration form', () => {
      cy.get('form').should('be.visible');
      cy.get('input').should('have.length.at.least', 3);
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should show validation error for empty fields', () => {
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/register');
    });

    it('should show validation error for short password', () => {
      cy.get('input').eq(0).type(testUsername);
      cy.get('input[type="email"]').type(testEmail);
      cy.get('input[type="password"]').type('short');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/register');
    });

    it('should have link to login page', () => {
      cy.get('a[href="/login"]').should('exist');
    });
  });

  describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('should display login form', () => {
      cy.get('form').should('be.visible');
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should show error for invalid credentials', () => {
      cy.get('input[type="email"]').type('invalid@example.com');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/login');
    });

    it('should have link to registration page', () => {
      cy.get('a[href="/register"]').should('exist');
    });
  });
});
