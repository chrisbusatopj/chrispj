export default function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  if (req.method !== 'GET') return res.status(405).end()
  let cidade = ''
  try {
    cidade = decodeURIComponent(req.headers['x-vercel-ip-city'] || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
  } catch {}
  const presencial = req.headers['x-vercel-ip-country'] === 'BR' && req.headers['x-vercel-ip-country-region'] === 'SP' && cidade === 'sao paulo'
  return res.status(200).json({ modalidade: presencial ? 'presencial' : 'online' })
}
