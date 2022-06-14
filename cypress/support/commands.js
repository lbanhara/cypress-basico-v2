// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    const textArea = 'solicito informações dos relatórios mensais'
    cy.get('#firstName').type('Liana')  
    cy.get('#lastName').type('Banhara')  
    cy.get('#email').type('lbanhara@gmail.com')  
    cy.get('#open-text-area').type(textArea, {delay:0})  
    cy.contains('button', 'Enviar').click()


    
})

Cypress.Commands.add('assertTenResultsPlusMoreResults', function(){
  cy.get('.result')
    .should('have.length', 11)
  cy.get('div[id="rld-1"] a')
    .should('have.text','More results')  

})

Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
  
      cy.visit('http://webdesenv5.prodam/PP9038_CacLogin/Autenticacao/Index/passive?ReturnUrl=http%3A%2F%2Fwebdesenv5.prodam%2FPP9038_CacLogin%2FAutenticacao%2FLogin%26wa%3Dwsignin1.0%26wtrealm%3Dhttp%253A%252F%252Fal0104.dapp.prodam%252Fintranet%252F%26wctx%3Drm%253D0%26ru%3D%252Fintranet%252Fhome%26wct%3D2022-06-07T18%253A07%253A07Z%26wreply%3Dhttp%253A%252F%252Fal0104.dapp.prodam%252Fintranet%252FHome%26qtdetentativas%3D0%26codigosistema%3DAL0104%26listaHierarquias%3DX%26siglahierarquia%3DSISCOR')
      cy.get('#txtUsuario').type(username)
      cy.get('#txtSenha').type(password, { log: false })
      cy.get('input[id="btnEntrar"]').click()
      cy.wait(4000)
        
      cy.origin('http://al0104.dapp.prodam/intranet/Home', function() {

        cy.visit('http://al0104.dapp.prodam/intranet/TabelasBasicas/TipoAtividade')
   
      })
      
    
  })


})





