import Categories from '../../src/frontend/components/Categories/Categories';

describe('Categories Component', () => {
  beforeEach(() => {
    cy.mount(<Categories />);
  });

  it('should render section title', () => {
    cy.contains('Категорії').should('exist');
  });

  it('should render all 6 category cards', () => {
    cy.get('[class*="card"]').should('have.length', 6);
  });

  it('should display Салати category', () => {
    cy.contains('Салати').should('exist');
  });

  it('should display Супи category', () => {
    cy.contains('Супи').should('exist');
  });

  it('should display Основні страви category', () => {
    cy.contains('Основні страви').should('exist');
  });

  it('should display Гарніри category', () => {
    cy.contains('Гарніри').should('exist');
  });

  it('should display Напої category', () => {
    cy.contains('Напої').should('exist');
  });

  it('should display Десерти category', () => {
    cy.contains('Десерти').should('exist');
  });

  it('should render images for each category', () => {
    cy.get('[class*="card"] img').should('have.length', 6);
  });

  it('should have clickable category cards', () => {
    cy.get('[class*="card"]').first().click({ force: true });
  });
});

describe('Categories Grid Layout', () => {
  beforeEach(() => {
    cy.mount(<Categories />);
  });

  it('should render grid container', () => {
    cy.get('[class*="grid"]').should('exist');
  });

  it('should render section element', () => {
    cy.get('section').should('exist');
  });
});
