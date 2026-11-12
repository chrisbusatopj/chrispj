// Propriedades do script (Configurações do projeto → Propriedades do script):
//   PLANILHA_ID = ID da planilha (parte entre /d/ e /edit na URL)
//   ABA_ID      = número que aparece depois de "gid=" na URL quando a aba está aberta
// Com ABA_ID configurado, você pode renomear a aba à vontade.

var CABECALHOS = [
  'ID', 'Data', 'Nome', 'Telefone', 'Plano',
  'Já entrou em contato?', 'Agendar call',
  'Call feita', 'Comprou', 'Observação da call'
];

var OFERTAS = {
  blackmusical_semestral: 'Semestral',
  blackmusical_anual: 'Anual',
  blackmusical_semestral_aluno: 'Semestral — Aluno',
  blackmusical_anual_aluno: 'Anual — Aluno',

  // Outros formulários do site.
  anual: 'Anual — Online regular',
  trimestral: 'Trimestral — Online regular',
  mastermove: 'MasterMove',
  online: 'Interesse na comunidade online'
};

function abrirAba() {
  var props = PropertiesService.getScriptProperties();
  var planilhaId = (props.getProperty('PLANILHA_ID') || '').trim();
  if (!planilhaId) throw new Error('Configure PLANILHA_ID.');

  var arquivo = SpreadsheetApp.openById(planilhaId);
  var abaId = (props.getProperty('ABA_ID') || '').trim();
  var aba = null;

  // 1º: pela identificação fixa da aba (não muda quando renomeia).
  if (abaId) {
    var abas = arquivo.getSheets();
    for (var i = 0; i < abas.length; i++) {
      if (String(abas[i].getSheetId()) === abaId) { aba = abas[i]; break; }
    }
  }

  // 2º: pelo nome, se ABA_ID não estiver configurado.
  if (!aba) aba = arquivo.getSheetByName('Leads Programa');

  // 3º: cria a aba só se não existir nenhuma.
  if (!aba) {
    aba = arquivo.insertSheet('Leads Programa');
    aba.getRange(1, 1, 1, CABECALHOS.length).setValues([CABECALHOS])
      .setFontWeight('bold').setBackground('#eee8df');
    aba.setFrozenRows(1);
  }

  return aba;
}

// Próxima linha livre olhando Data, Nome e Telefone (colunas B a D).
// Assim, linhas antigas coladas à mão não atrapalham.
function proximaLinha(aba) {
  var ultima = aba.getLastRow();
  if (ultima < 2) return 2;
  var valores = aba.getRange(2, 2, ultima - 1, 3).getValues();
  for (var i = valores.length - 1; i >= 0; i--) {
    if (valores[i].join('').trim() !== '') return i + 3;
  }
  return 2;
}

// Execute uma vez para autorizar.
function prepararPlanilha() {
  abrirAba();
  SpreadsheetApp.flush();
}

function resposta(ok, erro) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: ok, erro: erro || null }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    var dados = JSON.parse(e.postData.contents);

    if (
      !/^[\da-f-]{36}$/i.test(dados.id || '') ||
      typeof dados.nome !== 'string' ||
      dados.nome.trim().length < 2 ||
      dados.nome.length > 100 ||
      !/^(?:55)?\d{10,11}$/.test(dados.telefone || '') ||
      !Object.prototype.hasOwnProperty.call(OFERTAS, dados.plano)
    ) {
      return resposta(false, 'DADOS_INVALIDOS');
    }

    lock.waitLock(10000);
    var aba = abrirAba();

    // O mesmo envio não gera contato duplicado (procura o ID na coluna A).
    if (aba.getLastRow() >= 2) {
      var achou = aba.getRange(2, 1, aba.getLastRow() - 1, 1)
        .createTextFinder(dados.id).matchEntireCell(true).findNext();
      if (achou) return resposta(true);
    }

    var linha = proximaLinha(aba);
    if (linha > aba.getMaxRows()) aba.insertRowsAfter(aba.getMaxRows(), 100);

    aba.getRange(linha, 3, 1, 2).setNumberFormat('@');
    aba.getRange(linha, 1, 1, 10).setValues([[
      dados.id,
      new Date(),
      dados.nome.trim(),
      dados.telefone,
      OFERTAS[dados.plano],
      false, false, false, false,
      ''
    ]]);
    aba.getRange(linha, 6, 1, 4).insertCheckboxes();
    aba.getRange(linha, 2).setNumberFormat('dd/MM/yyyy HH:mm:ss');

    SpreadsheetApp.flush();
    return resposta(true);

  } catch (err) {
    console.error(err);
    return resposta(false, 'FALHA_AO_PROCESSAR');

  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
