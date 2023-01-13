it('serasa dev', function() {
    cy.visit('https://google.com/')
    cy.get('input[type="text"]').type('Parana Clube')
})  