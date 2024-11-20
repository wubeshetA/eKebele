describe('App Component Test', () => {
    it('should scroll down and check if all components are present', () => {
      cy.visit('/');
  
      // Check if BannerSection is present
      cy.get('body').within(() => {
        cy.contains('E K B E L E').should('be.visible');
      });
  
      // Scroll down to ServicesSection
      cy.scrollTo('bottom');
  
      // Check if ServicesSection is present
      cy.contains('Services').should('be.visible');
  
      // Check if FAQSection is present
      cy.contains('Frequently Asked Questions').should('be.visible');
  
      // Check if Footer is present
      cy.get('footer').should('be.visible');
    });
  });