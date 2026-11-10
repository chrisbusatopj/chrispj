import React, { useEffect, useRef, useState } from 'react'
import fundoHero from './images/fundo-primeira-dobra.jpg'
import plataforma from './images/banner-plataforma.jpg'
import { MapaDaDanca, ModulosGravados } from './PropostaLP.jsx'
import { formatarTelefone, normalizarTelefone, telefoneValido } from './checkout/telefone.js'
import './black-musical-oferta.css'

const beneficios = [
  '1 encontro ao vivo por semana',
  'Gravações dos encontros enquanto o plano estiver ativo',
  'Comunidade no WhatsApp para trocar e evoluir junto',
  'Transmissão ao vivo dos encontros presenciais MasterMove',
  'Gravações das transmissões do MasterMove',
  'Trilha completa do Mapa da Dança',
  'Aulas temáticas',
]

function Compra({ escolha, onClose }) {
  const dialog = useRef(null)
  const id = useRef(crypto.randomUUID())
  const enviando = useRef(false)
  const [telefone, setTelefone] = useState('')
  const [aluno, setAluno] = useState(escolha.aluno)
  const [erro, setErro] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [naoEncontrado, setNaoEncontrado] = useState(false)
  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    dialog.current.showModal()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = overflow; previous?.focus() }
  }, [])
  async function enviar(event) {
    event.preventDefault()
    event.stopPropagation()
    if (enviando.current) return
    const form = new FormData(event.currentTarget)
    if (!telefoneValido(telefone)) return setErro('Informe um telefone completo com DDD válido.')
    enviando.current = true
    setOcupado(true)
    setErro('')
    setNaoEncontrado(false)
    try {
      const response = await fetch('/api/assinatura?action=blackmusical', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id.current, plano: escolha.plano, aluno, nome: form.get('nome'), email: form.get('email') || '', telefone: normalizarTelefone(telefone) }),
        signal: AbortSignal.timeout(40000),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Não foi possível continuar. Tente novamente.')
      if (data.elegivel === false && !data.ok) { setNaoEncontrado(true); return }
      if (!data.ok || !data.checkoutUrl) throw new Error('Não foi possível abrir o pagamento.')
      const destination = new URL(data.checkoutUrl)
      const params = new URLSearchParams(window.location.search)
      for (const key of ['utm_source', 'utm_campaign', 'utm_medium', 'utm_content', 'utm_term']) {
        if (params.get(key)) destination.searchParams.set(key, params.get(key))
      }
      try { window.fbq?.('track', 'Lead', { content_name: `Black Musical - ${escolha.plano}`, content_category: data.elegivel ? 'aluno' : 'novo_aluno' }) } catch { /* Não bloquear pagamento por falha no pixel. */ }
      window.location.assign(destination.href)
    } catch (error) { setErro(error.name === 'TimeoutError' ? 'O envio demorou mais que o esperado. Tente novamente.' : error.message) }
    finally { enviando.current = false; setOcupado(false) }
  }
  return <dialog className="bf-dialog" ref={dialog} aria-labelledby="bf-dialog-title" onCancel={event => { if (ocupado) event.preventDefault(); else onClose() }}>
    <button className="bf-close" onClick={onClose} disabled={ocupado} aria-label="Fechar">×</button>
    <span className="bf-eyebrow">{escolha.plano === 'anual' ? 'Anual especial · 15 meses de acesso' : 'Semestral especial · 6 meses de acesso'}</span>
    <h2 id="bf-dialog-title">{aluno ? 'Seu preço de aluno.' : 'Sua próxima dança começa aqui.'}</h2>
    <p>{aluno ? 'Alunos elegíveis têm 30% de desconto. Use seu e-mail de cadastro para consultar a condição.' : 'Deixe seu nome e WhatsApp para seguir ao pagamento.'}</p>
    <form onSubmitCapture={enviar} aria-busy={ocupado}>
      <label>Nome<input name="nome" autoComplete="name" required minLength={2} maxLength={100} disabled={ocupado} /></label>
      {aluno && <label>E-mail de aluno<input name="email" type="email" autoComplete="email" required maxLength={254} disabled={ocupado} /></label>}
      <label>WhatsApp com DDD<input name="telefone" type="tel" autoComplete="tel" required placeholder="(11) 99999-9999" value={telefone} onChange={e => setTelefone(formatarTelefone(e.target.value))} disabled={ocupado} /></label>
      <small>Nossa equipe poderá entrar em contato por telefone ou WhatsApp sobre sua inscrição.</small>
      {erro && <p className="bf-error" role="alert">{erro}</p>}
      {naoEncontrado && <div className="bf-notice" role="status"><p>Não encontramos esse e-mail na lista de alunos. Confira o endereço ou continue com a oferta padrão.</p><button type="button" className="bf-secondary" onClick={() => { setAluno(false); setNaoEncontrado(false); setErro('') }}>Continuar com a oferta padrão</button></div>}
      <button type="submit" className="bf-button" disabled={ocupado}>{ocupado ? 'Carregando…' : aluno ? 'Validar e ir para o pagamento →' : 'Ir para o pagamento →'}</button>
      {ocupado && <p role="status">Não saia ainda, você será redirecionado.</p>}
    </form>
  </dialog>
}

