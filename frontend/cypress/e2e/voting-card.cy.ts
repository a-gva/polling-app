const formInput = {
  question: 'The Best Beatle is...',
  option1: 'John',
  option2: 'Paul',
  option3: 'George',
  option4: 'Ringo',
};

describe('Create VotingCard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/');
  });

  it('renders the new poll form', () => {
    cy.get('form').should('exist');
  });

  it('submits the new poll', () => {
    cy.get('textarea[name="question"]').type(formInput.question);
    cy.get('input[id="option1"]').type(formInput.option1);
    cy.get('input[id="option2"]').type(formInput.option2);
    cy.get('input[id="option3"]').type(formInput.option3);
    cy.get('input[id="option4"]').type(formInput.option4);
    cy.get('[data-cy="form-submit"]').click();
  });

  it('renders the card to the UI', () => {
    cy.contains(formInput.question).should('exist');
  });

  it('deletes the created poll in DB', () => {
    cy.contains(formInput.question)
      .closest('.poll-card')
      .invoke('attr', 'id')
      .then((id) => {
        const cardId = id;
        cy.request({
          method: 'DELETE',
          url: `http://localhost:3000/poll/${cardId}`,
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
  });

  it('removes the card from the UI', () => {
    cy.contains(formInput.question).should('not.exist');
  });
});
