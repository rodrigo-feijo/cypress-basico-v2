Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Feijó')
    cy.get('#email').type('rodrigo@cypress.com')
    cy.get('#open-text-area').type('Cypress test')
    cy.get('button[type="submit"]').click()
})
