import React, { useEffect, useRef, useState } from 'react'
import fundoHero from './images/fundo-primeira-dobra.jpg'
import encontrosAoVivo from './images/encontros-ao-vivo.webp'
import mastermoveNotebook from './images/mastermove-notebook.webp'
import grupoAvatar from './images/whatsapp-grupo-avatar.webp'
import comunidadeAvatar from './images/whatsapp-comunidade-avatar.webp'
import trilhaFase1 from './images/trilha-final-fase-1.jpg'
import trilhaFase2 from './images/trilha-final-fase-2.jpg'
import trilhaFase3 from './images/trilha-final-fase-3.jpg'
import trilhaFase4 from './images/trilha-final-fase-4.jpg'
import trilhaFase5 from './images/trilha-final-fase-5.jpg'
import trilhaFase6 from './images/trilha-final-fase-6.jpg'
import { formatarTelefone, normalizarTelefone, telefoneValido } from './checkout/telefone.js'
import './black-musical-oferta.css'

const beneficiosOferta = ['Trilha completa do Mapa da Dança', 'Encontros ao vivo 1x por semana', 'Gravações dos encontros', 'MasterMove por transmissão e gravação', 'Aulas temáticas', 'Comunidade no WhatsApp']

const beneficios = [
  '1 encontro ao vivo por semana',
  'Gravações dos encontros enquanto o plano estiver ativo',
  'Comunidade no WhatsApp para trocar e evoluir junto',
  'Transmissão ao vivo dos encontros presenciais MasterMove',
  'Gravações das transmissões do MasterMove',
  'Trilha completa do Mapa da Dança',
  'Aulas temáticas',
]

const fases = [
  { fase: 1, titulo: 'Desenvolvimento Musical', subtitulo: 'Musicalização e Musicalidade', imagem: trilhaFase1 },
  { fase: 2, titulo: 'O Corpo', subtitulo: 'Percepção Corporal', imagem: trilhaFase2 },
  { fase: 3, titulo: 'Expressão e Movimento', subtitulo: 'A voz', imagem: trilhaFase3 },
  { fase: 4, titulo: 'O Diálogo', subtitulo: 'Consciência Relacional', imagem: trilhaFase4 },
  { fase: 5, titulo: 'Integração', subtitulo: 'Flow Musical', imagem: trilhaFase5 },
  { fase: 6, titulo: 'Vida Musical', subtitulo: 'Levar isso para a vida', imagem: trilhaFase6 },
]

function TrilhaFases() {
  return <ol className="bf-trilha" aria-label="Trilha de aprendizagem em 6 fases">{fases.map(item => <li key={item.fase} className="bf-trilha-item">
    <span className="bf-trilha-fase">Fase {item.fase}</span>
    <div className={`bf-trilha-card${item.imagem ? '' : ' bf-trilha-card--vazio'}`}>
      <img src={item.imagem} alt="" loading="lazy" />
      <div className="bf-trilha-texto"><strong>{item.titulo}</strong>{item.subtitulo && <small>{item.subtitulo}</small>}</div>
    </div>
  </li>)}</ol>
}

const vturbScript = id => `https://scripts.converteai.net/f83d06f7-a6e5-470f-be16-2373cdb1707e/players/${id}/v4/player.js`

const videosDepoimento = [
  { id: '6af4d34a194e478d8d23515d', proporcao: '177.77777777777777%' },
  { id: '6af4d338194e478d8d23514b', proporcao: '176.02131438721136%' },
  { id: '6af5b4a1a8bc6817087a74a3', proporcao: '177.77777777777777%' },
]

function Depoimentos() {
  const trilha = useRef(null)
  const mover = sentido => trilha.current?.scrollBy({ left: sentido * trilha.current.clientWidth * 0.8, behavior: 'smooth' })
  return <section className="bf-proof" aria-labelledby="bf-proof-title"><div className="bf-proof-heading"><span className="bf-eyebrow">Depoimentos</span><h2 id="bf-proof-title">Quem já começou a viver <em>essa transformação</em></h2><p className="bf-proof-sub">Conheça as experiências de quem está desenvolvendo uma nova relação com a música, com o corpo e com a dança.</p><div className="bf-proof-controls"><button type="button" aria-label="Depoimento anterior" onClick={() => mover(-1)}>←</button><button type="button" aria-label="Próximo depoimento" onClick={() => mover(1)}>→</button></div></div><div ref={trilha} className="bf-proof-videos" tabIndex={0} aria-label="Depoimentos em vídeo, deslize para ver mais">{videosDepoimento.map(video => <div key={video.id} className="bf-proof-video"><vturb-smartplayer id={`vid-${video.id}`} style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}><div className="vturb-player-placeholder" style={{ position: 'relative', width: '100%', padding: `${video.proporcao} 0 0`, zIndex: 0, backgroundColor: 'black' }}></div></vturb-smartplayer></div>)}</div></section>
}

