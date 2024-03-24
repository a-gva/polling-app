describe('VotingCard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/');
  });

  it('renders the form', () => {
    cy.get('form').should('exist');
  });

  it('submits the form', () => {
    cy.get('textarea[name="question"]').type('The Best Beatle is...');
    cy.get('input[id="option1"]').type('John');
    cy.get('input[id="option2"]').type('Paul');
    cy.get('input[id="option3"]').type('George');
    cy.get('input[id="option4"]').type('Ringo');
    cy.get('[data-cy="form-submit"]').click();
  });
});
