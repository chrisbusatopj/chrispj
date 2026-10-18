import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CHECKOUTS_TEMPORARIOS } from './links-temporarios.js'
import { formatarTelefone, normalizarTelefone, telefoneValido } from './telefone.js'
import './escolha-pagamento.css'

export default function EscolhaPagamento({ plano, onClose, destinoPagina }) {
  const navigate = useNavigate()
  const dialog = useRef(null)
  const leadId = useRef(crypto.randomUUID())
  const enviando = useRef(false)
  const [ocupado, setOcupado] = useState(false)
  const [erro, setErro] = useState('')
  const [telefoneDigitado, setTelefoneDigitado] = useState('')
  const [telefoneTocado, setTelefoneTocado] = useState(false)
  const telefoneInvalido = telefoneTocado && !telefoneValido(telefoneDigitado)
  useEffect(() => {
    const elemento = dialog.current
    const anterior = document.activeElement
    const overflow = document.body.style.overflow
    elemento.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      elemento.close()
      document.body.style.overflow = overflow
      anterior?.focus()
    }
  }, [])

  async function enviar(event) {
    event.preventDefault()
    // Intercepta antes dos listeners de pixels no form que chamam form.submit().
    event.stopPropagation()
    if (enviando.current) return
    const dados = new FormData(event.currentTarget)
    const nome = String(dados.get('nome') || '').trim().replace(/\s+/g, ' ')
    const telefone = normalizarTelefone(dados.get('telefone'))
    setTelefoneTocado(true)
    if (!telefoneValido(telefone)) {
      event.currentTarget.elements.telefone.focus()
      return
    }
    if (nome.length < 2) {
      setErro('Confira seu nome.')
      return
    }
    enviando.current = true
    setOcupado(true)
    setErro('')
    try {
      const resposta = await fetch('/api/leads-assinatura', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId.current, nome, telefone, plano }),
        signal: AbortSignal.timeout(40000),
      })
      const resultado = await resposta.json()
      if (!resposta.ok || resultado.ok !== true) throw new Error('envio')
      if (destinoPagina) {
        navigate(destinoPagina)
        window.scrollTo(0, 0)
        onClose()
        return
      }
      const destino = new URL(CHECKOUTS_TEMPORARIOS[plano])
      const params = new URLSearchParams(window.location.search)
      for (const campo of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
        if (params.get(campo)) destino.searchParams.set(campo, params.get(campo))
      }
      window.location.assign(destino.href)
    } catch {
      setErro('Não conseguimos confirmar o envio. Tente novamente em instantes.')
      enviando.current = false
      setOcupado(false)
    }
  }

  return <dialog ref={dialog} className="cm-pagamento" aria-labelledby="cm-pagamento-titulo" onCancel={event => {
    if (ocupado) event.preventDefault()
    else onClose()
  }}>
    <button type="button" className="cm-pagamento-fechar" aria-label="Fechar" onClick={onClose} disabled={ocupado}>×</button>
    <p className="cm-pagamento-plano">{plano === 'online' ? 'Comunidade Online' : plano === 'mastermove' ? 'MasterMove Presencial (São Paulo)' : plano === 'anual' ? 'Plano Anual Aprofunde' : 'Plano Trimestral Experimente'}</p>
    <h2 id="cm-pagamento-titulo">Vamos começar?</h2>
    <p className="cm-pagamento-intro">{destinoPagina ? 'Deixe seus dados para conhecer a proposta.' : 'Deixe seus dados para seguir ao pagamento.'}</p>
    <form onSubmitCapture={enviar} className="cm-lead-form" aria-busy={ocupado}>
      <label htmlFor="cm-lead-nome">Nome</label>
      <input id="cm-lead-nome" name="nome" autoComplete="name" required minLength={2} maxLength={100} disabled={ocupado} />
      <label htmlFor="cm-lead-telefone">Telefone com DDD</label>
      <input id="cm-lead-telefone" name="telefone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" required disabled={ocupado}
        value={telefoneDigitado} onChange={event => setTelefoneDigitado(formatarTelefone(event.target.value))}
        onBlur={() => setTelefoneTocado(true)} aria-invalid={telefoneInvalido} aria-describedby={telefoneInvalido ? 'cm-telefone-erro' : undefined} />
      {telefoneInvalido && <p id="cm-telefone-erro" className="cm-lead-erro" role="alert">Informe um DDD válido e o número completo. Celular: 9 dígitos começando com 9; fixo: 8 dígitos.</p>}
      <p className="cm-lead-nota">Nossa equipe poderá entrar em contato por telefone ou WhatsApp {plano === 'mastermove' ? 'sobre sua participação no MasterMove.' : 'sobre sua assinatura.'}</p>
      {erro && <p className="cm-lead-erro" role="alert">{erro}</p>}
      <button className="cm-lead-enviar" type="submit" disabled={ocupado}>{ocupado ? 'Enviando…' : destinoPagina ? 'Conhecer a proposta →' : 'Continuar para o pagamento →'}</button>
      {!destinoPagina && <p className="cm-lead-nota">Você será direcionado ao pagamento seguro da Cakto.</p>}
    </form>
  </dialog>
}
