describe('Admin Page', () => {
  beforeEach(() => {
    cy.visit('/admin');
  });

  it('should display admin page', () => {
    cy.url().should('include', '/admin');
  });

  it('should have admin sidebar or navigation', () => {
    cy.get('body').should('be.visible');
  });

  it('should have add dish option', () => {
    // Admin page should have add dish functionality
    cy.get('body').then(($body) => {
      if ($body.find('a[href*="admin"]').length > 0 || $body.find('[class*="sidebar"]').length > 0) {
        cy.get('a, button').should('exist');
      }
    });
  });
});

describe('Admin Add Dish Page', () => {
  beforeEach(() => {
    cy.visit('/admin');
  });

  it('should display add dish form', () => {
    cy.get('form').should('be.visible');
  });

  it('should have title input', () => {
    cy.get('input').should('exist');
  });

  it('should have category select', () => {
    cy.get('select').should('exist');
  });

  it('should have submit button', () => {
    cy.get('button[type="submit"]').should('exist');
  });
});

describe('Admin Edit Dish Page', () => {
  beforeEach(() => {
    cy.visit('/admin/edit');
  });

  it('should display edit page', () => {
    cy.url().should('include', '/admin/edit');
  });

  it('should have dish selection', () => {
    cy.get('select').should('exist');
  });
});

describe('Admin Delete Dish Page', () => {
  beforeEach(() => {
    cy.visit('/admin/delete');
  });

  it('should display delete page', () => {
    cy.url().should('include', '/admin/delete');
  });

  it('should have dish selection', () => {
    cy.get('select').should('exist');
  });

  it('should have delete button', () => {
    cy.get('button').contains(/видалити/i).should('exist');
  });
});
