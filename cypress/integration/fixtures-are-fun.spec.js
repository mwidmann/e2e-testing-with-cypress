/// <reference types="cypress" />

describe('Fixtures are fun', () => {
  beforeEach(() => {
    cy.intercept(/cookiebot/i, {
      statusCode: 200,
      body: `(return function(){})()`
    })

    // replace every jpeg image with a cat picture for giggles, but could be used to speed up tests and avoid
    // loading all images.
    cy.intercept('*.jpg', {
      statusCode: 200,
      fixture: 'image.jpg'
    })

    cy.viewport(1080, 1920)
    cy.visit('https://www.vn.at')
  })

  it(`just for the giggles`, () => {
    expect(true).to.be.true
  })
})