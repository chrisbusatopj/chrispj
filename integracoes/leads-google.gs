// Configure PLANILHA_ID nas Propriedades do script.
var CABECALHOS = [
  'ID', 'Data', 'Nome', 'Telefone', 'Plano',
  'Já entrou em contato?', 'Agendar call',
  'Call feita', 'Comprou', 'Observação da call'
];

function abrirAba() {
  var id = PropertiesService.getScriptProperties().getProperty('PLANILHA_ID');
  if (!id || !id.trim()) throw new Error('Configure PLANILHA_ID.');

  var arquivo = SpreadsheetApp.openById(id.trim());
  var aba = arquivo.getSheetByName('Leads Programa') ||
    arquivo.insertSheet('Leads Programa');

  if (aba.getMaxColumns() < 10) {
    aba.insertColumnsAfter(aba.getMaxColumns(), 10 - aba.getMaxColumns());
  }

  if (aba.getLastRow() === 0) {
    aba.getRange(1, 1, 1, 10).setValues([CABECALHOS]);
    aba.getRange(1, 1, 1, 10)
      .setFontWeight('bold')
      .setBackground('#eee8df');
    aba.setColumnWidth(2, 155);
    aba.setColumnWidth(3, 240);
    aba.setColumnWidth(4, 155);
    aba.setColumnWidth(5, 200);
    aba.setColumnWidths(6, 4, 150);
    aba.setColumnWidth(10, 320);
  }

  var atual = aba.getRange(1, 1, 1, 10).getValues()[0];
  if (atual.join('|') !== CABECALHOS.join('|')) {
    throw new Error('A aba Leads Programa tem colunas diferentes. Use uma aba vazia.');
  }

  aba.setFrozenRows(1);
  aba.hideColumns(1);
  return aba;
}

// Execute esta função uma vez para autorizar e criar a estrutura.
function prepararPlanilha() {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    abrirAba();
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  var ofertas = {
    blackmusical_semestral: 'Semestral',
    blackmusical_anual: 'Anual',
    blackmusical_semestral_aluno: 'Semestral — Aluno',
    blackmusical_anual_aluno: 'Anual — Aluno',
    anual: 'Anual — Online regular',
    trimestral: 'Trimestral — Online regular',
    mastermove: 'MasterMove',
    online: 'Interesse na comunidade online'
  };

  function resposta(ok, erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: ok, erro: erro || null }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var dados = JSON.parse(e.postData.contents);
    if (
      !/^[\da-f-]{36}$/i.test(dados.id || '') ||
      typeof dados.nome !== 'string' ||
      dados.nome.trim().length < 2 ||
      dados.nome.length > 100 ||
      !/^(?:55)?\d{10,11}$/.test(dados.telefone || '') ||
      !Object.prototype.hasOwnProperty.call(ofertas, dados.plano)
    ) return resposta(false, 'DADOS_INVALIDOS');

    lock.waitLock(10000);
    var aba = abrirAba();
    var registros = aba.getLastRow() > 1
      ? aba.getRange(2, 1, aba.getLastRow() - 1, 10).getValues()
      : [];
    var linha = 0;

    for (var i = 0; i < registros.length; i++) {
      var registro = registros[i];
      // Preserva observações e marcações do comercial.
      var vazio = registro.slice(2, 5).every(function(v) {
        return String(v).trim() === '';
      }) && String(registro[9]).trim() === '' &&
        registro.slice(5, 9).every(function(v) {
          return v === '' || v === false;
        });

      if (!vazio && registro[0] === dados.id) return resposta(true);
      if (vazio && !linha) linha = i + 2;
    }

    if (!linha) linha = registros.length + 2;
    if (linha > aba.getMaxRows()) {
      aba.insertRowsAfter(aba.getMaxRows(), 100);
    }

    aba.getRange(linha, 3, 1, 2).setNumberFormat('@');
    aba.getRange(linha, 1, 1, 10).setValues([[
      dados.id, new Date(),
      "'" + dados.nome.trim(),
      "'" + dados.telefone,
      ofertas[dados.plano],
      false, false, false, false, ''
    ]]);
    aba.getRange(linha, 6, 1, 4).insertCheckboxes();
    aba.getRange(linha, 2).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    aba.getRange(linha, 10).setWrap(true);
    SpreadsheetApp.flush();
    return resposta(true);
  } catch (err) {
    return resposta(false, 'FALHA_AO_PROCESSAR');
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