export default function BlackMusicalOfertaLP() {
  const [escolha, setEscolha] = useState(null)
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const old = document.title
    document.title = 'Dance Friday | Black Musical · Chris Busato'
    const resize = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', resize)
    return () => { document.title = old; window.removeEventListener('resize', resize) }
  }, [])
  return <main className="bf-page">
    <header className="bf-nav"><a href="#inicio" aria-label="Corpo Musical, início">Comunidade <strong>Corpo Musical</strong></a><a className="bf-nav-cta" href="#ofertas">Ver ofertas ↗</a></header>
    <section className="bf-hero" id="inicio" style={{ backgroundImage: `linear-gradient(180deg, rgba(241,235,226,.9), rgba(241,235,226,.72) 45%, #f1ebe2), url(${fundoHero})` }}>
      <div className="bf-hero-copy"><span className="bf-eyebrow">Black Musical · com Chris Busato</span><h1>Dance <em>Friday.</em></h1><p>Condições especiais para você entrar na Comunidade e desenvolver uma dança mais verdadeira, fluida e musical.</p><a className="bf-button" href="#ofertas">Quero aproveitar →</a><small>Uma jornada para dançar além dos passos.</small></div>

    </section>
    <section className="bf-offers" id="ofertas" aria-labelledby="bf-offers-title"><div className="bf-section-heading"><span className="bf-eyebrow">Condições especiais da Black Friday</span><h2 id="bf-offers-title">Todos os benefícios.<br /><em>Escolha o seu tempo de evolução.</em></h2><p className="bf-offer-intro">Na Black Friday, o plano de entrada passa de 3 para 6 meses e ganha todos os benefícios do anual. Os dois planos incluem os mesmos conteúdos e encontros. No anual, você recebe mais 3 meses de bônus: são 15 meses para viver a jornada completa.</p></div>
      <div className="bf-plans">{['semestral', 'anual'].map(plano => <article key={plano} className={`bf-plan ${plano === 'anual' ? 'bf-featured' : ''}`}>
        <span className="bf-plan-label">{plano === 'anual' ? '12 meses + 3 meses de bônus' : 'De 3 para 6 meses · todos os benefícios'}</span>
        <h3>{plano === 'anual' ? 'Anual' : 'Semestral'} <em>Especial</em></h3>
        <div className="bf-price"><span>R$</span> 97<small>/mês</small></div>
        {plano === 'anual' ? <div className="bf-price-summary"><div><span>Plano de</span><strong>12 meses</strong></div><div><span>Valor total</span><strong>R$ 1.164</strong></div></div> : <p className="bf-price-detail">Plano de 6 meses · valor total de R$ 582</p>}
        <small className="bf-payment-note">Valor mensal equivalente. Consulte as condições de pagamento no checkout.</small>
        <div className="bf-duration">{plano === 'anual' ? <><strong>15 meses de acesso no total</strong><span>Os mesmos benefícios do semestral, com 12 meses de plano + 3 meses de bônus sem custo adicional.</span></> : <><strong>Agora, 6 meses com todos os benefícios do anual</strong><span>O plano de entrada passa de 3 para 6 meses. Acesso à mesma trilha, aos mesmos encontros e a todos os conteúdos do anual.</span></>}</div>
        <ul>{beneficios.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
        <div className="bf-purchase"><button className="bf-button" onClick={() => setEscolha({ plano, aluno: false })}>Quero comprar <small>Não sou aluno</small></button><button className="bf-button bf-student" onClick={() => setEscolha({ plano, aluno: true })}>Quero comprar <small>Sou aluno · 30% de desconto</small></button></div>
      </article>)}</div><p className="bf-offer-footnote">Condições especiais por tempo limitado. Desconto de aluno sujeito à validação do e-mail cadastrado.</p>
    </section>
    <section className="bf-content-section"><span className="bf-eyebrow">Por dentro da Comunidade</span><h2>Tudo o que a Chris ensina,<br /><em>em uma única jornada.</em></h2><p>Da percepção musical e corporal à expressão e à conexão com o outro. Uma trilha de aprendizagem estruturada, encontros semanais ao vivo, gravações e uma comunidade para evoluir junto.</p><img className="bf-platform" src={plataforma} loading="lazy" alt="Plataforma de conteúdos Corpo Musical" /><ModulosGravados isMobile={mobile} /></section>
    <section className="bf-content-section bf-map"><span className="bf-eyebrow">O Mapa da Dança</span><h2>Você não coleciona aulas.<br /><em>Você dança toda semana.</em></h2><MapaDaDanca isMobile={mobile} /></section>
    <section className="bf-final"><span className="bf-eyebrow">Dance Friday</span><h2>Mais tempo para aprofundar sua dança<br /><em>e viver todo o processo.</em></h2><a className="bf-button" href="#ofertas">Escolher meu plano →</a></section>
    <footer className="bf-footer">Comunidade Corpo Musical · Chris Busato</footer>
    {escolha && <Compra escolha={escolha} onClose={() => setEscolha(null)} />}
  </main>
}
