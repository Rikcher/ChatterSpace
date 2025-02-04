declare namespace Cypress {
  interface Chainable {
    /**
     * Logs in as a default test user.
     */
    login(): Chainable<void>;
  }
}