import { telefoneValido } from '../checkout/telefone.js'
import { alunosBlackMusical } from './blackmusical-alunos.js'

const checkouts = {
  semestral: { PADRAO: 'https://pay.cakto.com.br/umehfhs', ALUNO: 'https://pay.cakto.com.br/3ehqxnn' },
  anual: { PADRAO: 'https://pay.cakto.com.br/pj42tqs', ALUNO: 'https://pay.cakto.com.br/3ag5fxx' },
}

export default async function blackHandler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' })
  let body
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body } catch { return res.status(400).json({ error: 'Dados inválidos.' }) }
  const { plano, aluno, email = '', nome, telefone, id } = body || {}
  if (!['semestral', 'anual'].includes(plano) || typeof aluno !== 'boolean' ||
      typeof nome !== 'string' || nome.trim().length < 2 || nome.length > 100 ||
      typeof telefone !== 'string' || !telefoneValido(telefone) || !/^[\da-f-]{36}$/i.test(id || '') ||
      (aluno && (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))) {
    return res.status(400).json({ error: 'Confira nome, telefone com DDD e e-mail.' })
  }
  const lista = process.env.BLACKMUSICAL_ALUNOS_EMAILS ?? alunosBlackMusical.join(',')
  if (aluno && !lista?.trim()) return res.status(503).json({ error: 'A consulta de alunos estará disponível em breve.' })
  const elegivel = aluno && new Set(lista.split(/[\s,;]+/).map(item => item.trim().toLowerCase())).has(email.trim().toLowerCase())
  if (aluno && !elegivel) return res.status(200).json({ elegivel: false })
  const categoria = elegivel ? 'ALUNO' : 'PADRAO'
  const link = process.env[`BLACKMUSICAL_CHECKOUT_${plano.toUpperCase()}_${categoria}`] ?? checkouts[plano][categoria]
  let url
  try { url = new URL(link); if (url.protocol !== 'https:' || url.hostname !== 'pay.cakto.com.br' || url.username || url.password) throw new Error() }
  catch { return res.status(503).json({ error: 'O checkout desta oferta estará disponível em breve.' }) }
  // O lead é salvo pelo navegador em paralelo (sendBeacon), para não atrasar o redirecionamento.
  return res.status(200).json({ ok: true, elegivel: Boolean(elegivel), checkoutUrl: url.href })
}
