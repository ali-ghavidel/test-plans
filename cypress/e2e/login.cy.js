var pages = 1;
describe('login to iHotel', () => {
  it('should login with correct user pass', () => {
    cy.fixture('globals.json').then((globals)=>{

      cy.visit(globals.baseUrl)
      cy.title().should('include', "ورود");
      cy.get('input[type="email"]').type(globals.username)
      cy.get('input[type="password"]').type(globals.password)
      cy.get('button[type="submit"]').click();
      cy.get('#subMenu',{timeout: 5000}).within(()=>{
        cy.get('span').contains('هتل').parent().parent().click().within(()=>{
          cy.get('div').contains(' لیست هتل ها ').parent().click()          
        })
      })
      cy.url().should('eq', 'https://ihotel.ihogroup.ir/admin/hotel').then(() => {
        // Get the total number of pages
        cy.get('ul[aria-label="Pagination"]')
          .contains('بعدی') // Select the element containing 'بعدی'
          .parent() // Get the parent element
          .prev() // Get the previous sibling of the parent element
          .find('span').eq(1) // Select the second <span> element
          .invoke('text') // Get the text content
          .then((totalPagesText) => {
            const totalPages = parseInt(totalPagesText, 10); // Parse total pages as an integer
      
            // Define a recursive function to handle the pagination
            function validateTableAndPaginate(page = 1) {
              // Log the current page for debugging purposes
              cy.log(`Validating table on page ${page} of ${totalPages}`);
      
              // Validate buttons in the table rows
              cy.get('tbody').children().each(($tr) => {
                cy.wrap($tr).children().eq(6).find('button').should('have.length', 2); // Check 2 buttons exist
                cy.wrap($tr).children().eq(6).find('button').first().should('have.text', 'file_copy'); // Check first button text
              });
      
              // If there are more pages, click 'بعدی' to navigate to the next page
              if (page < totalPages) {
                cy.get('ul[aria-label="Pagination"]')
                  .contains('بعدی') // Select the 'بعدی' button again
                  .click({ force: true }) // Click to go to the next page
                  .then(() => {
                    validateTableAndPaginate(page + 1); // Recursive call to validate next page
                  });
              }
            }
      
            // Start the validation from page 1
            validateTableAndPaginate(1);
          });
      });
      
      
      
      
        
      
    })
  })
})