const { Console, log } = require('console')

module.exports = (on, config) => {
  //getCompareSnapshotsPlugin(on, config);
//
  //// Acrescentado para rodar o gerador de relatórios Allure
  //allureWriter(on, config);
//
  //// Acrescentado para rodar a geração de logs
  //const options = {
  //  logToFilesOnAfterRun: false,
  //  printLogsToFile: 'always',
  //  printLogsToConsole: 'always',
  //  outputRoot: config.projectRoot + '/logs/',
  //  outputTarget: {
  //    'log.txt': 'txt',
  //    'log.json': 'json',
  //  }
  //};
  //require('cypress-terminal-report/src/installLogsPrinter')(on, options);

  // Definição de Tasks
  on('task', { 
    // Task para converter XLSX para Json - usando o package xlsx
    parseXlsx({ CaminhoArquivoOrigem, CaminhoArquivoDestino }) { 
      return new Promise((resolve, reject) => { 
        try {
          const fs = require('fs')
          const XLSX = require('xlsx')
          var workBook = XLSX.readFile(CaminhoArquivoOrigem) // lê o arquivo
          var sheetName = workBook.SheetNames[0] // obtém o nome da primeira planilha
          var jsonData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]) // converte os dados da primeira planilha para Json
          fs.writeFileSync(CaminhoArquivoDestino,JSON.stringify(jsonData, null, 4),"utf-8" ) // grava o arquivo json 
          resolve(null)
          console.log(CaminhoArquivoOrigem)
        } catch (e) 
        {
          reject(e)
        }
      })
    },

    // Task para converter CSV para JSON - Usando o package papaparse
    parseCsv({ CaminhoArquivoOrigem, CaminhoArquivoDestino }) { 
      return new Promise((resolve, reject) => { 
        try {
          const fs = require('fs')
          const par = require('papaparse')
          const csvFile = fs.readFileSync(CaminhoArquivoOrigem, 'utf-8') // lê o arquivo
          const csvResults = par.parse(csvFile, {
            header: true,
            complete: csvData => csvData.data, 
            transformHeader: function(cab) { return cab.replace(/[^a-zA-Z0-9À-ü_\-]/g, '') },
            skipEmptyLines: true
          }).data // converte os dados para Json
          var texto = JSON.stringify(csvResults,null,4) // converte para string Json
          fs.writeFileSync(CaminhoArquivoDestino,texto,"utf-8") // grava o arquivo Json
          resolve(null)
        } catch (e) 
        {
          reject(e)
        }
      })
    }
  })

}
