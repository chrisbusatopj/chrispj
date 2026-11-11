import React, { useEffect, useRef, useState } from 'react'
import fundoHero from './images/fundo-primeira-dobra.jpg'
import plataforma from './images/banner-plataforma.jpg'
import { MapaDaDanca, ModulosGravados } from './PropostaLP.jsx'
import { feedbackItems } from './BrincandoNaMusicaLP.jsx'
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

function Depoimentos() {
  const trilha = useRef(null)
  return <section className="bf-proof" aria-labelledby="bf-proof-title"><div className="bf-proof-heading"><span className="bf-eyebrow">Quem já viveu essa experiência</span><h2 id="bf-proof-title">Veja o que acontece com quem desenvolve uma Base Musical:</h2><div className="bf-proof-controls"><button aria-label="Depoimentos anteriores" onClick={() => trilha.current.scrollBy({ left: -340, behavior: 'smooth' })}>←</button><button aria-label="Próximos depoimentos" onClick={() => trilha.current.scrollBy({ left: 340, behavior: 'smooth' })}>→</button></div></div><div ref={trilha} className="bf-proof-track" tabIndex={0} aria-label="Depoimentos dos alunos, deslize para ver mais">{feedbackItems.map((item, i) => <figure key={item.src}><img src={item.src} alt={`Depoimento de ${item.name} — ${i + 1}`} loading="lazy" /><figcaption>{item.name}</figcaption></figure>)}</div></section>
}

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
    <span className="bf-eyebrow">{aluno ? 'Já sou aluno ou ex-aluno · 30% OFF' : escolha.plano === 'anual' ? 'Anual especial · 15 meses de acesso' : 'Semestral especial · 6 meses de acesso'}</span>
    <h2 id="bf-dialog-title">{aluno ? 'Sua condição para ampliar o acesso' : 'Sua próxima dança começa aqui.'}</h2>
    {aluno && <div className="bf-student-price"><del>{escolha.plano === 'anual' ? 'R$ 1.164,00' : 'R$ 582,00'}</del><strong>R$ {escolha.plano === 'anual' ? '814,80' : '407,40'}</strong><small>Total com 30% de desconto. Parcelamento e juros no checkout.</small></div>}
    <p>{aluno ? 'Use seu e-mail de cadastro para validar sua condição de aluno ou ex-aluno.' : 'Deixe seu nome e WhatsApp para seguir ao pagamento.'}</p>
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
    document.title = 'Black Musical | Chris Busato'
    const resize = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', resize)
    return () => { document.title = old; window.removeEventListener('resize', resize) }
  }, [])
  return <main className="bf-page">
    <section className="bf-hero" id="inicio" style={{ backgroundImage: `linear-gradient(180deg, rgba(241,235,226,.9), rgba(241,235,226,.72) 45%, #f1ebe2), url(${fundoHero})` }}>
      <div className="bf-hero-copy"><span className="bf-eyebrow">Black Musical · com Chris Busato</span><h1>Black <em>Musical.</em></h1><p>Condições especiais para você entrar na Comunidade e desenvolver uma dança mais verdadeira, fluida e musical.</p><a className="bf-button" href="#dentro">Quero aproveitar →</a><small>Uma jornada para dançar além dos passos.</small></div>

    </section>
    <section className="bf-story bf-story-intro"><div className="bf-story-inner"><span className="bf-eyebrow">Uma nova relação com a dança</span><h2>A dança é muito mais do que aprender passos.<br /><em>Ela é sobre sentir e expressar.</em></h2><div className="bf-story-copy"><p>Você não precisa de mais passos e sequências pra saber brincar na música e ter uma dança mais fluida.</p><p>Não precisa passar anos e anos buscando algo que nunca chega.</p><p>Desenvolva sua Base Musical e descubra novas possibilidades para dançar com mais autonomia, fluidez e segurança.</p><p>Conheça o Corpo Musical e descubra como transformar sua relação com a música, com o outro e com sua própria expressão dentro da dança.</p><a className="bf-button" href="#dentro">QUERO VIVER ESSA EXPERIÊNCIA</a></div></div></section>
    <section className="bf-story bf-story-question"><div className="bf-story-inner"><h2>Aprender mais passos não necessariamente vai te levar a uma <em>dança mais musical.</em></h2><div className="bf-story-copy"><h3>Você já sentiu que:</h3><ul><li>Depende dos passos que conhece para conseguir dançar?</li><li>Vive preocupado em acertar os movimentos em vez de aproveitar a música?</li><li>Tem dificuldade para acompanhar as músicas?</li><li>Gostaria de se soltar mais, improvisar, mas não sabe como?</li><li>Sente que sua dança fica limitada ao repertório que aprendeu?</li></ul><p>A verdade é que conhecer muitos passos não significa necessariamente ter liberdade para dançar.</p><p>Existe uma diferença entre saber reproduzir movimentos e desenvolver a capacidade de compreender a música e encontrar possibilidades de movimento a partir dela.</p><p><strong>É essa diferença que pode transformar sua experiência na dança.</strong></p></div></div></section>
    <section className="bf-story bf-story-for"><div className="bf-story-inner"><h2>O Corpo Musical não é para quem só quer copiar e executar passos.<br /><em>É para quem realmente deseja aprender a linguagem da dança.</em><br />Para quem deseja transformar música em movimento.</h2><div className="bf-story-copy"><h3>É para você que:</h3><ul><li>Quer ter mais liberdade para dançar.</li><li>Deseja desenvolver sua autonomia.</li><li>Quer aprender a improvisar.</li><li>Busca mais fluidez e naturalidade nos movimentos.</li><li>Deseja compreender melhor a música.</li><li>Quer aproveitar mais cada momento na pista.</li><li>Sente que pode explorar muito mais possibilidades na dança.</li></ul><p>Independentemente de quantos passos você conhece hoje, sempre existe espaço para desenvolver sua relação com a música e descobrir novas possibilidades.</p></div></div></section>
    <section className="bf-content-section" id="dentro"><span className="bf-eyebrow">Por dentro da Comunidade</span><h2>Tudo o que a Chris ensina,<br /><em>em uma única jornada.</em></h2><p>Da percepção musical e corporal à expressão e à conexão com o outro. Uma trilha de aprendizagem estruturada, encontros semanais ao vivo, gravações e uma comunidade para evoluir junto.</p><img className="bf-platform" src={plataforma} loading="lazy" alt="Plataforma de conteúdos Corpo Musical" /><ModulosGravados isMobile={mobile} /></section>
    <section className="bf-content-section bf-map"><span className="bf-eyebrow">O Mapa da Dança</span><h2>Você não coleciona aulas.<br /><em>Você dança toda semana.</em></h2><MapaDaDanca isMobile={mobile} /></section>
    <Depoimentos />
    <section className="bf-offers" id="ofertas" aria-labelledby="bf-offers-title"><div className="bf-section-heading"><span className="bf-eyebrow">Condições especiais da Black Friday</span><h2 id="bf-offers-title">Todos os benefícios.<br /><em>Escolha sua condição especial.</em></h2><div className="bf-offer-intro"><p>Na Black Musical, você conquista mais benefícios em cada escolha.</p><p>Ao assinar o plano de 6 meses, você recebe todos os benefícios do plano anual, aproveitando a experiência completa do Corpo Musical.</p><p>E se escolher o plano anual, ganha mais 3 meses de bônus. São 15 meses de acesso no total, para aprofundar seu aprendizado, evoluir na dança e viver toda a jornada do Corpo Musical.</p></div></div>
      <div className="bf-plans">{['semestral', 'anual'].map(plano => <article key={plano} className={`bf-plan bf-plan-integrated ${plano === 'anual' ? 'bf-featured' : ''}`}>
        <div className="bf-plan-main">
          <span className="bf-plan-label">{plano === 'anual' ? '12 meses + 3 meses de bônus = 15 meses no total' : 'De 3 para 6 meses · todos os benefícios'}</span>
          <h3>{plano === 'anual' ? 'Anual' : 'Semestral'} <em>Especial</em></h3>
          <div className="bf-price"><span>R$</span> 97<small>/mês</small></div>
          <div className="bf-duration"><strong>{plano === 'anual' ? '15 meses de acesso no total' : '6 meses com todos os benefícios do anual'}</strong><span>{plano === 'anual' ? '12 meses de plano + 3 meses de bônus sem custo adicional.' : 'A mesma trilha, os mesmos encontros e todos os conteúdos do anual.'}</span></div>
          <ul>{beneficios.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
          <div className="bf-purchase"><button className="bf-button" onClick={() => setEscolha({ plano, aluno: false })}>Quero meu acesso <span aria-hidden="true">→</span></button></div>
        </div>
        <aside className="bf-aluno-offer" aria-label={`Condição de aluno — ${plano}`}>
          <span className="bf-aluno-badge">Já sou aluno ou ex-aluno · 30% OFF</span>
          <h4>Sua condição para ampliar o acesso</h4>
          <div className="bf-aluno-values"><strong className="bf-aluno-monthly">R$ 67,90<small>/mês</small></strong><span className="bf-aluno-equivalent">Valor mensal equivalente</span></div><p className="bf-aluno-cash">30% OFF · {plano === 'anual' ? '12 meses + 3 de bônus' : '6 meses de acesso'}.</p>
          <button className="bf-button" onClick={() => setEscolha({ plano, aluno: true })}>Quero minha condição de aluno <span aria-hidden="true">→</span></button>
          <p className="bf-aluno-validation">Valide seu e-mail de aluno para continuar.</p>
        </aside>
      </article>)}</div><p className="bf-offer-footnote">Condições especiais por tempo limitado. Desconto de aluno sujeito à validação do e-mail cadastrado.</p>
    </section>
    <section className="bf-final bf-closing"><div className="bf-closing-inner"><h2>Sua dança pode oferecer muito mais possibilidades. <em>Comece desenvolvendo A BASE que transforma sua relação com a música, com o par e com você mesmo.</em></h2><p>Você não precisa passar a vida dependendo dos mesmos passos ou esperando conhecer uma nova sequência para conseguir aproveitar a dança.</p><p>Desenvolva sua Base Musical, ganhe confiança, autonomia e descubra tudo o que pode viver quando sua relação com a música evolui.</p><p>A Black Musical é uma oportunidade especial para fazer parte da Comunidade do Corpo Musical com condições especiais e mais tempo para desenvolver sua dança.</p><p><strong>Escolha seu plano e comece a viver essa jornada.</strong></p><a className="bf-button" href="#ofertas">QUERO ENTRAR PARA O CORPO MUSICAL</a></div></section>
    <footer className="bf-footer">Comunidade Corpo Musical · Chris Busato</footer>
    {escolha && <Compra escolha={escolha} onClose={() => setEscolha(null)} />}
  </main>
}
