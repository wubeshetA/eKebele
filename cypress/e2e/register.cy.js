describe('Sign Up (Register) Test', () => {
    beforeEach(() => {
      cy.fixture('register').then((data) => {
        cy.wrap(data).as('registerData');
      });
    });
  
    it('should allow a user to fill in the registration form with valid data', function () {
      cy.visit('/');
  
      // Click on the Sign Up link
      cy.contains('Sign Up').click();
  
      cy.get('@registerData').then((data) => {
        const validUser = data.validUser;
  
        cy.get('#firstName').type(validUser.firstName);
        cy.get('#lastName').type(validUser.lastName);
        cy.get('#phoneNumber').type(validUser.phoneNumber);
        cy.get('#email').type(validUser.email);
        cy.get('#password').type(validUser.password);
        cy.get('#nid').type(validUser.nid);
  
        cy.get('button[type="submit"]').click();
  
        
      });
    });
  });