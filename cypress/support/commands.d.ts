declare namespace Cypress {
  interface Chainable {
    /**
     * Logs in as a default test user.
     */
    login(): Chainable<void>;

    /**
     * Logs in with another test user.
     */
    loginWithAnotherUser(): Chainable<void>;

    /**
     * Gets an element by the data-test attribute.
     */
    getByDataTest(selector: string): Chainable<JQuery<HTMLElement>>;
  }
}