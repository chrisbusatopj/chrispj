import { useEffect, useRef, useState } from 'react'
import { LOTES_ONLINE, loteOnlineEm } from './lotes-online.js'
import { LOTES_PRESENCIAL, lotePresencialEm } from './lotes-presencial.js'
import './oferta-rodape.css'

export default function OfertaRodape() {
  const [detectada, setDetectada] = useState('online')
  const [escolhida, setEscolhida] = useState(null)
  const [agora, setAgora] = useState(Date.now)
  const ref = useRef(null)
  const modalidade = escolhida || detectada
  const presencial = modalidade === 'presencial'
  const estado = presencial ? lotePresencialEm(agora) : loteOnlineEm(agora)
  const proximo = (presencial ? LOTES_PRESENCIAL : LOTES_ONLINE)[estado.indice + 1]
  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/modalidade', { signal: controller.signal, cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.modalidade === 'presencial') setDetectada('presencial') })
      .catch(() => {})
    const atualizar = () => setAgora(Date.now())
    const timer = setInterval(atualizar, 1000)
    window.addEventListener('focus', atualizar)
    return () => { controller.abort(); clearInterval(timer); window.removeEventListener('focus', atualizar) }
  }, [])
  useEffect(() => {
    if (!ref.current) return
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty('--oferta-altura', `${entry.target.getBoundingClientRect().height}px`)
    })
    observer.observe(ref.current)
    return () => { observer.disconnect(); document.documentElement.style.removeProperty('--oferta-altura') }
  }, [estado.ativo])
  if (!estado.ativo) return null
  const segundos = Math.max(0, Math.ceil((Date.parse(estado.lote.fim) - agora) / 1000))
  const tempo = `${Math.floor(segundos / 86400)}d ${String(Math.floor(segundos / 3600) % 24).padStart(2, '0')}h ${String(Math.floor(segundos / 60) % 60).padStart(2, '0')}m ${String(segundos % 60).padStart(2, '0')}s`
  return <>
    <div className="oferta-espaco" aria-hidden="true" />
    <aside ref={ref} className="oferta-rodape" aria-label="Ingresso da vivência">
      <div className="oferta-conteudo">
        <div className="oferta-modalidade">
          <label htmlFor="oferta-modalidade">18 de outubro · {estado.lote.nome}</label>
          <select id="oferta-modalidade" value={modalidade} onChange={e => setEscolhida(e.target.value)}>
            <option value="online">Online · ao vivo</option>
            <option value="presencial">Presencial · São Paulo</option>
          </select>
        </div>
        <div className="oferta-precos">
          {proximo && <span>Próximo lote: R$ {proximo.preco}</span>}
          <strong>R$ {estado.lote.preco}<small> agora</small></strong>
        </div>
        <div className="oferta-timer" role="timer" aria-live="off">
          <span>{proximo ? 'Falta para virar o lote' : 'Inscrições encerram em'}</span>
          <strong>{tempo}</strong>
        </div>
        <a className="oferta-comprar" href={estado.lote.checkout} target="_blank" rel="noopener noreferrer">Garantir {presencial ? 'presencial' : 'online'} →</a>
      </div>
    </aside>
  </>
}
