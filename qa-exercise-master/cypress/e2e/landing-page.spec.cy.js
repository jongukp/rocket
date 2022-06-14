describe('Check the landing page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('successfully loads the landing page and its components', () => {
    cy.get('h1').should('contain', 'QA Exercise');
    cy.get('[data-testid="box_0"]').should('not.exist');
    cy.get('[data-testid="add_button"]')
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled')
      .should('have.text', 'Add Box');
    cy.get('[data-testid="remove_button"]')
      .should('exist')
      .should('be.visible')
      .should('be.disabled')
      .should('have.text', 'Remove Box');
  });

  it('reloading should clear up and load the default settings', () => {
    cy.get('[data-testid="add_button"]').click();
    cy.get('[data-testid="box_0"]')
      .should('exist')
      .contains('0');
    cy.reload()
    cy.get('[data-testid="box_0"]')
      .should('not.exist');
    cy.get('[data-testid="add_button"]')
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled')
      .should('have.text', 'Add Box');
    cy.get('[data-testid="remove_button"]')
      .should('exist')
      .should('be.visible')
      .should('be.disabled')
      .should('have.text', 'Remove Box');
  });
});

describe('Check Add Box related functionalities', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('It can add a box and RemoveBox should be enabled', () => {
    cy.get('[data-testid="add_button"]').click();
    cy.get('[data-testid="box_0"]')
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled')
      .contains('0');
    cy.get('[data-testid="remove_button"]')
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled')
      .should('have.text', 'Remove Box');
  });

  it('It can add 2 to 19 boxes and AddBox and RemoveBox should not be disabled', () => {
    const randomNumber = `${Math.floor(Math.random() * 18) + 2}` //2-19
    Cypress._.times(randomNumber, (k) => {
      cy.get('[data-testid="add_button"]').click();
      cy.get(`[data-testid="box_${k}"]`)
        .contains(`${k}`)
        .should('exist')
        .should('be.visible')
        .should('not.be.disabled');
      cy.get('[data-testid="add_button"]')
        .should('exist')
        .should('be.visible')
        .should('not.be.disabled')
        .should('have.text', 'Add Box');
      cy.get('[data-testid="remove_button"]')
        .should('exist')
        .should('be.visible')
        .should('not.be.disabled')
        .should('have.text', 'Remove Box');
    })
  });

  it('It can add 20 boxes then AddBox should get disabled', () => {
    Cypress._.times(20, (k) => {
      cy.get('[data-testid="add_button"]').click();
      cy.get(`[data-testid="box_${k}"]`).contains(`${k}`);
    })
    cy.get('[data-testid="add_button"]')
      .should('exist')
      .should('be.visible')
      .should('be.disabled')
      .should('have.text', 'Add Box');
    cy.get('[data-testid="remove_button"]')
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled')
      .should('have.text', 'Remove Box');
  });
});

describe('Check RemoveBox related functionalities', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('when there is a box, it can remove a box and RemoveBox should be disabled after', () => {
    cy.get('[data-testid="add_button"]').click();
    cy.get('[data-testid="box_0"]')
      .should('exist')
      .should('be.visible')
      .contains('0');
    cy.get('[data-testid="remove_button"]')
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled')
      .should('have.text', 'Remove Box')
      .click();
    cy.get('[data-testid="remove_button"]')
      .should('exist')
      .should('be.visible')
      .should('be.disabled')
      .should('have.text', 'Remove Box')
    cy.get('[data-testid="box_0"]')
      .should('not.exist');
  });

  it('It can remove existing boxes and RemoveBox should not be disabled when there is at least one box left', () => {
    const addNumber = `${Math.floor(Math.random() * 19) + 2}` // 2 ~ 20
    const removeNumber = `${Math.floor(Math.random() * (addNumber - 1)) + 1}` // 1 ~ (addNumber-1)
    Cypress._.times(addNumber, (k) => {
      cy.get('[data-testid="add_button"]').click();
    });
    Cypress._.times(removeNumber, (k) => {
      cy.get('[data-testid="remove_button"]')
        .should('exist')
        .should('be.visible')
        .should('not.be.disabled')
        .should('have.text', 'Remove Box')
        .click();
      cy.get(`[data-testid="box_${addNumber - (k + 2)}"]`)
        .should('exist')
        .contains(`${addNumber - (k + 2)}`);
      cy.get(`[data-testid="box_${addNumber - (k + 1)}"]`)
        .should('not.exist')
    });
  });

  it('when there are boxes, it can remove all boxes and Remove Box should be disabled in the end', () => {
    const addNumber = `${Math.floor(Math.random() * 19) + 2}` // 2 ~ 20
    Cypress._.times(addNumber, (k) => {
      cy.get('[data-testid="add_button"]').click();
    });
    Cypress._.times(addNumber - 1, (k) => {
      cy.get('[data-testid="remove_button"]')
        .should('exist')
        .should('be.visible')
        .should('not.be.disabled')
        .should('have.text', 'Remove Box')
        .click();
      cy.get(`[data-testid="box_${addNumber - (k + 2)}"]`)
        .should('exist')
        .contains(`${addNumber - (k + 2)}`);
      cy.get(`[data-testid="box_${addNumber - (k + 1)}"]`)
        .should('not.exist')
    });
    cy.get('[data-testid="remove_button"]').click();
    cy.get('[data-testid="box_0"]').should('not.exist');
    cy.get('[data-testid="remove_button"]')
      .should('exist')
      .should('be.visible')
      .should('be.disabled')
      .should('have.text', 'Remove Box');
  });
});
