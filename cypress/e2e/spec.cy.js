// Import cypress-axe

import 'cypress-axe';
 
describe('Accessibility Testing', () => {

  beforeEach(() => {

    // Visit the page you want to test

    cy.visit('https://hugomyrberg.github.io/first-pwa/');

    // Inject the Axe-core library into the page

    cy.injectAxe();

  });
 
  it('should have no detectable accessibility violations on load', () => {

    // Run the accessibility checks using Axe-core

    cy.checkA11y(null, null, (violations) => {

      if (violations.length) {

        throw new Error(`Accessibility issues found: ${violations.length}`);

      }

    });

  });

});
 