const aulasTematicas = ['Vergonha na Dança', 'Do Erro à Possibilidade', 'Como Quebrar Padrões']

function GrupoWhatsApp() {
  return <div className="bf-wpp" aria-label="Dados do grupo da comunidade no WhatsApp">
    <div className="bf-wpp-top"><span aria-hidden="true">✕</span>Dados do grupo</div>
    <img className="bf-wpp-avatar" src={grupoAvatar} alt="" loading="lazy" decoding="async" />
    <strong className="bf-wpp-nome">Online | Corpo Musical 💛</strong>
    <p className="bf-wpp-info">Grupo na comunidade "Alunos | Corpo Musical" · 66 membros</p>
    <div className="bf-wpp-comunidade"><img src={comunidadeAvatar} alt="" loading="lazy" decoding="async" /><div><strong>Alunos | Corpo Musical</strong><small>Comunidade · 3 grupos</small></div></div>
    <div className="bf-wpp-descricao"><strong>✨ BEM-VINDO(A) À COMUNIDADE CORPO MUSICAL</strong><p>Este é nosso espaço de troca, para compartilhar experiênc…<span>Ler mais</span></p></div>
    <p className="bf-wpp-membros">66 membros</p>
  </div>
}

function AulasTematicas() {
  return <ul className="bf-temas" aria-label="Aulas temáticas disponíveis">{aulasTematicas.map((aula, i) => <li key={aula} className="bf-tema">
    <span className="bf-tema-play" aria-hidden="true">▶</span>
    <small>Aula temática {String(i + 1).padStart(2, '0')}</small>
    <strong>{aula}</strong>
  </li>)}</ul>
}

// Foto da banda da Sessão 4. Deixe null até ter uma imagem própria (sem marca d'água de terceiros).
const imagemBanda = null

function Secao5() {
  const etapas = [
    { rotulo: '01 — Música', titulo: 'Você começa a compreender o que está ouvindo.', texto: 'Aprende a reconhecer o pulso, os tempos, as pausas e as possibilidades que a música oferece, em vez de depender apenas de contagens ou sequências prontas.', foto: trilhaFase1 },
    { rotulo: '02 — Corpo e movimento', titulo: 'Você desenvolve recursos para transformar música em movimento.', texto: 'Trabalha a organização do corpo, amplia suas possibilidades de movimento e experimenta formas de improvisar, criar e se expressar musicalmente.', foto: trilhaFase3 },
    { rotulo: '03 — Relação e integração', titulo: 'Você aprende a fazer sua musicalidade dialogar com a do outro.', texto: 'Explora como compartilhar ritmo, movimento e espaço, desenvolvendo uma dança a dois com mais autonomia, conexão e possibilidades de expressão.', foto: trilhaFase4 },
  ]
  return <section className="bf-sentir" aria-labelledby="bf-sentir-title"><div className="bf-sentir-inner">
    <div className="bf-sentir-banner">
      <div className="bf-sentir-texto"><span className="bf-sentir-linha" aria-hidden="true" /><h2 id="bf-sentir-title">Aqui, sentir e compreender <em>caminham juntos.</em></h2><p>No Corpo Musical, você desenvolve conhecimentos e habilidades para transformar aquilo que escuta, compreende e sente em novas possibilidades de movimento.</p>
        <div className="bf-sentir-chips"><span><b>Compreensão</b><small>a técnica</small></span><i aria-hidden="true">+</i><span><b>Experiência</b><small>a sensibilidade</small></span></div>
        <p className="bf-sentir-forte">Porque não basta compreender a música. É preciso aprender a dançá-la.</p></div>
      <img src={trilhaFase2} alt="" loading="lazy" decoding="async" />
    </div>
    <div className="bf-transforma"><h3>Como o Corpo Musical transforma sua maneira de dançar?</h3><p className="bf-transforma-sub">Em vez de começar pelos passos, desenvolvemos as habilidades que permitem compreender a música e transformar o que você escuta em movimento.</p>
      <ul>{etapas.map(etapa => <li key={etapa.rotulo}><img src={etapa.foto} alt="" loading="lazy" decoding="async" /><div><small>{etapa.rotulo}</small><strong>{etapa.titulo}</strong><p>{etapa.texto}</p></div></li>)}</ul>
      <p className="bf-transforma-fim">O objetivo não é abandonar os passos. É deixar de depender exclusivamente deles para conseguir dançar.</p></div>
  </div></section>
}

