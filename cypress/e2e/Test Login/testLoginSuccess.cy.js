/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('https://practicetestautomation.com/practice-test-login/')
    })
    it('.type() - type into a DOM Element', () =>{
        cy.get('#username').type('student')
        cy.get('#password').type('Password123')

        cy.get('#submit.btn').click()
        cy.get('.post-title').should('contain', 'Logged In Successfully')


    })


})
