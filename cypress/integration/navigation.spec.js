/// <reference types="Cypress" />

context('Navigation', () => {
  it('home', () => {
    cy.visit('http://localhost:3000')
    cy.title().should('include', 'Helix Pages')
  })
})
