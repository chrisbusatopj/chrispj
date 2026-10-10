// Configure PLANILHA_ID nas Propriedades do script.
function doPost(e) {
  var lock = LockService.getScriptLock();
  function resposta(ok, erro) {
    return ContentService.createTextOutput(JSON.stringify({ok: ok, erro: erro || null}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  try {
    var dados = JSON.parse(e.postData.contents);
    if (!/^[\da-f-]{36}$/i.test(dados.id || '') ||
        typeof dados.nome !== 'string' || dados.nome.trim().length < 2 || dados.nome.length > 100 ||
        !/^(?:55)?\d{10,11}$/.test(dados.telefone || '') ||
        ['anual', 'trimestral'].indexOf(dados.plano) === -1) return resposta(false, 'DADOS_INVALIDOS');
    var planilhaId = PropertiesService.getScriptProperties().getProperty('PLANILHA_ID');
    if (!planilhaId || !planilhaId.trim()) return resposta(false, 'PLANILHA_ID_AUSENTE');
    lock.waitLock(10000);
    var arquivo;
    try { arquivo = SpreadsheetApp.openById(planilhaId.trim()); }
    catch (err) { return resposta(false, 'PLANILHA_ID_OU_PERMISSAO'); }
    var aba = arquivo.getSheetByName('Leads') || arquivo.insertSheet('Leads');
    if (aba.getLastRow() === 0) {
      aba.appendRow(['ID', 'Data', 'Nome', 'Telefone', 'Plano', 'Já entrou em contato?']);
      aba.setFrozenRows(1);
    }
    if (aba.getLastRow() > 1 && aba.getRange(2, 1, aba.getLastRow() - 1, 1)
      .createTextFinder(dados.id).matchEntireCell(true).findNext()) return resposta(true);
    var ids = aba.getRange(1, 1, aba.getLastRow(), 1).getValues();
    var ultimaLinha = 1;
    for (var i = 1; i < ids.length; i++) if (ids[i][0]) ultimaLinha = i + 1;
    var linha = ultimaLinha + 1;
    if (linha > aba.getMaxRows()) aba.insertRowsAfter(aba.getMaxRows(), 100);
    aba.getRange(linha, 3, 1, 2).setNumberFormat('@');
    aba.getRange(linha, 1, 1, 6).setValues([[
      dados.id, new Date(), "'" + dados.nome.trim(), "'" + dados.telefone, dados.plano, false
    ]]);
    aba.getRange(linha, 6).insertCheckboxes();
    aba.getRange(linha, 2).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    SpreadsheetApp.flush();
    return resposta(true);
  } catch (err) { return resposta(false, 'FALHA_AO_PROCESSAR'); }
  finally { if (lock.hasLock()) lock.releaseLock(); }
}
