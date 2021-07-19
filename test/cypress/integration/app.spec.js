describe('Trackback Wallet', () => {

    describe('Tests for home page', function () {

        it('home page should contain all elemnts', () => {
            cy.visit('/')
            cy.get('.heading').contains('Welcome to the TANZ identity wallet')
            cy.get('.subtitle').contains('Save time, create your identity and share it with other TANZ members')
            cy.get('.btn_register').should('exist');
            cy.get('.btn_login').should('exist');

        });

        it('check register button click', () => {
            cy.visit('/')
            cy.get('.btn_register').click();
            cy.url().should('include', '/register')
        });

        it('check login button click', () => {
            cy.visit('/')
            cy.get('.btn_login').click();
            cy.url().should('include', '/login')
        });
    });

    describe('login page tests', function () {

        it('login button click navigate to login', () => {
            cy.visit('/')
            cy.get('.btn_login').click();
            cy.url().should('include', '/login')
        });

        it('login page should contain all elements', () => {
            cy.visit('/login')
            cy.get('#Emailaddress').should('exist');
            cy.get('#Password').should('exist');

            cy.get('.button-continue').contains('Login');
            cy.get('.button-register').contains('Register');
        });

        it('page should login user', () => {

            cy.get('#Emailaddress').type('test@example.org');
            cy.get('#Password').type('123');
        });

    });

    describe('register page tests', function () {

        it('check register button click', () => {
            cy.visit('/')
            cy.get('.btn_register').click();
            cy.url().should('include', '/register')
        });

        it('register page contains all elements', () => {

            cy.get('.color-black1').contains('First things first!')
            cy.get('#Name').should('exist');
            cy.get('#Emailaddress').should('exist');
            cy.get('#Password').should('exist');

            cy.get('.button-continue').contains('Register');
            cy.get('.button-login').contains('Sign in instead');

        });

        it('check login button click', () => {

            cy.get('.button-login').click();
            cy.url().should('include', '/login');
            cy.visit('/register')
        });


        it('register page register user', () => {

            cy.get('#Name').type('First Last');
            cy.get('#Emailaddress').type('test@example.org');
            cy.get('#Password').type('123');

            cy.get('.button-continue').click();
            cy.url().should('include', '/')

        });

        it('sign up success page tests', () => {
            cy.visit('/register')
            cy.get('#Name').type('First Last');
            cy.get('#Emailaddress').type('test@example.org');
            cy.get('#Password').type('123');

            cy.get('.button-continue').click();
            cy.url().should('include', '/')

            cy.get('h5').contains('Welcome to TANZ');
            cy.get('.sub').contains('Thanks for signing up! Start filling out your profile information by verifying your license.');
            cy.get('.button-getstarted').contains('Get Started');

        });


    });

});