/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('https://practicetestautomation.com/practice-test-login/')
    })
    it('.type() - type into a DOM Element', () =>{
        cy.get('#username').type('student')

        cy.get('#submit.btn').click()
        cy.get('#error').should('contain', 'Your password is invalid!')


    })


})
