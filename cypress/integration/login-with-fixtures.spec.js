/// <reference types="cypress" />

describe('The login form using fixtures', () => {
  beforeEach(() => {
    cy.intercept(/cookiebot/i, {
      statusCode: 200,
      body: `(return function(){})()`
    })
  })

  describe(`On MD or above`, () => {
    beforeEach(() => {

      // uncomment for a nice cat picture replacing all jpeg images on the page.
      // cy.intercept('*.jpg', {
      //   statusCode: 200,
      //   fixture: 'image.jpg'
      // })
      // you can mock external calls, e.g. to the cookiebot
      cy.visit('https://www.vn.at')
    })

    // the happy path
    it(`logins to vn.at`, () => {
      cy.intercept('/api/login', {
        statusCode: 200,
        fixture: 'valid-credentials.json'
      })
      cy.login(`anything`, `goes`)
      cy.get(`.menu-item.my-account`).contains(`Existing User`)
      cy.get(`.login-form`).should('not.exist')
    })

    // the happy path with an expected result
    it(`the login fails when the data is wrong`, () => {
      cy.intercept('/api/login', {
        statusCode: 404,
        fixture: 'unknown-user.json'
      })

      cy.get('.menu-item.login').click()
      cy.login(`unknown-user`, `some-password`)
      cy.get('p[data-test="graphql-error"]').within(() => {
        cy.contains(`Der angegebene Benutzer ist unbekannt. Bitte überprüfen Sie Ihre Eingabe.`)
      })
    })

    // the happy path with an expected result
    it(`an error is shown, when the user enters a wrong password`, () => {
      cy.intercept('/api/login', {
        statusCode: 404,
        fixture: 'wrong-password.json'
      })

      cy.get('.menu-item.login').click()
      cy.login(`known-user`, `wrong-password`)
      cy.get('p[data-test="graphql-error"]').within(() => {
        cy.contains(`Benutzername und Passwort stimmen nicht überein.`)
      })
    })
  })

  describe(`on Mobile`, () => {
    beforeEach(() => {
      cy.viewport(`iphone-x`)
      cy.visit('https://www.vn.at')

      // open the menu
      cy.get('.menubutton.mobile-menu-opener').click()
    })


    // the happy path
    it(`logins to vn.at`, () => {
      cy.intercept('/api/login', {
        statusCode: 200,
        fixture: 'valid-credentials.json'
      })
      cy.login(`anything`, `goes`)
      cy.get(`.menu-item.my-account`).contains(`Existing User`)
      cy.get(`.login-form`).should('not.exist')
    })

    // the happy path with an expected result
    it(`the login fails when the data is wrong`, () => {
      cy.intercept('/api/login', {
        statusCode: 404,
        fixture: 'unknown-user.json'
      })

      cy.login(`unknown-user`, `some-password`)
      cy.get('p[data-test="graphql-error"]').within(() => {
        cy.contains(`Der angegebene Benutzer ist unbekannt. Bitte überprüfen Sie Ihre Eingabe.`)
      })
    })

    // the happy path with an expected result
    it(`an error is shown, when the user enters a wrong password`, () => {
      cy.intercept('/api/login', {
        statusCode: 404,
        fixture: 'wrong-password.json'
      })

      cy.login(`known-user`, `wrong-password`)
      cy.get('p[data-test="graphql-error"]').within(() => {
        cy.contains(`Benutzername und Passwort stimmen nicht überein.`)
      })
    })

  })
})