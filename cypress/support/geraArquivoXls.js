// Executa task que converte arquivo CSV para Json
// Parâmetros:
// - inputFile: caminho e nome do arquivo CSV a ser processado. Exemplo: './cypress/csv/tipo_permissao.csv'
// - ouputFile: caminho e nome do arquivo JSON a ser gerado. Exemplo: './cypress/fixtures/tipo_permissao.json'
Cypress.Commands.add("Converte_CSV_JSON", (inputFile,outputfile) => {
    return cy.task('parseCsv', { CaminhoArquivoOrigem: inputFile, CaminhoArquivoDestino: outputfile })
  });
  
  // Executa task que converte arquivo Excel para Json
  // Parâmetros:
  // - inputFile: caminho e nome do arquivo XLSX a ser processado. Exemplo: './cypress/excel/tipo_permissao.xlsx'
  // - ouputFile: caminho e nome do arquivo JSON a ser gerado. Exemplo: './cypress/fixtures/tipo_permissao.json'
  Cypress.Commands.add("Converte_XLSX_JSON", (inputFile,outputfile) => {
    return cy.task('parseXlsx', { CaminhoArquivoOrigem: inputFile, CaminhoArquivoDestino: outputfile })

  });


