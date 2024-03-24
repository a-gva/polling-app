import { formInput } from './constants';

describe('Creating a New Poll', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/');
  });

  it('1. renders the new poll form', () => {
    cy.get('form').should('exist');
  });

  it('2. submits the new poll', () => {
    cy.get('textarea[name="question"]').type(formInput.question);
    cy.get('input[id="option1"]').type(formInput.option1);
    cy.get('input[id="option2"]').type(formInput.option2);
    cy.get('input[id="option3"]').type(formInput.option3);
    cy.get('input[id="option4"]').type(formInput.option4);
    cy.get('[data-cy="form-submit"]').click();
  });

  it('3. renders the card to the UI', () => {
    cy.contains(formInput.question).should('exist');
  });

  it('4. deletes the created poll in DB', () => {
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

  it('5. removes the card from the UI', () => {
    cy.contains(formInput.question).should('not.exist');
  });
});
