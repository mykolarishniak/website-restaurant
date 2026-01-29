import LoginForm from '../../src/frontend/components/LoginForm/LoginForm';

describe('LoginForm Component', () => {
  beforeEach(() => {
    cy.mount(<LoginForm />);
  });

  it('should render login title', () => {
    cy.contains('Увійти в акаунт').should('exist');
  });

  it('should render email input', () => {
    cy.get('input[type="email"]').should('exist');
    cy.get('input[name="email"]').should('have.attr', 'placeholder', 'Введіть email');
  });

  it('should render password input', () => {
    cy.get('input[type="password"]').should('exist');
    cy.get('input[name="password"]').should('have.attr', 'placeholder', 'Введіть пароль');
  });

  it('should render submit button', () => {
    cy.get('button[type="submit"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Увійти');
  });

  it('should render link to registration', () => {
    cy.contains('Не маєте акаунта?').should('exist');
    cy.get('a[href="/register"]').should('exist');
  });

  it('should allow typing in email field', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="email"]').should('have.value', 'test@example.com');
  });

  it('should allow typing in password field', () => {
    cy.get('input[name="password"]').type('testpassword');
    cy.get('input[name="password"]').should('have.value', 'testpassword');
  });

  it('should have required attribute on inputs', () => {
    cy.get('input[name="email"]').should('have.attr', 'required');
    cy.get('input[name="password"]').should('have.attr', 'required');
  });
});

describe('LoginForm Labels', () => {
  beforeEach(() => {
    cy.mount(<LoginForm />);
  });

  it('should have email label', () => {
    cy.contains('Email').should('exist');
  });

  it('should have password label', () => {
    cy.contains('Пароль').should('exist');
  });
});
