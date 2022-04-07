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
  cy.get('.result', {timeout:5000})
    .should('have.length', 11)
  cy.get('div[id="rld-1"] a')
    .should('have.text','More results')   

})