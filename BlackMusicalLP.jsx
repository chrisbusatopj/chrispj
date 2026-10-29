import React, { useEffect, useState } from 'react'
import portrait from './images/chris-sorrindo.jpg'
import { BLACK_MUSICAL_GROUP, countdownParts, browserContext, externalBrowserUrl } from './black-musical-config.js'
import './black-musical.css'

function Countdown() {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])
  const parts = countdownParts(now)
  const labels = ['dias', 'horas', 'min', 'seg']
  return <div className="bm-countdown-wrap">
    <p className="bm-countdown-caption">{parts.every(n => n === 0) ? 'Chegou o dia. Acompanhe os detalhes no grupo.' : 'Começa em 11 de novembro'}</p>
    <div className="bm-countdown" role="timer" aria-label={`${parts[0]} dias, ${parts[1]} horas, ${parts[2]} minutos e ${parts[3]} segundos`}>
      {parts.map((value, index) => <div key={labels[index]}><strong>{String(value).padStart(2, '0')}</strong><span>{labels[index]}</span></div>)}
    </div>
  </div>
}

export default function BlackMusicalLP() {
  const [context] = useState(() => browserContext(navigator.userAgent))
  const [instructions, setInstructions] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  const [continueHere, setContinueHere] = useState(() => new URLSearchParams(window.location.search).get('bm_browser') === '1')
  const [openingGroup, setOpeningGroup] = useState(false)
  const gate = context.embedded || !continueHere
  const destination = new URL(window.location.href)
  destination.searchParams.set('bm_browser', '1')
  const pageUrl = destination.href

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

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopyStatus('Link copiado. Cole no Safari ou Chrome.')
    } catch {
      setCopyStatus('Toque no endereço abaixo para selecionar e copiar.')
    }
  }

  if (gate) return <main className="bm-page bm-gate">
    <img className="bm-gate-background" src={portrait} alt="" aria-hidden="true" />
    <section className="bm-gate-content" aria-label="Continuar para a Black Musical">
      {context.android && context.embedded
        ? <a className="bm-gate-button" href={externalBrowserUrl(pageUrl)} onClick={() => setInstructions(true)}>Toque para continuar <span aria-hidden="true">↗</span></a>
        : <button className="bm-gate-button" onClick={() => context.embedded ? setInstructions(true) : setContinueHere(true)}>Toque para continuar <span aria-hidden="true">↗</span></button>}
      {instructions && <div className="bm-instructions" role="status">
        <strong>Abra no navegador para continuar</strong>
        <p>No menu do Instagram ou do aplicativo, toque em “Abrir no navegador” ou “Abrir no Safari”. A página da Black Musical aparecerá com o botão do grupo.</p>
        <button className="bm-text-button" onClick={copyLink}>Copiar link</button>
        {copyStatus && <><p>{copyStatus}</p><input aria-label="Link da Black Musical" readOnly value={pageUrl} onFocus={event => event.target.select()} /></>}
      </div>}
    </section>
  </main>

  return <main className="bm-page">
    <div className="bm-layout">
      <div className="bm-photo">
        <img src={portrait} alt="Chris Busato, criadora do Corpo Musical" fetchPriority="high" />
        <span className="bm-photo-caption">Um convite para a sua próxima dança.</span>
      </div>
      <section className="bm-content" aria-labelledby="bm-title">
        <header className="bm-brand">Corpo Musical <span>com Chris Busato</span></header>
        <h1 id="bm-title">Black <em>Musical.</em></h1>
        <p className="bm-intro">Entre no grupo para receber primeiro os detalhes da campanha.</p>
        <Countdown />
        <div className="bm-action-area">
            {BLACK_MUSICAL_GROUP ? <a className="bm-button" href={BLACK_MUSICAL_GROUP} onClick={() => setOpeningGroup(true)}>{openingGroup ? 'Abrindo o WhatsApp…' : 'Entre no Grupo do Whatsapp'}<svg width="27" height="27" style={{ flexShrink: 0 }} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg></a>
              : <button className="bm-button" disabled>Grupo disponível em breve <span aria-hidden="true">↗</span></button>}
            <p className="bm-helper" role="status">{openingGroup ? 'Se o WhatsApp não abrir, toque no botão novamente.' : 'Os detalhes da Black Musical, direto no seu WhatsApp.'}</p>
        </div>
        <footer className="bm-footer"><span />Sua dança tem novos caminhos.</footer>
      </section>
    </div>
  </main>
}
