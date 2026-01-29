// Custom commands for Cypress tests

// Login command
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Register command
Cypress.Commands.add('register', (username, email, password) => {
  cy.visit('/register');
  cy.get('input[placeholder*="Ім\'я"]').type(username);
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Add to cart command
Cypress.Commands.add('addToCart', () => {
  cy.get('button').contains('Замовити').first().click();
});

// Clear alerts
Cypress.Commands.add('dismissAlert', () => {
  cy.on('window:alert', () => true);
  cy.on('window:confirm', () => true);
});
