import Header from '../../src/frontend/components/Header/Header';

describe('Header Component', () => {
  beforeEach(() => {
    cy.mount(<Header />);
  });

  it('should render logo', () => {
    cy.contains('UzhRestaurant').should('exist');
  });

  it('should have navigation links', () => {
    cy.contains('Про нас').should('exist');
    cy.contains('Ціни').should('exist');
    cy.contains('Контакти').should('exist');
  });

  it('should have cart icon', () => {
    cy.get('a[href="/cart"]').should('exist');
  });

  it('should show login and register buttons when not authenticated', () => {
    cy.contains('Увійти').should('exist');
    cy.contains('Зареєструватися').should('exist');
  });

  it('should have working logo link', () => {
    cy.get('a[href="/"]').should('exist');
  });

  it('should have working login link', () => {
    cy.get('a[href="/login"]').should('exist');
  });

  it('should have working register link', () => {
    cy.get('a[href="/register"]').should('exist');
  });
});

describe('Header Structure', () => {
  beforeEach(() => {
    cy.mount(<Header />);
  });

  it('should render header element', () => {
    cy.get('header').should('exist');
  });

  it('should render nav element', () => {
    cy.get('nav').should('exist');
  });
});
