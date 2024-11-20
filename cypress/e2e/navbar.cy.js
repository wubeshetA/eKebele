describe('NavBar Language Switch Test', () => {
    it('should switch the language to Amharic', () => {
      cy.visit('/');
  
      // Click on the language switch button
      cy.get('button').contains('English').click();
  
      // Select Amharic from the dropdown
      cy.get('button').contains('አማርኛ').click();
  
      // Verify that the text changes to Amharic
      cy.contains('ዲጂታል አስተዳደርን ማሽከርከር!').should('be.visible');
    });
  });