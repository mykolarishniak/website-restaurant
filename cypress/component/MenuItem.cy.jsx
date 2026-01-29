import MenuItem from '../../src/frontend/components/MenuItem/MenuItem';

describe('MenuItem Component', () => {
  const mockItem = {
    id: '1',
    title: 'Тестова страва',
    price: 150,
    imgSrc: 'https://via.placeholder.com/150',
    category: 'main',
  };

  beforeEach(() => {
    cy.mount(<MenuItem item={mockItem} />);
  });

  it('should render item title', () => {
    cy.contains(mockItem.title).should('exist');
  });

  it('should render item price with currency', () => {
    cy.contains(`${mockItem.price} грн`).should('exist');
  });

  it('should render item image', () => {
    cy.get('img').should('have.attr', 'src', mockItem.imgSrc);
    cy.get('img').should('have.attr', 'alt', mockItem.title);
  });

  it('should render order button', () => {
    cy.get('button').contains('Замовити').should('exist');
  });

  it('should have clickable order button', () => {
    cy.get('button').contains('Замовити').click({ force: true });
  });
});

describe('MenuItem with different prices', () => {
  it('should display string price correctly', () => {
    const itemWithStringPrice = {
      id: '2',
      title: 'Страва з текстовою ціною',
      price: '200 грн',
      imgSrc: 'https://via.placeholder.com/150',
    };
    cy.mount(<MenuItem item={itemWithStringPrice} />);
    cy.contains('200 грн').should('exist');
  });

  it('should display numeric price correctly', () => {
    const itemWithNumericPrice = {
      id: '3',
      title: 'Страва з числовою ціною',
      price: 250,
      imgSrc: 'https://via.placeholder.com/150',
    };
    cy.mount(<MenuItem item={itemWithNumericPrice} />);
    cy.contains('250 грн').should('exist');
  });
});
