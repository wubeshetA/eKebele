describe('Birth Certificate Form Test', () => {
    beforeEach(() => {
      cy.fixture('birthCertificate').then((data) => {
        cy.wrap(data).as('birthData');
      });


      
      cy.intercept('POST', '/api/vital-events/birth-certificate/', {
        statusCode: 201,
        body: {
          application_number: '12345678'
        }
      }).as('submitForm');
    });
  
    it('should fill out the birth certificate form and submit', function () {
      cy.visit('/');
  
      // Click on the Birth Registration link
      cy.contains('Birth Registration').click();
  
      // Handle the pop-up window
      // click on a drop down select element with name region
        cy.get('select[name="region"]').select('Addis Ababa');
        cy.get('select[name="subCity"]').select('Bole');
        // click the button with text 'Go to Application'
        cy.get('button').contains('Go to Application').click();
   
  
      cy.get('@birthData').then((data) => {
        const applicant = data.applicant;
  
        // Fill out the first stage of the form
        cy.get('#applicant_name').type(applicant.applicant_name);
        cy.get('#applicant_email_address').type(applicant.applicant_email_address);
        cy.get('#phone_number').type(applicant.phone_number);
        cy.contains('Next').click();
  
        // Fill out the second stage of the form
        cy.get('#first_name').type(applicant.first_name);
        cy.get('#middle_name').type(applicant.middle_name);
        cy.get('#last_name').type(applicant.last_name);
        cy.get('#nationality').type(applicant.nationality);
        cy.get('select[name="gender"]').select(applicant.gender);
        cy.get('#father_fullname').type(applicant.father_fullname);
        cy.get('#father_nationality').type(applicant.father_nationality);
        cy.get('#mother_fullname').type(applicant.mother_fullname);
        cy.get('#mother_nationality').type(applicant.mother_nationality);
        cy.contains('Next').click();
  
        // Fill out the third stage of the form
        cy.get('#dob').type(applicant.dob);
        cy.get('#country_of_birth').type(applicant.country_of_birth);
        cy.get('#region_of_birth').type(applicant.region_of_birth);
        cy.get('#place_of_birth').type(applicant.place_of_birth);
        cy.contains('Submit').click();
  
        // Verify that the form was submitted
        cy.contains('Submitting...').should('be.visible');

        cy.wait('@submitForm');

      // Verify that the form was submitted
      cy.contains('Application Submitted Successfully!').should('be.visible');
      cy.contains('Your Application Tracking Number is: 12345678').should('be.visible');
      });
    });
  });