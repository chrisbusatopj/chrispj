import { normalizarTelefone, telefoneValido } from '../checkout/telefone.js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false })
  }
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) return res.status(415).json({ ok: false })
  let body
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body } catch { return res.status(400).json({ ok: false }) }
  const nome = typeof body?.nome === 'string' ? body.nome.trim().replace(/\s+/g, ' ') : ''
  const telefone = typeof body?.telefone === 'string' ? normalizarTelefone(body.telefone) : ''
  if (!/^[\da-f-]{36}$/i.test(body?.id || '') || nome.length < 2 || nome.length > 100 ||
    !telefoneValido(telefone) || !['anual', 'trimestral'].includes(body?.plano)) {
    return res.status(400).json({ ok: false })
  }
  const url = process.env.LEADS_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwZ0uCufwqIp7ZdTAFlAzS4T_EPqm1nTVWQb7UcpmmgDDV9vpKqpT4WWC9W-i2UFl9d5g/exec'
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(url || '')) return res.status(503).json({ ok: false })
  try {
    const response = await fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: body.id, nome, telefone, plano: body.plano }),
      signal: AbortSignal.timeout(18000),
    })
    const data = await response.json()
    if (!response.ok || data.ok !== true) throw new Error('save')
    return res.status(200).json({ ok: true })
  } catch { return res.status(502).json({ ok: false }) }
}
