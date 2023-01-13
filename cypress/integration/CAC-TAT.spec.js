/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    // BeforeEach = Antes de cada
    beforeEach(function() {
        cy.visit('./src/index.html')
        }) 

    it('verifica título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longTxt = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste '
        cy.get('#firstName').should('be.visible').type('Rodrigo')
        cy.get('#lastName').should('be.visible').type('Feijó')
        cy.get('#email').should('be.visible').type('rodrigo@cypress.com')
        cy.get('#open-text-area').should('be.visible').type(longTxt, {delay: 0})
        //cy.get('button[type="submit"]').should('be.visible').click()
        cy.contains('button','Enviar').click() // clicando pelo texto
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').should('be.visible').type('Rodrigo')
        cy.get('#lastName').should('be.visible').type('Feijó')
        cy.get('#email').should('be.visible').type('rodrigocypress.com')
        cy.get('#open-text-area').should('be.visible').type('Cypress test')
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.get('.error').should('be.visible')
    })

    it('telefone continua vazio após inserir letras', function() {
        cy.get('#firstName').should('be.visible').type('Rodrigo')
        cy.get('#lastName').should('be.visible').type('Feijó')
        cy.get('#email').should('be.visible').type('rodrigocypress.com')
        cy.get('#phone').type('abc').should('have.value', '')
        cy.get('#open-text-area').should('be.visible').type('Cypress test')
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.get('.error').should('be.visible')
    })

    it('telefone vira obrigatório', function() {
        cy.get('#firstName').should('be.visible').type('Rodrigo')
        cy.get('#lastName').should('be.visible').type('Feijó')
        cy.get('#email').should('be.visible').type('rodrigo@cypress.com')
        cy.get('#phone-checkbox').check()
        //cy.get('#phone').should('be.visible').type('999999999')
        cy.get('#open-text-area').should('be.visible').type('Cypress test')
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .should('be.visible')
          .type('Rodrigo')
          .should('have.value', 'Rodrigo')
          .clear()
          .should('have.value', '')

        cy.get('#lastName')
          .should('be.visible')
          .type('Feijó')
          .should('have.value', 'Feijó')
          .clear()
          .should('have.value', '')

        cy.get('#email')
          .should('be.visible')
          .type('rodrigo@cypress.com')
          .should('have.value', 'rodrigo@cypress.com')
          .clear()
          .should('have.value', '')

        cy.get('#phone')
          .should('be.visible')
          .type('999999999')
          .should('have.value', '999999999')
          .clear()
          .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (Youtube) por seu texto', function() {
        cy.get('#product')
          .select('YouTube')
          .should('be.value','youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
          .select('mentoria')
          .should('be.value','mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
          .select(1)
          .should('be.value','blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('be.value','feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        }) 
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload')
          //.should('not.have.value')
          .selectFile('cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
       cy.get('input[type="file"]#file-upload')
         //.should('not.have.value')
         .selectFile('cypress/fixtures/example.txt', {action: 'drag-drop'})
         .should(function($input){
            expect($input[0].files[0].name).to.equal('example.txt')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('meuArquivoExemplo')
        cy.get('input[type="file"]#file-upload')
          .selectFile('@meuArquivoExemplo')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a').invoke('removeAttr','target').click()
    })
    
    it('testa a página da política de privacidade de forma independente', function() {
        cy.get('#privacy a').invoke('removeAttr','target').click()
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.contains('Talking About Testing').should('be.visible')
    })
})