function Comunidade() {
  const cards = [
    { rotulo: 'Fundamentos do método', titulo: 'Trilha de Aprendizagem', texto: 'Aulas gravadas organizadas nas seis fases do Corpo Musical para você desenvolver sua dança com profundidade e no seu ritmo.', itens: ['Compreenda a música e sua estrutura', 'Desenvolva recursos corporais e expressivos', 'Estude quando e quantas vezes quiser'], visual: 'modulos' },
    { rotulo: 'Prática + acompanhamento', titulo: 'Aulas Online ao Vivo', texto: 'Encontros semanais pelo Zoom para praticar, aprofundar e tirar dúvidas com a Chris, acompanhando sua evolução.', itens: ['Prática guiada em turma', 'Espaço para dúvidas e orientação', 'Gravações disponíveis para rever'], foto: encontrosAoVivo, contida: true },
    { rotulo: 'Aprofundamento presencial', titulo: 'MasterMove', texto: 'Acompanhe os encontros presenciais de aprofundamento por transmissão ao vivo ou gravação, mesmo à distância.', itens: ['Encontros presenciais realizados em São Paulo', 'Acesso online por transmissão', 'Gravações incluídas no plano'], foto: mastermoveNotebook, contida: true },
    { rotulo: 'Novos olhares sobre a dança', titulo: 'Aulas Temáticas', texto: 'Aprofunde assuntos específicos que ampliam sua compreensão sobre o corpo, a expressão, as relações e a vida.', itens: ['Temas especiais e aprofundamentos', 'Corpo, expressão, relação e vida', 'Novas perspectivas para sua dança'], visual: 'temas' },
    { rotulo: 'Troca + conexão', titulo: 'Comunidade no WhatsApp', texto: 'Um espaço de troca com quem está no mesmo caminho, para compartilhar descobertas, tirar dúvidas e seguir evoluindo junto.', itens: ['Troca de experiências', 'Perguntas e sugestões', 'Apoio ao longo da jornada'], visual: 'whatsapp' },
  ]
  return <section className="bf-comunidade" aria-labelledby="bf-comunidade-title"><div className="bf-comunidade-inner">
    <div className="bf-comunidade-intro"><strong>E como essa jornada acontece na prática?</strong><p>No Corpo Musical, você combina uma trilha de aprendizagem estruturada com encontros ao vivo, experiências de aprofundamento e uma comunidade para compartilhar sua evolução.</p><p><b>Diferentes formas de aprender, praticar e integrar os conhecimentos à sua dança.</b></p></div>
    <span className="bf-ofertas-eyebrow">Por dentro da comunidade</span>
    <h2 id="bf-comunidade-title">Diferentes formas de aprender. <em>Uma jornada para transformar sua dança.</em></h2>
    <div className="bf-comunidade-grid">{cards.map(card => <article key={card.titulo} className="bf-comunidade-card">
      <div className={`bf-comunidade-visual${card.contida ? ' bf-comunidade-visual--contida' : ''}`}>{card.foto && <img src={card.foto} alt="" loading="lazy" decoding="async" />}{card.visual === 'modulos' && <ModulosTrilha />}{card.visual === 'temas' && <AulasTematicas />}{card.visual === 'whatsapp' && <GrupoWhatsAppMini />}</div>
      <div className="bf-comunidade-corpo"><small>{card.rotulo}</small><h3>{card.titulo}</h3><p>{card.texto}</p><ul>{card.itens.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></div>
    </article>)}</div>
  </div></section>
}

const modulosTrilha = [
  ['Fase 1', 'Musicalização', 6],
  ['Fase 1', 'Musicalidade', 45],
  ['Fase 2', 'Percepção Corporal', 21],
  ['Fase 3', 'Movimento | A Expressão', 3],
  ['Fase 4', 'Consciência Relacional', 13],
]

function ModulosTrilha() {
  return <ul className="bf-modulos" aria-label="Módulos da trilha na plataforma">{modulosTrilha.map(([fase, nome]) => <li key={nome}><span className="bf-modulos-fase">{fase}</span><strong>{nome}</strong></li>)}</ul>
}

function GrupoWhatsAppMini() {
  return <div className="bf-wpp-mini"><img src={grupoAvatar} alt="" loading="lazy" decoding="async" /><div><strong>Online | Corpo Musical 💛</strong><small>Grupo na comunidade "Alunos | Corpo Musical" · 66 membros</small></div></div>
}

function Passos() {
  const passos = [
    ['Acesse a plataforma', 'Conheça a trilha e comece pelos fundamentos do método.', 'M3 5h18v11H3zM8 20h8M12 16v4'],
    ['Estude no seu ritmo', 'Acompanhe as aulas gravadas conforme a sua disponibilidade.', 'M3 5h18v14H3zM10 9l5 3-5 3z'],
    ['Participe dos encontros', 'Experimente na prática, tire dúvidas e aprofunde seus aprendizados nas aulas ao vivo.', 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3 3-5 6-5s6 2 6 5m-2-5c1-.6 2.4-1 4-1 3 0 6 2 6 5'],
  ]
  return <section className="bf-passos" aria-labelledby="bf-passos-title"><div className="bf-passos-inner">
    <span className="bf-ofertas-eyebrow">Na prática</span><h2 id="bf-passos-title">E como você começa?</h2><p>Um caminho simples, flexível e no seu ritmo:</p>
    <ol>{passos.map(([titulo, texto, icone], i) => <li key={titulo}><span className="bf-passos-numero">{i + 1}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icone} /></svg><strong>{titulo}</strong><p>{texto}</p></li>)}</ol>
  </div></section>
}

const paraQuem = [
  { titulo: 'Dançar com mais liberdade', texto: 'Deixar de depender exclusivamente de passos decorados e desenvolver a capacidade de fazer suas próprias escolhas durante a dança.', icone: 'M12 3c-3 4-7 6-7 11a7 7 0 0 0 14 0c0-5-4-7-7-11Zm0 18v-6m0 0-3-3m3 3 3-3' },
  { titulo: 'Compreender melhor a música', texto: 'Reconhecer o ritmo, as pausas, os instrumentos e as possibilidades que cada música oferece.', icone: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' },
  { titulo: 'Improvisar e criar', texto: 'Aprender a brincar com a música e explorar diferentes possibilidades de movimento, sem ficar preso às mesmas sequências.', icone: 'M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6' },
  { titulo: 'Desenvolver mais fluidez e expressão', texto: 'Movimentar-se com mais naturalidade, encontrando maneiras de expressar aquilo que escuta e sente.', icone: 'M2 12c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-3 5 0M2 17c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-3 5 0M2 7c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-3 5 0' },
  { titulo: 'Aproveitar e sentir mais cada dança', texto: 'Sentir-se mais seguro para experimentar, se conectar com a música e dialogar com o outro sem ficar o tempo todo preocupado em acertar.', icone: 'M12 20s-7-4.5-9-9a4.5 4.5 0 0 1 9-2 4.5 4.5 0 0 1 9 2c-2 4.5-9 9-9 9Z' },
]

function ParaQuem() {
  return <ul className="bf-paraquem">{paraQuem.map((item, i) => <li key={item.titulo}>
    <span className="bf-paraquem-icone" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={item.icone} /></svg></span>
    <div><strong><span>{String(i + 1).padStart(2, '0')}</span> {item.titulo}</strong><p>{item.texto}</p></div>
  </li>)}</ul>
}

const perguntas = [
  ['É possível aprender dança online de verdade?', ['Sim! E o formato online tem uma vantagem importante: podemos dedicar mais tempo ao desenvolvimento individual, algo que nem sempre recebe tanta atenção nas aulas presenciais de dança a dois.', 'No Corpo Musical, trabalhamos a compreensão da música, a percepção corporal e a expressividade para que você desenvolva seus próprios recursos, em vez de depender apenas da reprodução de movimentos.', 'Essa compreensão amplia suas possibilidades de escolha e autonomia na dança. E você ainda conta com aulas ao vivo, práticas orientadas e gravações para continuar experimentando.']],
  ['Preciso ter um par para participar?', ['Não! Você não precisa ter um par para participar do Corpo Musical.', 'Grande parte do nosso trabalho é dedicada ao desenvolvimento individual: musicalidade, percepção corporal, movimento, expressão e compreensão dos princípios da dança a dois.', 'E, quando entramos nos conteúdos da dança a dois, você também pode acompanhar as demonstrações e compreender os princípios da interação, desenvolvendo recursos para aplicar nas suas aulas, práticas e bailes.', 'Assim, você pode começar seu desenvolvimento agora, independentemente de ter um par fixo.']],
  ['Já faço aulas presenciais. O Corpo Musical vai acrescentar alguma coisa?', ['Essa é justamente uma das possibilidades mais interessantes do método!', 'O Corpo Musical não precisa substituir suas aulas presenciais. Ele desenvolve a compreensão musical, a percepção corporal e recursos de movimento que podem potencializar suas experiências nas aulas e nos bailes.', 'Assim, você começa a descobrir novas maneiras de utilizar os passos que já conhece, explorar possibilidades e se expressar durante a dança.']],
  ['O Corpo Musical é para qual nível de dança?', ['Nosso método não se organiza pela quantidade ou pela complexidade dos passos que você conhece.', 'Trabalhamos habilidades musicais, corporais, expressivas e relacionais que podem ser desenvolvidas e aprofundadas em diferentes momentos da sua jornada.', 'Por isso, tanto quem está começando quanto quem já dança há muitos anos pode encontrar conhecimentos e experiências relevantes para sua evolução.']],
  ['Nunca fiz aulas de dança. Posso participar?', ['Sim! Você também pode começar a desenvolver sua relação com a música e o movimento por esse caminho.', 'A proposta do Corpo Musical é construir fundamentos que não dependem de conhecer muitas sequências. Algumas aulas utilizam exemplos da dança a dois, mas você pode acompanhar as explicações, experimentar os exercícios individuais e desenvolver sua compreensão progressivamente.', 'O importante é estar aberto a aprender e explorar novas possibilidades.']],
  ['E se eu não tiver ritmo ou musicalidade?', ['Você não precisa chegar com essas habilidades desenvolvidas. Musicalidade não é apenas uma característica que algumas pessoas possuem: envolve habilidades que podem ser aprendidas e aprimoradas.', 'No Corpo Musical, você aprende a reconhecer o pulso, compreender elementos da estrutura musical e explorar maneiras de responder à música com seu corpo.', 'O caminho começa justamente pelo desenvolvimento dessas referências.']],
  ['Não tenho muito tempo. Vou conseguir acompanhar?', ['O Corpo Musical foi pensado para que você possa aprender respeitando sua rotina.', 'As aulas gravadas ficam disponíveis durante seu período de acesso, e os encontros ao vivo também podem ser assistidos depois.', 'Você não precisa estudar tudo de uma vez. Pode avançar gradualmente, experimentar os exercícios e voltar aos conteúdos quando precisar.', 'E tem algo importante: aprender a perceber a música e explorar movimentos também pode ser prazeroso. O estudo não precisa ser mais uma obrigação na sua semana — pode se tornar um momento seu de conexão com a música e com o corpo.']],
  ['Já comprei cursos e acabei deixando de lado. Por que agora seria diferente?', ['Essa é uma preocupação compreensível, principalmente quando temos tantas coisas acontecendo na rotina.', 'No Corpo Musical, você não recebe apenas uma biblioteca de aulas gravadas. Existe uma trilha de aprendizagem organizada, encontros semanais ao vivo e uma comunidade para compartilhar descobertas e dúvidas.', 'Esses recursos ajudam a manter o aprendizado presente na sua rotina. Além disso, os exercícios partem da música e do movimento, permitindo que o processo também seja uma experiência de prazer e descoberta.', 'A continuidade depende da sua participação, mas você não precisa percorrer esse caminho sozinho.']],
  ['Em quanto tempo vou começar a perceber resultados?', ['Algumas descobertas podem acontecer logo nas primeiras aulas, como se conectar de uma nova maneira com a música, compreender melhor sua estrutura e perceber novas possibilidades de movimento e expressão.', 'Outras transformações, como maior domínio técnico, organização corporal, fluidez e autonomia na dança, são construídas progressivamente, conforme sua disponibilidade para experimentar, praticar e integrar novos aprendizados.', 'Mais do que alcançar um resultado em determinado prazo, nossa proposta é que você desenvolva novas habilidades enquanto descobre o prazer de aprender, se movimentar e dançar.']],
  ['E se eu entrar e perceber que o Corpo Musical não é para mim? Qual é o risco do investimento?', ['Você tem até 7 dias após a contratação para conhecer a proposta e, caso perceba que ela não corresponde ao que buscava, solicitar o cancelamento com reembolso integral, conforme as condições aplicáveis.', 'Depois desse período, o cancelamento segue as regras do plano contratado.', 'Queremos que sua decisão seja feita com clareza, sabendo o que está adquirindo e tendo a oportunidade de conhecer a experiência.']],
  ['E se eu não conseguir participar dos encontros ao vivo?', ['Não tem problema! As aulas online semanais e as transmissões do MasterMove ficam disponíveis em gravação para você assistir ou rever conforme sua disponibilidade.', 'Nos planos Semestral Especial e Anual Especial, você tem acesso às gravações durante todo o período de vigência do seu plano, além da Trilha de Aprendizagem e dos demais conteúdos da comunidade.']],
  ['Sou professor de dança. O Corpo Musical também é para mim?', ['Sim! O Corpo Musical também pode enriquecer sua experiência como professor.', 'Nosso método oferece uma perspectiva diferente sobre o desenvolvimento musical, corporal, expressivo e relacional, ajudando você a aprofundar sua própria dança e ampliar sua compreensão sobre como essas habilidades são construídas.', 'Além de desenvolver novos recursos para dançar, você pode encontrar referências, reflexões e possibilidades para enriquecer suas aulas e a maneira como acompanha o aprendizado dos seus alunos.', 'Porque continuar aprendendo também faz parte de ensinar.']],
]

function Faq() {
  return <section className="bf-faq" aria-labelledby="bf-faq-title"><div className="bf-faq-inner"><span className="bf-eyebrow">Perguntas frequentes</span><h2 id="bf-faq-title">Ficou com <em>alguma dúvida?</em></h2>
    <div className="bf-faq-lista">{perguntas.map(([pergunta, resposta], i) => <details key={pergunta}><summary><span>{String(i + 1).padStart(2, '0')}</span>{pergunta}</summary><div>{resposta.map(p => <p key={p}>{p}</p>)}</div></details>)}</div>
  </div></section>
}

// Link da página de Termos de Uso. Enquanto estiver vazio, a caixinha de aceite não aparece.
const TERMOS_URL = ''

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
      // Salva o lead na planilha sem segurar o redirecionamento; o sendBeacon sobrevive à troca de página.
      try {
        const lead = new Blob([JSON.stringify({ id: id.current, nome: form.get('nome'), telefone: normalizarTelefone(telefone), plano: 'blackmusical_' + escolha.plano + (data.elegivel ? '_aluno' : '') })], { type: 'application/json' })
        if (!navigator.sendBeacon?.('/api/leads-assinatura', lead)) fetch('/api/leads-assinatura', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: lead, keepalive: true }).catch(() => {})
      } catch { /* Não bloquear o pagamento. */ }
      try { window.fbq?.('track', 'Lead', { content_name: `Black Musical - ${escolha.plano}`, content_category: data.elegivel ? 'aluno' : 'novo_aluno' }) } catch { /* Não bloquear pagamento por falha no pixel. */ }
      window.location.assign(destination.href)
    } catch (error) { setErro(error.name === 'TimeoutError' ? 'O envio demorou mais que o esperado. Tente novamente.' : error.message) }
    finally { enviando.current = false; setOcupado(false) }
  }
  return <dialog className="bf-dialog" ref={dialog} aria-labelledby="bf-dialog-title" onCancel={event => { if (ocupado) event.preventDefault(); else onClose() }}>
    <button className="bf-close" onClick={onClose} disabled={ocupado} aria-label="Fechar">×</button>
    <span className="bf-eyebrow">{aluno ? 'Já sou aluno ou ex-aluno' : escolha.plano === 'anual' ? 'Anual especial · 15 meses de acesso' : 'Semestral especial · 6 meses de acesso'}</span>
    <h2 id="bf-dialog-title">{aluno ? 'Sua condição para ampliar o acesso' : 'Sua próxima dança começa aqui.'}</h2>
    <p>{aluno ? 'Use seu e-mail de cadastro para validar sua condição de aluno ou ex-aluno.' : 'Deixe seu nome e WhatsApp para seguir ao pagamento.'}</p>
    <form onSubmitCapture={enviar} aria-busy={ocupado}>
      <label>Nome<input name="nome" autoComplete="name" required minLength={2} maxLength={100} disabled={ocupado} /></label>
      {aluno && <label>E-mail de aluno<input name="email" type="email" autoComplete="email" required maxLength={254} disabled={ocupado} /></label>}
      <label>WhatsApp com DDD<input name="telefone" type="tel" autoComplete="tel" required placeholder="(11) 99999-9999" value={telefone} onChange={e => setTelefone(formatarTelefone(e.target.value))} disabled={ocupado} /></label>
      <small>Nossa equipe poderá entrar em contato por telefone ou WhatsApp sobre sua inscrição.</small>
      {TERMOS_URL && <label className="bf-termos"><input type="checkbox" name="termos" required disabled={ocupado} /><span>Li e concordo com os <a href={TERMOS_URL} target="_blank" rel="noopener noreferrer">Termos de Uso</a>.</span></label>}
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
    for (const playerId of ['6af4d1a9aafdc81a284bc770', ...videosDepoimento.map(video => video.id)]) {
      const src = vturbScript(playerId)
      if (!document.querySelector(`script[src="${src}"]`)) { const script = document.createElement('script'); script.src = src; script.async = true; document.head.appendChild(script) }
    }
    const resize = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', resize)
    return () => { document.title = old; window.removeEventListener('resize', resize) }
  }, [])
  return <main className="bf-page">
    <section className="bf-hero" id="inicio" style={{ backgroundImage: `linear-gradient(180deg, rgba(241,235,226,.9), rgba(241,235,226,.72) 45%, #f1ebe2), url(${fundoHero})` }}>
      <div className="bf-hero-copy"><span className="bf-eyebrow">Black Musical · com Chris Busato</span><h1>Black <em>Musical.</em></h1><div className="bf-vsl"><vturb-smartplayer id="vid-6af4d1a9aafdc81a284bc770" style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}><div className="vturb-player-placeholder" style={{ position: 'relative', width: '100%', padding: '177.77777777777777% 0 0', zIndex: 0, backgroundColor: 'black' }}></div></vturb-smartplayer></div><a className="bf-button" href="#dentro">Quero fazer parte →</a><small>Uma jornada para dançar além dos passos.</small></div>

    </section>
    <section className="bf-story bf-story-intro"><div className="bf-story-inner"><span className="bf-eyebrow">Black Musical</span><h2>A dança é muito mais do que aprender passos.<br /><em className="bf-em-forte">Ela é sobre sentir e saber expressar.</em></h2><div className="bf-story-copy"><h3 className="bf-story-lead">Uma nova relação com a dança começa pela música e pela compreensão da sua estrutura.</h3><p><strong>Você não precisa acumular mais passos e sequências para conseguir improvisar, brincar com a música e desenvolver uma dança mais fluida.</strong></p><p>No Corpo Musical, você aprende a compreender a música e a desenvolver recursos próprios para construir uma dança mais livre, expressiva e musical.</p><p className="bf-story-emphasis"><strong>Um caminho que parte da música, e não dos passos.</strong></p><a className="bf-button" href="#ofertas">Quero fazer parte</a></div></div></section>
    <section className="bf-story bf-story-question"><div className="bf-story-inner"><h2>Aprender mais passos não necessariamente vai te levar a uma <em>dança mais musical.</em></h2><div className="bf-story-copy"><h3>Você já sentiu que...</h3><ul><li>Conhece vários passos, mas acaba repetindo sempre as mesmas sequências?</li><li>Tem dificuldade para acompanhar a música e perceber o momento certo de se movimentar?</li><li>Gostaria de improvisar e brincar com a música, mas não sabe por onde começar?</li><li>Fica tão preocupado em acertar que acaba deixando de aproveitar a dança?</li><li>Sente que depende dos passos ou da outra pessoa para conseguir continuar dançando?</li></ul><p><strong>Aprender mais passos não significa, necessariamente, desenvolver uma dança mais musical.</strong></p><p>Existe uma diferença entre saber reproduzir movimentos e compreender a música para encontrar suas próprias possibilidades de movimento.</p></div></div></section>
    <section className="bf-story bf-story-for"><div className="bf-story-inner"><h2>O Corpo Musical não é para quem deseja apenas copiar e executar passos.<em>É para quem quer compreender a linguagem da dança e desenvolver recursos próprios para se movimentar com mais liberdade.</em></h2><div className="bf-story-copy"><h3>É para você que deseja:</h3><ParaQuem /></div></div></section>
    <section className="bf-base" aria-labelledby="bf-base-title"><div className="bf-base-inner">
      <p className="bf-base-pergunta">Mas como desenvolver tudo isso sem depender de aprender cada vez mais passos?</p>
      <h2 id="bf-base-title">O caminho começa pelo desenvolvimento da sua <em>Base Musical.</em></h2>
      <div className="bf-base-card">
        <span className="bf-eyebrow">O que está faltando na sua dança?</span>
        <h3>Talvez não sejam mais passos. Talvez seja uma Base Musical.</h3>
        {imagemBanda && <img className="bf-base-foto" src={imagemBanda} alt="Músicos tocando juntos" loading="lazy" decoding="async" />}
        <blockquote><span aria-hidden="true">“</span><strong>Imagine uma banda.</strong><p>A bateria, o baixo, o piano e a guitarra não precisam tocar a mesma coisa.</p><p>Cada instrumento tem sua própria voz.</p><p>Mas todos compartilham uma linguagem que permite criar, improvisar e tocar juntos.</p></blockquote>
        <p className="bf-base-virada">E por que na dança seria diferente?</p>
        <div className="bf-base-destaque"><strong>É aqui que entra a Base Musical.</strong><p>Aprender a reconhecer a estrutura da música para saber onde você está e descobrir o que pode fazer com ela.</p></div>
      </div>
    </div></section>
    <Secao5 />
    <section className="bf-content-section bf-mapa" id="dentro"><span className="bf-eyebrow">O Mapa da Dança</span><h2>E como você desenvolve <em>essas habilidades?</em></h2><p>Através do <strong>Mapa da Dança</strong>, uma jornada de aprendizagem estruturada em seis fases que começa pela música e amplia progressivamente suas possibilidades de movimento, expressão e conexão.</p><TrilhaFases /></section>
    <Comunidade />
    <Passos />
    <Depoimentos />
    <section className="bf-ponte"><div className="bf-ponte-inner"><h2>Sua dança também pode <em>começar a mudar.</em></h2><p>Se você deseja ir além da repetição de passos e desenvolver uma dança mais livre, fluida e musical, a Black Musical é uma oportunidade especial para começar essa jornada.</p><p><strong>Conheça as condições especiais para fazer parte da Comunidade Corpo Musical.</strong></p></div></section>
    <section className="bf-ofertas" id="ofertas" aria-labelledby="bf-offers-title">
      <div className="bf-ofertas-head"><span className="bf-ofertas-eyebrow">Condições especiais da Black Musical</span><h2 id="bf-offers-title">Todos os benefícios do Corpo Musical.<em>Escolha o tempo da sua jornada.</em></h2><p>Na Black Musical, você tem duas condições especiais para fazer parte da Comunidade Corpo Musical.</p></div>
      <div className="bf-ofertas-grid">{['semestral', 'anual'].map(plano => <div key={plano} className="bf-ofertas-coluna">
        <article className={`bf-oferta${plano === 'anual' ? ' bf-oferta--anual' : ''}`}>
          {plano === 'anual' && <><span className="bf-oferta-badge">Mais escolhido</span><span className="bf-oferta-selo" aria-hidden="true"><b>+3</b>meses<br />gratuitos</span></>}
          <h3>Plano {plano === 'anual' ? 'Anual' : 'Semestral'} Especial</h3>
          <div className="bf-oferta-preco"><span>R$</span>97<small>/mês</small></div>
          {plano === 'anual' ? <div className="bf-oferta-duracao bf-oferta-duracao--anual"><strong>15 meses de acesso no total</strong><small>12 meses + 3 meses de bônus</small></div> : <div className="bf-oferta-duracao"><strong>6 meses de acesso</strong></div>}
          <p className="bf-oferta-resumo">{plano === 'anual' ? 'Mais tempo para aprofundar, praticar e integrar sua dança.' : 'Acesso completo à experiência do Corpo Musical, por 6 meses.'}</p>
          <ul>{beneficiosOferta.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
          <button className="bf-oferta-botao" onClick={() => setEscolha({ plano, aluno: false })}>{plano === 'anual' ? 'Quero garantir meus 15 meses' : 'Quero fazer parte'}</button>
          <p className="bf-oferta-nota">Condição especial para alunos e ex-alunos do Corpo Musical.</p>
        </article>
        <aside className="bf-aluno-box" aria-label={`Condição de aluno — plano ${plano}`}>
          <span>Já é aluno ou ex-aluno?</span>
          <strong>Temos uma condição especial para você.</strong>
          <button onClick={() => setEscolha({ plano, aluno: true })}>Quero minha condição de aluno <span aria-hidden="true">→</span></button>
          <small>Valide seu e-mail de aluno para continuar.</small>
        </aside>
      </div>)}</div>
      <p className="bf-ofertas-rodape">Com o Plano Semestral Especial, você tem 6 meses de acesso a toda a trilha de aprendizagem, aos encontros ao vivo, aos conteúdos e aos benefícios do Corpo Musical. Com o Plano Anual Especial, você garante 12 meses de acesso e ganha mais 3 meses gratuitos de bônus, totalizando 15 meses para aprofundar seu aprendizado e desenvolver sua dança.</p>
    </section>
    <Faq />
    <section className="bf-final bf-closing"><div className="bf-closing-inner"><h2>Sua dança pode ser mais <em>verdadeira, fluida e musical.</em></h2><p>Você não precisa continuar dependendo dos mesmos passos para conseguir aproveitar a música.</p><p><strong>Desenvolva sua Base Musical e descubra novas possibilidades de improvisar, criar e se expressar na dança.</strong></p><p>Aproveite as condições especiais da Black Musical para começar essa jornada no Corpo Musical.</p><a className="bf-button" href="#ofertas">Quero fazer parte do Corpo Musical</a></div></section>
    <footer className="bf-footer">Comunidade Corpo Musical · Chris Busato</footer>
    {escolha && <Compra escolha={escolha} onClose={() => setEscolha(null)} />}
  </main>
}
