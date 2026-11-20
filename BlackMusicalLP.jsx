import React, { useEffect, useRef, useState } from 'react'
import portrait from './images/chris-sorrindo.jpg'
import sentirApoio from './images/sentir-apoio.webp'
import { BLACK_MUSICAL_GROUP, countdownParts } from './black-musical-config.js'
import { TrilhaFases, Comunidade } from './BlackMusicalOfertaLP.jsx'
import './black-musical.css'

const iconeWhats = <svg width="27" height="27" style={{ flexShrink: 0 }} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>

function Countdown() {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])
  const parts = countdownParts(now)
  if (parts.every(n => n === 0)) return null
  const labels = ['dias', 'horas', 'min', 'seg']
  return <div className="bm-countdown-wrap">
    <p className="bm-countdown-caption">Faltam</p>
    <div className="bm-countdown" role="timer" aria-label={`Faltam ${parts[0]} dias, ${parts[1]} horas, ${parts[2]} minutos e ${parts[3]} segundos para acabar a Black Musical`}>
      {parts.map((value, index) => <div key={labels[index]}><strong>{String(value).padStart(2, '0')}</strong><span>{labels[index]}</span></div>)}
    </div>
    <p className="bm-countdown-caption bm-countdown-after">para acabar a Black Musical</p>
  </div>
}

function BotaoGrupo({ aberto, onClick, ajuda }) {
  return <div className="bm-action-area">
    {BLACK_MUSICAL_GROUP
      ? <a className="bm-button" href={BLACK_MUSICAL_GROUP} onClick={onClick}>{aberto ? 'Abrindo o WhatsApp…' : 'Entre no Grupo do WhatsApp'}{iconeWhats}</a>
      : <button className="bm-button" disabled>Grupo disponível em breve <span aria-hidden="true">↗</span></button>}
    <p className="bm-helper" role="status">{aberto ? 'Se o WhatsApp não abrir, toque no botão novamente.' : ajuda}</p>
  </div>
}

const mudancas = [
  ['Improvisar com mais liberdade', 'sem depender apenas de movimentos decorados.'],
  ['Compreender a música', 'reconhecendo ritmos, pausas e possibilidades.'],
  ['Criar seus próprios movimentos', 'com mais autonomia e expressão.'],
  ['Dançar com mais conexão', 'percebendo a música, seu corpo e o outro.'],
]

export default function BlackMusicalLP() {
  const [openingGroup, setOpeningGroup] = useState(false)
  const leadTracked = useRef(false)

  function handleGroupClick() {
    setOpeningGroup(true)
    if (leadTracked.current || typeof window.fbq !== 'function') return
    try {
      window.fbq('track', 'Lead', { content_name: 'Black Musical - Grupo WhatsApp', content_category: 'blackmusical' })
      leadTracked.current = true
    } catch { /* Falhas no pixel não devem impedir a abertura do grupo. */ }
  }

  useEffect(() => {
    const previous = document.title
    document.title = 'Black Musical | Chris Busato'
    const font = document.createElement('link')
    font.rel = 'stylesheet'
    font.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;1,500&display=swap'
    document.head.appendChild(font)
    return () => { document.title = previous; font.remove() }
  }, [])

  useEffect(() => {
    const reset = () => setOpeningGroup(false)
    window.addEventListener('pageshow', reset)
    return () => window.removeEventListener('pageshow', reset)
  }, [])

  return <main className="bm-page">
    <div className="bm-layout">
      <div className="bm-photo">
        <img src={portrait} alt="Chris Busato, criadora do Corpo Musical" fetchPriority="high" />
        <span className="bm-photo-caption">Sua dança tem novos caminhos.</span>
      </div>
      <section className="bm-content" aria-labelledby="bm-title">
        <header className="bm-brand">Corpo Musical <span>com Chris Busato</span></header>
        <h1 id="bm-title">Black <em>Musical.</em></h1>
        <h2 className="bm-subtitle">Sua dança tem novos caminhos. E uma oportunidade especial para descobri-los.</h2>
        <p className="bm-intro">Entre no grupo e receba as condições especiais para fazer parte do Corpo Musical, desenvolvendo mais musicalidade, liberdade e expressão na dança.</p>
        <Countdown />
        <BotaoGrupo aberto={openingGroup} onClick={handleGroupClick} ajuda="As condições da Black Musical serão liberadas no grupo." />
      </section>
    </div>

    <div className="bf-page bm-sections">
      <section className="bm-mudar" aria-labelledby="bm-mudar-title"><div className="bm-mudar-inner">
        <div className="bm-mudar-texto">
          <span className="bf-eyebrow">O que pode mudar na sua dança?</span>
          <h2 id="bm-mudar-title">E se você não precisasse aprender mais passos para <em>descobrir novas possibilidades?</em></h2>
          <p>Imagine conseguir ouvir uma música e encontrar diferentes maneiras de se movimentar, improvisar e se expressar, sem ficar preso às mesmas sequências.</p>
          <h3>No Corpo Musical, você desenvolve habilidades para:</h3>
          <ul>{mudancas.map(([forte, resto]) => <li key={forte}><span aria-hidden="true">✓</span><p><strong>{forte}</strong>, {resto}</p></li>)}</ul>
          <p className="bm-mudar-forte">Porque saber muitos passos não significa, necessariamente, saber brincar com a música.</p>
        </div>
        <img src={sentirApoio} alt="" loading="lazy" decoding="async" />
      </div></section>

      <section className="bf-content-section bf-mapa" aria-labelledby="bm-mapa-title"><span className="bf-eyebrow">Descubra o Mapa da Dança</span><h2 id="bm-mapa-title">Um caminho diferente para <em>desenvolver sua musicalidade.</em></h2><p>O Corpo Musical apresenta uma jornada estruturada em <strong>6 fases</strong>, que começa pela compreensão da música e amplia progressivamente suas possibilidades de movimento, expressão e conexão.</p><TrilhaFases /><p className="bm-mapa-rodape"><strong>Da musicalização ao Flow Musical:</strong> um caminho para desenvolver recursos próprios e construir uma dança cada vez mais consciente, livre e musical.</p></section>

      <Comunidade intro={false} eyebrow="Muito mais do que uma plataforma de aulas" titulo={<>Uma experiência completa para <em>aprender, praticar e evoluir.</em></>} />

      <section className="bm-oportunidade" aria-labelledby="bm-oport-title"><div className="bm-oportunidade-inner">
        <span className="bf-eyebrow">Black Musical · a oportunidade</span>
        <h2 id="bm-oport-title">Tudo isso pode fazer parte da sua <em>próxima etapa na dança.</em></h2>
        <p>Se você deseja sair da repetição de passos e desenvolver uma dança com mais liberdade, musicalidade e expressão, <strong>a Black Musical é uma oportunidade especial para começar essa jornada.</strong></p>
        <p>Estamos preparando condições especiais para você conhecer o Corpo Musical e fazer parte dessa experiência de aprendizagem.</p>
        <p><strong>E é no grupo exclusivo do WhatsApp que vamos liberar a oportunidade da Black Musical.</strong></p>
        <h3>Entre no grupo e seja um dos primeiros a conhecer as condições especiais.</h3>
        <Countdown />
        <BotaoGrupo aberto={openingGroup} onClick={handleGroupClick} ajuda="Participação gratuita. Receba os detalhes da Black Musical diretamente no grupo." />
        <footer className="bm-footer"><span />Sua dança tem novos caminhos.<span /></footer>
      </div></section>
    </div>
  </main>
}
