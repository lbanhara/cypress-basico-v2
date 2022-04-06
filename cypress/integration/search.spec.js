/// <reference types="Cypress" />

describe('Search', function() {
    const searchTerm = 'cypress.io'
    beforeEach(() => {
        cy.visit('https://duckduckgo.com/')

        cy.intercept(
            'GET',
            `**q=${searchTerm}**`
        ).as('getSearchResults')

        cy.get('input[type="text"]').as('searchField')
    })

    it('types and hit enter', function(){
        cy.get('@searchField')
          .type(`${searchTerm}{enter}`)
        cy.wait('@getSearchResults')
        
       cy.assertTenResultsPlusMoreResults()
    })

    it('types and clicks the magnifying glass button', function(){
        cy.get('@searchField')
          .type(searchTerm)  
        cy.get('input[type="submit"]')
          .should('be.visible')
          .click()

        cy.wait('@getSearchResults')
        cy.get('.result')
          .should('have.length', 11)
        cy.get('.result').last()
         .should('contain', 'Mais resultados')
    })

    it.only('types and submit the form directly', function(){
        cy.get('@searchField')
          .type(searchTerm)    
          .get('form').submit()

        cy.wait('@getSearchResults')
        cy.get('.result')
          .should('have.length', 11)
        cy.get('.result').last()
          .should('contain', 'Mais resultados')
    })
})