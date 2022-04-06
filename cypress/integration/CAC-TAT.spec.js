/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
        
    })
    
    it('verifica o titulo da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('1-preenche os campos obrigatórios e envia o formulário', function() {
      
        const textArea = 'solicito informações dos relatórios mensais'
        cy.get('#firstName').type('Liana')  
        cy.get('#lastName').type('Banhara')  
        cy.get('#email').type('lbanhara@gmail.com')  
        cy.get('#open-text-area').type(textArea, {delay:0})  
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible','Mensagem enviada com sucesso.')
    })

    it('2-exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        const textArea = 'solicito informações dos relatórios mensais'
        cy.get('#firstName').type('Liana')  
        cy.get('#lastName').type('Banhara')  
        cy.get('#email').type('lbanhara@gmail') 
        cy.get('#open-text-area').type(textArea, {delay:0})   
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
        cy.get('.error').should('have.text', '\n      Valide os campos obrigatórios!\n    ')
                
    })
    it('3-verifica numero de telefone continua vazio quando preenche valor não-numérico', function() {
        cy.get('#phone').type('abc')
        cy.get('#phone').should('have.text','')
                   
    })
    it('4-exibe mensagem de erro quando o telefone se torna obrigatório e não é preenchido', function() {
        const textArea = 'solicito informações dos relatórios mensais'
        cy.get('#firstName').type('Liana')  
        cy.get('#lastName').type('Banhara')  
        cy.get('#email').type('lbanhara@gmail.com') 
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(textArea, {delay:0})   
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!') 
                   
    })
    it('5-preenche e limpa campos nome, sobrenome, e-mail, telefone', function() {
        const textArea = 'solicito informações dos relatórios mensais'
        cy.get('#firstName').type('Liana')
        cy.get('#firstName').should('have.value','Liana').clear()  
        cy.get('#firstName').should('have.value','')

        cy.get('#lastName').type('Banhara')  
        cy.get('#lastName').should('have.value','Banhara').clear()
        cy.get('#lastName').should('have.value','')

        cy.get('#email').type('lbanhara@gmail.com')
        cy.get('#email').should('have.value','lbanhara@gmail.com').clear() 
        cy.get('#email').should('have.value','').clear() 

        cy.get('#phone').type('123456789')
        cy.get('#phone').should('have.value','123456789').clear() 
        cy.get('#phone').should('have.value','').clear() 

        cy.get('#open-text-area').type(textArea, {delay:0})   
        cy.get('#open-text-area').should('have.value',textArea).clear()
        cy.get('#open-text-area').should('have.value','')           
    })

    it('6-exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!') 
    })
    it('7-envia o formuário com sucesso usando um comando customizado', function() {
       cy.fillMandatoryFieldsAndSubmit()
       cy.get('.success').should('be.visible','Mensagem enviada com sucesso.')  
    })

     it('8-seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')  
     })
     it('9-seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')  
     })
     it('10-seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')  
     })

     it('11- marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')  
     })
     
     it('12- marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
          .should('have.length', 3)  
          .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
          })
        })

    it('13- marca ambos checkboxes, depois desmarca o último', function() {
            cy.get('input[type="checkbox"]')
              .should('have.length', 2)  
              .each(function($checkbox){
                    cy.wrap($checkbox).check()
                    cy.wrap($checkbox).should('be.checked')
                    
              })
              .last().uncheck() 
              .should('not.be.checked')
              
     })

     it('14- marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck() 
          .should('not.be.checked')
    })
    it('15-seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
          .should('not.have.value') 
          .selectFile('./cypress/fixtures/example.json')
         
          .should(function ($input) {
           // console.log($input)  
            expect($input[0].files[0].name).to.equal('example.json')   
          })
  
    })
    it('16- seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
          .should('not.have.value') 
          .selectFile('./cypress/fixtures/example.json',{action:"drag-drop"})
          .should(function ($input) {
           // console.log($input)  
            expect($input[0].files[0].name).to.equal('example.json')   
          })
  
    })
    it('17- eleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
       cy.fixture('example.json').as('sampleFile')

       cy.get('input[type="file"]')
         .should('not.have.value') 
         .selectFile('@sampleFile',{action:"drag-drop"})
         .should(function ($input) {
           // console.log($input)  
            expect($input[0].files[0].name).to.equal('example.json')   
          })
        })
    it('18- verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    
        cy.get('#privacy a')
          .should('have.attr','target','_blank')       
    })

    it('19- acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
    
        cy.get('#privacy a')
          .invoke('removeAttr','target')  
          .click() 
        cy.contains('Talking About Testing').should('be.visible')

    })
 
     
})