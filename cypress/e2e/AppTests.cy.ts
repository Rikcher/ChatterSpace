// Cypress configuration to handle uncaught exceptions related to NEXT_REDIRECT
Cypress.on('uncaught:exception', (err) => {
  console.log('err.message', err.message);

  // Check if the error message includes "NEXT_REDIRECT"
  if (err.message.includes('NEXT_REDIRECT')) {
    // This block is added to handle server-side redirects in Next.js.
    // Next.js often performs server-side redirects for various reasons, such as:
    // - Authentication flows (redirecting to login page if not authenticated)
    // - Conditional rendering based on user data
    // - Route changes based on server-side logic
    // When these redirects occur, they can throw a "NEXT_REDIRECT" error,
    // which is expected behavior and should not cause the test to fail.
    // Returning false here prevents Cypress from failing the test when such an error is encountered.
    return false;
  }
});

describe('Messaging', () => {
  beforeEach(() => {
    cy.login();
  });

  // I'm using .first() instead of .last() because list of messages is reversed
  it('should send a message', () => {
    const testMessage = 'Hello, chat!';
    cy.get('[data-test="message-list"]').should('exist');
    cy.get('[data-test="message-input"]').type(`${testMessage}{enter}`);
    cy.get('[data-test="message-list"] [data-test="message-item"]')
      .first()
      .find('[data-test="message-content"]')
      .should('have.text', testMessage);
  });

  it('should persist messages after refresh', () => {
    const testMessage = 'Persistent message';
    cy.get('[data-test="message-list"]').should('exist');
    cy.get('[data-test="message-input"]').type(`${testMessage}{enter}`);
    cy.reload();
    cy.get('[data-test="message-list"]').should('exist');
    cy.get('[data-test="message-list"] [data-test="message-item"]')
      .first()
      .find('[data-test="message-content"]')
      .should('have.text', testMessage);
  });

  it('should send multiple messages and display them in order', () => {
    const messages = ['Hello!', 'How are you?', 'This is a test message.'];
    cy.get('[data-test="message-list"]').should('exist');
    messages.forEach((message) => {
      cy.get('[data-test="message-input"]').type(`${message}{enter}`);
    });
    cy.get('[data-test="message-list"] [data-test="message-item"]')
      .first()
      .find('[data-test="message-content"]')
      .should('have.text', messages[messages.length - 1]);
  });

  it('should delete a message', () => {
    const testMessage = 'This message will be deleted.';
    cy.get('[data-test="message-list"]', { timeout: 15000 }).should('exist');
    cy.get('[data-test="message-input"]').type(`${testMessage}{enter}`);
    cy.get('[data-test="message-list"] [data-test="message-item"]')
      .first()
      .find('[data-test="message-content"]')
      .should('have.text', testMessage);
    cy.get('[data-test="message-list"] [data-test="message-item"]')
      .first()
      .realHover();
    cy.get('[data-test="delete-message-button"]')
      .first()
      .should('be.visible')
      .click();
    cy.get('[data-test="confirm-delete-button"]')
      .should('be.visible')
      .click()
      .wait(5000);
    cy.get('[data-test="message-list"] [data-test="message-item"]')
      .first()
      .find('[data-test="message-content"]')
      .should('have.text', 'This message was deleted');
  });

  it('should edit a message', () => {
    const testMessage = 'This message will be edited.';
    const editedTestMessage = 'This message is edited.';
    cy.get('[data-test="message-list"]', { timeout: 15000 }).should('exist');
    cy.get('[data-test="message-input"]').type(`${testMessage}{enter}`);
    cy.get('[data-test="message-list"] [data-test="message-item"]')
      .first()
      .find('[data-test="message-content"]')
      .should('have.text', testMessage);
    cy.get('[data-test="message-list"] [data-test="message-item"]')
      .first()
      .realHover();
    cy.get('[data-test="edit-message-button"]')
      .first()
      .should('be.visible')
      .click();
    cy.get('[data-test="edit-message-input"]')
      .should('be.visible')
      .clear()
      .type(`${editedTestMessage}{enter}`);
    cy.get('[data-test="message-list"] [data-test="message-item"]')
      .first()
      .find('[data-test="message-content"]')
      .should('have.text', `${editedTestMessage}(edited)`);
  });

  it('should load older messages when scrolling up', () => {
    cy.get('[data-test="chat-display-scroll"]', { timeout: 15000 }).scrollTo(
      'top'
    );
    cy.get('[data-test="message-list"] [data-test="message-item"]').should(
      'have.length.greaterThan',
      50
    );
  });
});
