/// <reference types="cypress" />

describe('Converte arquivos', () => {
    before(() => {

        cy.Converte_XLSX_JSON('./cypress/fixtures/tipo_natureza.xlsx', './cypress/fixtures/tipo_natureza_xlsx.json')
        cy.Converte_CSV_JSON('./cypress/fixtures/tipo_natureza.csv', './cypress/fixtures/tipo_natureza_csv.json')
    
    });

    it.only('acessando dominios diferentes usando a função cy.origem', function () {
        //configurar o cypress.json    "experimentalSessionAndOrigin": true
        //so funciona com cypress versão acima de 9.6
        cy.visit('https://www.google.com.br/')
        cy.get('.gb_1')
        cy.get('div a[class^=gb_1]')
        .should('have.attr','target','_top') 
        .click() 

        cy.origin('https://accounts.google.com/', function(){
         
            cy.visit('/v3/signin/identifier?dsh=S-83379951%3A1654698580351531&continue=https%3A%2F%2Fwww.google.com.br%2F&ec=GAZAmgQ&flowEntry=ServiceLogin&flowName=WebLiteSignIn&hl=pt-BR&passive=true&ifkv=AU9NCczOvQDtVu5XWo1pscKmpBScqBMEm9cwBFewOjKJCF_l3WLVZyzQQFtvZjNRnCX5ElsSBD6WDA')
            cy.url().should('contain','www.google.com.br')

            cy.get('h1[class="Tn0LBd"]').contains('Fazer login')
        })
  
      })


});

