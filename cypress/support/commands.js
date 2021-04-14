import '@testing-library/cypress/add-commands'

Cypress.Commands.add(`login`, (username, password) => {
  // intercept the login api to wait for it to respond.
  cy.intercept(`/api/login`).as('login-api')
  cy.get(`.menu-item.login`).click()
  cy.get('.login-form').should('be.visible').within(() => {
    cy.findByPlaceholderText(/abonummer/i).type(username)
    cy.findByPlaceholderText(/passwort/i).type(password)
    cy.findByText(/anmelden/i, { selector: 'button'}).click()
  })
  cy.wait('@login-api')
})