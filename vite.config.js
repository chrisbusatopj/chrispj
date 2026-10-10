import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import leadsHandler from './server/leads-assinatura.js'

export default defineConfig(({ mode }) => ({
  plugins: [react(), {
    name: 'local-leads-api',
    configureServer(server) {
      const env = loadEnv(mode, process.cwd(), 'LEADS_')
      for (const [key, value] of Object.entries(env)) process.env[key] = value
      server.middlewares.use('/api/leads-assinatura', async (req, res) => {
        res.status = code => { res.statusCode = code; return res }
        res.json = value => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(value)) }
        let body = ''
        for await (const chunk of req) {
          body += chunk
          if (body.length > 8192) return res.status(413).json({ ok: false })
        }
        req.body = body
        await leadsHandler(req, res)
      })
    },
  }],
  assetsInclude: ['**/*.PNG', '**/*.mp4'],
}))
