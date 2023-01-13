it('teste com página na web', function() {
    cy.visit('https://google.com/')
    cy.get('input[type="text"]').type('Parana Clube')
})  