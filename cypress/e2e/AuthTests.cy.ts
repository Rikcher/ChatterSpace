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

describe('User Authentication', () => {
  it('should allow users to log in with email and password', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@gmail.com');
    cy.get('input[name="password"]').type('123123');
    cy.get('button[type="submit"]').click();
    cy.location('pathname', { timeout: 15000 }).should((pathname) => {
      expect(pathname).to.match(/^\/servers\/[^/]+\/channels\/[^/]+$/);
    });
  });

  it('should display an error for incorrect credentials', () => {
    cy.visit('/login');
    cy.get('[data-sonner-toast]').should('not.exist');
    cy.get('input[name="email"]').type('wronguser@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.get('[data-sonner-toast]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-sonner-toast]').should(
      'contain.text',
      'Failed to login: Invalid login credentials'
    );
  });
});

describe('User Registration', () => {
  it('should allow users to register with valid information', () => {
    cy.visit('/register');
    cy.get('input[name="email"]').type('validuser@gmail.com');
    cy.get('input[name="options.data.username"]').type('validusername123');
    cy.get('input[name="password"]').type('ValidPass123!');
    cy.get('input[name="passwordRepeat"]').type('ValidPass123!');
    cy.get('[data-test="auth-dialog"]').should('not.exist');
    cy.get('button[type="submit"]').click();
    cy.location('pathname', { timeout: 5000 }).should('eq', '/login');
    cy.get('[data-test="auth-dialog"]').should('be.visible');
    cy.get('[data-test="auth-dialog"]').should(
      'contain.text',
      "We've sent you a confirmation email. Please check your inbox and click the verification link to complete your registration."
    );
  });

  it('should show an error if passwords do not match', () => {
    cy.visit('/register');
    cy.get('input[name="email"]').type('validuser@example.com');
    cy.get('input[name="options.data.username"]').type('validusername123');
    cy.get('input[name="password"]').type('ValidPass123!');
    cy.get('input[name="passwordRepeat"]').type('DifferentPass456!');
    cy.get('button[type="submit"]').click();
    cy.get('[data-test="form-error-message"]').should(
      'contain.text',
      'Passwords do not match.'
    );
  });

  it('should show an error if email is invalid', () => {
    cy.visit('/register');
    cy.get('input[name="email"]').type('invalidemail@example');
    cy.get('input[name="options.data.username"]').type('validusername123');
    cy.get('input[name="password"]').type('ValidPass123!');
    cy.get('input[name="passwordRepeat"]').type('ValidPass123!');
    cy.get('button[type="submit"]').click();
    cy.get('[data-test="form-error-message"]').should(
      'contain.text',
      'Please enter a valid email address (e.g., name@example.com).'
    );
  });

  it('should show an error if username is too short', () => {
    cy.visit('/register');
    cy.get('input[name="email"]').type('validuser@example.com');
    cy.get('input[name="options.data.username"]').type('ab');
    cy.get('input[name="password"]').type('ValidPass123!');
    cy.get('input[name="passwordRepeat"]').type('ValidPass123!');
    cy.get('button[type="submit"]').click();
    cy.get('[data-test="form-error-message"]').should(
      'contain.text',
      'Username must be at least 3 characters long'
    );
  });

  it('should show an error if password does not meet complexity requirements', () => {
    cy.visit('/register');
    cy.get('input[name="email"]').type('validuser@example.com');
    cy.get('input[name="options.data.username"]').type('validusername123');
    cy.get('input[name="password"]').type('weakpassword');
    cy.get('input[name="passwordRepeat"]').type('weakpassword');
    cy.get('button[type="submit"]').click();
    cy.get('[data-test="form-error-message"]').should(
      'contain.text',
      'Password must contain at least one uppercase letter.'
    );
  });

  it('should show an error if username contains invalid characters', () => {
    cy.visit('/register');
    cy.get('input[name="email"]').type('validuser@example.com');
    cy.get('input[name="options.data.username"]').type('Invalid username!');
    cy.get('input[name="password"]').type('ValidPass123!');
    cy.get('input[name="passwordRepeat"]').type('ValidPass123!');
    cy.get('button[type="submit"]').click();
    cy.get('[data-test="form-error-message"]').should(
      'contain.text',
      'Username can only contain letters, numbers, underscores, and spaces'
    );
  });
});
