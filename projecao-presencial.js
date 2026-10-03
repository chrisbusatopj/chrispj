// Projeção por data, independente das vendas confirmadas na Cakto.
// Atualização diária à meia-noite de Brasília, de 03 a 18/10/2026.
const INICIO = Date.parse('2026-10-03T00:00:00-03:00')
const FIM = Date.parse('2026-10-18T00:00:00-03:00')
const DIA_MS = 86_400_000
const DIAS = (FIM - INICIO) / DIA_MS
export const TAXA_DIARIA_PRESENCIAL = (100 / 46) ** (1 / DIAS) - 1

export function ocupacaoProjetadaEm(agora = Date.now()) {
  const instante = Number(new Date(agora))
  const dias = Number.isFinite(instante)
    ? Math.min(DIAS, Math.max(0, Math.floor((instante - INICIO) / DIA_MS)))
    : 0
  return Math.min(100, Math.round(46 * (1 + TAXA_DIARIA_PRESENCIAL) ** dias * 10) / 10)
}
