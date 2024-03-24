import { formInput, isTimeoutEnabled, waitTimeout } from './constants';

describe('Voting for a Poll', () => {
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
    isTimeoutEnabled && cy.wait(waitTimeout);
    cy.contains(formInput.question).should('exist');
  });

  it('4. votes for the first option', () => {
    isTimeoutEnabled && cy.wait(waitTimeout);
    cy.contains(formInput.option1).click();
    cy.contains(formInput.question)
      .closest('.poll-card')
      .invoke('attr', 'id')
      .then((id) => {
        cy.get(`[data-cy="vote-submit-poll-${id}"]`).click();
      });
  });

  it('5. displays options votes and percentage', () => {
    cy.contains(formInput.question)
      .closest('.poll-card')
      .invoke('attr', 'id')
      .then((id) => {
        cy.get(`[data-cy="total-votes-poll-${id}"]`).should('exist');
        cy.get(`[data-cy="total-votes-poll-${id}"]`).contains('1');
        cy.get(`[data-cy="poll-option0-percentage"]`)
          .invoke('html')
          .should('contain', '100%');
        cy.get(`[data-cy="poll-option1-percentage"]`)
          .invoke('html')
          .should('contain', '0%');
        cy.get(`[data-cy="poll-option2-percentage"]`)
          .invoke('html')
          .should('contain', '0%');
        cy.get(`[data-cy="poll-option3-percentage"]`)
          .invoke('html')
          .should('contain', '0%');
      });
  });

  it('6. removes the card from the UI', () => {
    cy.contains(formInput.question).should('not.exist');
  });

  it('7. deletes the created poll in DB', () => {
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

  it('8. removes the card from the UI', () => {
    cy.contains(formInput.question).should('not.exist');
  });
});
