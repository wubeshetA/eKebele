describe('Login Test', () => {
    beforeEach(() => {
      cy.fixture('login').then((data) => {
        cy.wrap(data).as('loginData');
      });
    });
  
    it('should allow a user to fill in the login form with valid data', function () {
      cy.visit('/');
  
      // Click on the Login link
      cy.contains('Log In').click();
  
      cy.get('@loginData').then((data) => {
        const validUser = data.validUser;
  
        cy.get('#email').type(validUser.email);
        cy.get('#password').type(validUser.password);
  
        cy.get('button[type="submit"]').click();
  
        // Verify that the form was submitted
        cy.contains('Logging in...').should('be.visible');
      });
    });
  

   
  });