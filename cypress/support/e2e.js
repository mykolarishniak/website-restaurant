import './commands';

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
  // Ignore Firebase errors during tests
  if (err.message.includes('Firebase') || err.message.includes('auth')) {
    return false;
  }
  return true;
});

// Dismiss alerts by default
beforeEach(() => {
  cy.on('window:alert', () => true);
  cy.on('window:confirm', () => true);
});
