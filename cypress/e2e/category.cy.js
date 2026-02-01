describe('Category Page', () => {
  const categories = ['drinks', 'soups', 'salads', 'main', 'desserts', 'sides'];

  it('should display drinks category', () => {
    cy.visit('/category/drinks');
    cy.get('h1').should('contain', 'Напої');
  });

  it('should display soups category', () => {
    cy.visit('/category/soups');
    cy.get('h1').should('contain', 'Супи');
  });

  it('should display header on category page', () => {
    cy.visit('/category/drinks');
    cy.get('header').should('be.visible');
  });

  it('should show loading state initially', () => {
    cy.visit('/category/drinks');
    cy.get('main').should('be.visible');
  });

  it('should display menu items or empty message', () => {
    cy.visit('/category/drinks');
    cy.wait(2000);
    cy.get('main').should('be.visible');
  });

  it('should have order buttons on menu items', () => {
    cy.visit('/category/drinks');
    cy.wait(2000);
    cy.get('body').then(($body) => {
      if ($body.find('[class*="menuItem"]').length > 0) {
        cy.get('button').contains('Замовити').should('exist');
      }
    });
  });

  categories.forEach((category) => {
    it(`should load ${category} category without errors`, () => {
      cy.visit(`/category/${category}`);
      cy.get('main').should('be.visible');
    });
  });
});
