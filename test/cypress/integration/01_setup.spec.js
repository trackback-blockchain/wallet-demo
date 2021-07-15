describe('Test Welcome Page', () => {

    it('page contains all elements', () => { 
        cy.visit('')
        cy.get('.heading').contains('Welcome to the TANZ identity wallet')
        cy.get('.subtitle').contains('Save time, create your identity and share it with other TANZ members')
 
    });
    it('register page contains all elements', () => { 
        cy.visit('/register')
        cy.get('.color-black1').contains('First things first!')
        // cy.get('#Name').contains('Name')
        // cy.get('#Email').contains('test@test.com')
        // cy.get('#Password').contains('123')
 
    });



})