import RegistrationForm from '../../src/frontend/components/RegistrationForm/RegistrationForm';

describe('RegistrationForm Component', () => {
  beforeEach(() => {
    cy.mount(<RegistrationForm />);
  });

  it('should render registration title', () => {
    cy.contains('Створити новий обліковий запис').should('exist');
  });

  it('should render username input', () => {
    cy.get('input#username').should('exist');
    cy.get('input#username').should('have.attr', 'placeholder', "Введіть ваше ім'я");
  });

  it('should render email input', () => {
    cy.get('input#email').should('exist');
    cy.get('input#email').should('have.attr', 'placeholder', 'example@mail.com');
  });

  it('should render password input', () => {
    cy.get('input#password').should('exist');
    cy.get('input#password').should('have.attr', 'placeholder', 'Мінімум 8 символів');
  });

  it('should render submit button', () => {
    cy.get('button[type="submit"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Зареєструватися');
  });

  it('should render link to login', () => {
    cy.contains('Вже маєте обліковий запис?').should('exist');
    cy.get('a[href="/login"]').should('exist');
  });

  it('should allow typing in username field', () => {
    cy.get('input#username').type('TestUser');
    cy.get('input#username').should('have.value', 'TestUser');
  });

  it('should allow typing in email field', () => {
    cy.get('input#email').type('test@example.com');
    cy.get('input#email').should('have.value', 'test@example.com');
  });

  it('should allow typing in password field', () => {
    cy.get('input#password').type('testpassword123');
    cy.get('input#password').should('have.value', 'testpassword123');
  });

  it('should have required attribute on all inputs', () => {
    cy.get('input#username').should('have.attr', 'required');
    cy.get('input#email').should('have.attr', 'required');
    cy.get('input#password').should('have.attr', 'required');
  });
});

describe('RegistrationForm Labels', () => {
  beforeEach(() => {
    cy.mount(<RegistrationForm />);
  });

  it('should have username label', () => {
    cy.contains("Ім'я користувача").should('exist');
  });

  it('should have email label', () => {
    cy.contains('Email').should('exist');
  });

  it('should have password label', () => {
    cy.contains('Пароль').should('exist');
  });
});
