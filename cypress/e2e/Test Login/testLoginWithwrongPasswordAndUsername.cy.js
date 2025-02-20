/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('https://practicetestautomation.com/practice-test-login/')
    })
    it('.type() - type into a DOM Element', () =>{
        cy.get('#username').type('student123')
        cy.get('#password').type('Password123123')

        cy.get('#submit.btn').click()
        cy.get('#error').should('contain', 'Your username is invalid!')


    })


})
