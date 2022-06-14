/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  const THREE_SECONDS_IN_MS = 3000
  const dayjs = require('dayjs')
  const duration = require('dayjs/plugin/duration')
  dayjs.extend(duration)

  beforeEach(() => {
    cy.visit('./src/index.html')

  })

  it('faz calculo com data usando dayjs', function () {

    var dateAtual = dayjs()
    var dateNascimento = dayjs('1985-06-26')
    var calculoAniversario = dateAtual.diff(dateNascimento, 'years')

    var somaDias = dateAtual.add('7', 'days').format('DD/MM/YYYY')

    var dayjsInicio = dayjs() // obtém data/hora atual
    var dayjsFim = dayjs()// obtém data/hora atual
    var addMs = dayjsFim.add('4', 'millisecond')
    var dayjsDifms = dayjs.duration(dayjsFim.diff(dayjsInicio)).asMilliseconds() // diferença em ms
    var dayjsDifms1 = dayjs.duration(addMs.diff(dayjsInicio)).asMilliseconds() // add 4 ms na data fim e tira a diferença



    console.log('data inicio ', dayjsInicio)
    console.log('data fim ', dayjsFim)
    console.log('adiciona milessegundos ', dayjsDifms, dayjsDifms1)
    console.log('calcula data de aniversário ', calculoAniversario)
    console.log('soma 7 dias a data atual ', somaDias)


  })





  it('verifica o titulo da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('1-preenche os campos obrigatórios e envia o formulário', function () {

    const textArea = 'solicito informações dos relatórios mensais'
    cy.clock()
    cy.get('#firstName').type('Liana')
    cy.get('#lastName').type('Banhara')
    cy.get('#email').type('lbanhara@gmail.com')
    cy.get('#open-text-area').type(textArea, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
  })

  it('2-exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    const textArea = 'solicito informações dos relatórios mensais'
    cy.clock()
    cy.get('#firstName').type('Liana')
    cy.get('#lastName').type('Banhara')
    cy.get('#email').type('lbanhara@gmail')
    cy.get('#open-text-area').type(textArea, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.get('.error').should('have.text', '\n      Valide os campos obrigatórios!\n    ')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
  })

  Cypress._.times(3, function () {
    it.skip('3-verifica numero de telefone continua vazio quando preenche valor não-numérico', function () {
      cy.get('#phone').type('abc')
      cy.get('#phone').should('have.text', '')

    })
  })

  it('4-exibe mensagem de erro quando o telefone se torna obrigatório e não é preenchido', function () {
    const textArea = 'solicito informações dos relatórios mensais'
    cy.clock()
    cy.get('#firstName').type('Liana')
    cy.get('#lastName').type('Banhara')
    cy.get('#email').type('lbanhara@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type(textArea, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible', 'Valide os campos obrigatórios!')
  })
  it('5-preenche e limpa campos nome, sobrenome, e-mail, telefone', function () {
    const textArea = 'solicito informações dos relatórios mensais'
    cy.get('#firstName').type('Liana')
    cy.get('#firstName').should('have.value', 'Liana').clear()
    cy.get('#firstName').should('have.value', '')

    cy.get('#lastName').type('Banhara')
    cy.get('#lastName').should('have.value', 'Banhara').clear()
    cy.get('#lastName').should('have.value', '')

    cy.get('#email').type('lbanhara@gmail.com')
    cy.get('#email').should('have.value', 'lbanhara@gmail.com').clear()
    cy.get('#email').should('have.value', '').clear()

    cy.get('#phone').type('123456789')
    cy.get('#phone').should('have.value', '123456789').clear()
    cy.get('#phone').should('have.value', '').clear()

    cy.get('#open-text-area').type(textArea, { delay: 0 })
    cy.get('#open-text-area').should('have.value', textArea).clear()
    cy.get('#open-text-area').should('have.value', '')
  })

  it('6-exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.clock()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
  })
  it('7-envia o formuário com sucesso usando um comando customizado', function () {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
  })

  it.only('8-seleciona um produto (YouTube) por seu texto', function () {
     cy.get('#product')
        .select('YouTube', { force: true })
        .should('have.value', 'youtube')

    cy.fixture("example1").then(function (data) {
        data.forEach(element => {
        var nomeProduto = Cypress._.toLower(element.produto)
        cy.get('#product')
          .select(element.produto, { force: true})
          .should('have.value',nomeProduto)
      })
    })

    cy.fixture("example1").then(function (data) {
      for (let index = 0; index < data.length; index++) {
        var nomeProduto = Cypress._.toLower(data[index].produto)
        cy.get('#product')
          .select(data[index].produto, { force: true })
          .should('have.value', nomeProduto )

      }
    })

     cy.fixture("example").then(function (data) {
        data["massa1"].forEach(element => {
        var nomeProduto = Cypress._.toLower(element.produto)
        cy.get('#product')
          .select(element.produto, { force: true})
          .should('have.value', nomeProduto)
      })

    })

    cy.fixture("example").then(function (data) {
      var i = 0;
      
      do {
        var nomeProduto = Cypress._.toLower(data.massa[i].produto)
        cy.get('#product')
          .select(data.massa[i].produto, { force: true })
          .should('have.value', nomeProduto)
        i = i + 1;

      } while (i < data.massa.length)

    })

    cy.readFile('./cypress/fixtures/example.json').then(function (data) {

      var i = 0;
      do {
        var nomeProduto = Cypress._.toLower(data.massa[i].produto)
        cy.get('#product')
          .select(data.massa[i].produto, { force: true })
          .should('have.value', nomeProduto)

        i = i + 1;


      } while (i < data.massa.length)

    })

  })



  it('9-seleciona um produto (Mentoria) por seu valor (value)', function () {

    cy.get('#product')
      .select('mentoria', { force: true })
      .should('have.value', 'mentoria')
  })
  it('10-seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product')
      .select(1, { force: true })
      .should('have.value', 'blog')
  })

  it('11- marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('12- marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('13- marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .should('have.length', 2)
      .each(function ($checkbox) {
        cy.wrap($checkbox).check()
        cy.wrap($checkbox).should('be.checked')

      })
      .last().uncheck()
      .should('not.be.checked')

  })

  it('14- marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('15-seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')

      .should(function ($input) {
        // console.log($input)  
        expect($input[0].files[0].name).to.equal('example.json')
      })

  })
  it('16- seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: "drag-drop" })
      .should(function ($input) {
        // console.log($input)  
        expect($input[0].files[0].name).to.equal('example.json')
      })

  })
  it('17- eleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('sampleFile')

    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('@sampleFile', { action: "drag-drop" })
      .should(function ($input) {
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })


  it('18- verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {

    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  })

  it('19- acessa a página da política de privacidade removendo o target e então clicanco no link', function () {

    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')

  })


  it('20- roda uma funcionalidade para provar que é estavel', function () {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')

  })


  it('21- alternativas para testar o limite máximo de um campo e preenche a area de texto usando o comando invoke()', function () {

    const textArea = Cypress._.repeat('solicito informações dos relatórios mensais ', 5)
    cy.clock()
    cy.get('#firstName').type('Liana')
    cy.get('#lastName').type('Banhara')
    cy.get('#email').type('lbanhara@gmail.com')
    // para definir o valor de um campo de texto, para quando precisamos digitar um texto longo e não queremos perder tempo.
    cy.get('#open-text-area').invoke('val', textArea)
    cy.get('#open-text-area').should('have.value', textArea)
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')

  })

  it('22- exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function () {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')

  })

  it('23- faz uma requisição HTTP', function () {

    cy.request({
      method: 'GET',
      url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
    }).then((response) => {
      console.log(response)
      expect(response.status).to.equal(200)
      expect(response.body).to.include('CAC TAT')
      expect(response.statusText).to.equal('OK')
    })


  })
  it('24- faz uma requisição HTTP 2', function () {

    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function (response) {
        console.log(response)
        const { status, statusText, body } = response
        expect(status).to.equals(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })

  })


  it('25- desafio do gato', function () {

    cy.get('span[id="cat"]').as('imgGato')

    cy.get('@imgGato')
      .should('be.hidden')
      .invoke('show')
      .should('not.be.hidden')

    cy.get('#title')
      .invoke('text', 'CAT TAT')

    cy.get('#subtitle')
      .invoke('text', 'Eu S2 gatos!')

    cy.get('@imgGato')
      .should('not.be.hidden')
      .invoke('hide')
      .should('be.hidden')

  })
})