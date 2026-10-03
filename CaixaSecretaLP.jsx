import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import chris from './images/chris-sorrindo.jpg'
import './caixa-secreta.css'

// Preencher com o checkout do conjunto; não reutilizar o link de uma aula avulsa.
const CHECKOUT_CAIXA = ''

const aulas = [
  { numero: '01', nome: 'Vergonha', verbo: 'Destrave-se.', resumo: 'Sua relação com o julgamento.', texto: 'Supere a autocensura e explore uma dança em que o olhar dos outros não determine tanto o que você se permite fazer.', preco: 120, classe: 'vergonha' },
  { numero: '02', nome: 'Do Erro à Possibilidade', verbo: 'Experimente.', resumo: 'Sua liberdade para tentar.', texto: 'Deixe de repetir apenas o que já domina e descubra novas possibilidades ao se permitir tentar.', preco: 297, classe: 'erro' },
  { numero: '03', nome: 'Expressividade', verbo: 'Expresse-se.', resumo: 'Seu jeito de dançar.', texto: 'Explore a música, coloque intenção nos movimentos e descubra maneiras próprias de dançar.', preco: 67, classe: 'expressividade' },
]

const perguntas = [
  ['Preciso ser avançado na dança para aproveitar as aulas?', 'Não. As aulas abordam dimensões da experiência de dançar que vão além do domínio de passos: sua relação com a vergonha, com o erro e com a expressividade.'],
  ['As três mega-aulas são diferentes?', 'Sim. Cada uma tem um tema e uma entrega própria. Vergonha trabalha sua relação com o julgamento; Do Erro à Possibilidade aborda a experimentação; e Expressividade explora interpretação musical e expressão pessoal.'],
  ['Preciso assistir às três em sequência?', 'Não. São três mega-aulas independentes. Você pode aprofundar cada tema individualmente.'],
  ['As aulas substituem a vivência Brincando na Música?', 'Não. Elas são complementares. A vivência proporciona uma experiência com a música e a dança; as mega-aulas aprofundam dimensões da sua relação com essa experiência.'],
  ['Quanto conteúdo está incluído?', 'São aproximadamente 9 horas de conteúdo, divididas em três mega-aulas de aproximadamente 3 horas cada.'],
  ['Quanto custa acessar as três aulas?', 'O valor individual de referência das três entregas soma R$ 484. Nesta oferta, você pode acessar o conjunto por R$ 197.'],
  ['Como faço para garantir minha Caixa Secreta?', 'Clique no botão da oferta para dar início à sua compra.'],
]

function BotaoCompra({ id }) {
  if (CHECKOUT_CAIXA) return <a className="caixa-cta" href={CHECKOUT_CAIXA}>Quero minha Caixa Secreta <span aria-hidden="true">↗</span></a>
  return <div className="caixa-checkout-pendente">
    <button className="caixa-cta" disabled aria-describedby={id}>Quero minha Caixa Secreta <span aria-hidden="true">↗</span></button>
    <p id={id}>Compra disponível em breve.</p>
  </div>
}

function ColecaoVisual() {
  return <div className="caixa-colecao" aria-label="Coleção digital com três mega-aulas: Vergonha, Do Erro à Possibilidade e Expressividade">
    <div className="caixa-orbita" aria-hidden="true" />
    {aulas.map(aula => <div key={aula.numero} className={`caixa-capa caixa-capa-${aula.classe}`} aria-hidden="true">
      <span className="caixa-capa-topo">Caixa Secreta <span>{aula.numero} / 03</span></span>
      <div className={`caixa-desenho caixa-desenho-${aula.classe}`}><i /><i /><i /></div>
      <span className="caixa-capa-nome">{aula.nome}</span>
      <span className="caixa-capa-rodape">{aula.verbo} <span>Chris Busato</span></span>
    </div>)}
    <span className="caixa-colecao-legenda">Três experiências. Mais possibilidades.</span>
  </div>
}

function AulasNaOferta() {
  const ref = useRef(null)
  const [visivel, setVisivel] = useState(false)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setVisivel(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisivel(true); observer.disconnect() }
    }, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className="caixa-itens-oferta" data-visivel={visivel}>
    <p className="caixa-explorar">Explore o que vem na sua caixa</p>
    {aulas.map((aula, i) => <details className="caixa-oferta-aula" name="caixa-conteudos" key={aula.numero} style={{ '--ordem': i }}>
      <summary>
        <span className="caixa-oferta-numero" aria-hidden="true">{aula.numero}</span>
        <span className="caixa-oferta-nome"><small>{aula.verbo}</small><strong>{aula.nome}</strong></span>
        <span className="caixa-oferta-valor"><small>Individual</small>R$ {aula.preco}</span>
        <span className="caixa-oferta-abrir" aria-hidden="true">+</span>
      </summary>
      <div className="caixa-oferta-detalhe"><p>{aula.texto}</p><span>Mega-aula independente · aproximadamente 3 horas</span></div>
    </details>)}
    <div className="caixa-total"><span>As três, separadamente</span><strong>R$ 484</strong></div>
  </div>
}

export default function CaixaSecretaLP() {
  useEffect(() => {
    const tituloAnterior = document.title
    document.title = 'Caixa Secreta da Dança Livre | Chris Busato'
    const fonte = document.createElement('link')
    fonte.rel = 'stylesheet'
    fonte.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=League+Spartan:wght@700;800&display=swap'
    document.head.appendChild(fonte)
    return () => { document.title = tituloAnterior; fonte.remove() }
  }, [])

  return <div className="caixa-page">
    <a className="caixa-skip" href="#caixa-conteudo">Pular para o conteúdo</a>
    <header className="caixa-header caixa-container">
      <span className="caixa-marca">Chris Busato<span>Brincando na Música</span></span>
      <a href="#caixa-continuar">Seguir para meu ingresso <span aria-hidden="true">↗</span></a>
    </header>

    <main id="caixa-conteudo">
      <section className="caixa-hero caixa-container" aria-labelledby="caixa-titulo">
        <div className="caixa-hero-texto">
          <p className="caixa-eyebrow">Um convite para ir além da vivência</p>
          <h1 id="caixa-titulo">Caixa Secreta<br />da <em>Dança Livre.</em></h1>
          <p className="caixa-hero-subtitulo">3 mega-aulas para destravar, experimentar e expressar uma dança mais sua.</p>
          <a className="caixa-cta" href="#caixa-oferta">Quero minha Caixa Secreta <span aria-hidden="true">↗</span></a>
          <p className="caixa-hero-nota">Um aprofundamento opcional para sua dança.</p>
        </div>
        <ColecaoVisual />
      </section>

      <div className="caixa-ficha">
        <div className="caixa-container">
          <p><strong>03</strong><span>mega-aulas independentes</span></p>
          <p><strong>~3h</strong><span>para aprofundar cada tema</span></p>
          <p><strong>~9h</strong><span>de conteúdo no conjunto</span></p>
        </div>
      </div>

      <section className="caixa-intro caixa-container">
        <p className="caixa-eyebrow">O que existe além dos passos</p>
        <div>
          <h2>Você pode saber dançar.<br />E ainda <em>se guardar.</em></h2>
          <p>Você pode saber dançar e ainda se esconder por vergonha, evitar movimentos por medo de errar ou sentir que falta algo próprio na sua expressão.</p>
          <p>Reunimos três experiências para ampliar essas possibilidades.</p>
        </div>
      </section>

      <section className="caixa-aulas caixa-container" aria-labelledby="caixa-aulas-titulo">
        <div className="caixa-titulo-linha"><h2 id="caixa-aulas-titulo">Abra espaço para uma dança <em>mais sua.</em></h2><span>Dentro da sua Caixa Secreta</span></div>
        {aulas.map(aula => <article className={`caixa-aula caixa-aula-${aula.classe}`} key={aula.numero}>
          <span className="caixa-aula-numero">{aula.numero}</span>
          <div className="caixa-aula-nome"><p className="caixa-eyebrow">{aula.nome}</p><h3>{aula.verbo}</h3></div>
          <div className="caixa-aula-texto"><p>{aula.texto}</p><span>Mega-aula independente · aproximadamente 3 horas</span></div>
        </article>)}
      </section>

      <section className="caixa-conexao caixa-container">
        <p className="caixa-eyebrow">Diferentes. Complementares.</p>
        <h2>O que você se permite{' '}<br /><em>mostrar, tentar e expressar.</em></h2>
        <p>Isso pode transformar sua experiência na dança. Uma aula trabalha sua relação com o julgamento. Outra amplia sua liberdade para experimentar. A terceira desenvolve sua expressividade.</p>
        <p>Três entregas diferentes, que se complementam para você aproveitar mais possibilidades na dança.</p>
      </section>

      <section className="caixa-oferta" id="caixa-oferta" aria-labelledby="caixa-oferta-titulo">
        <div className="caixa-container caixa-oferta-grid">
          <div>
            <p className="caixa-eyebrow">Sua Caixa Secreta inclui</p>
            <h2 id="caixa-oferta-titulo">Destravar. Experimentar.<br /><em>Se expressar.</em></h2>
            <AulasNaOferta />
          </div>
          <div className="caixa-compra">
            <span className="caixa-economia">Você economiza R$ 287</span>
            <p className="caixa-de">De <s>R$ 484</s> pelas três</p>
            <p className="caixa-preco"><span>R$</span>197</p>
            <p className="caixa-compra-descricao">Hoje, leve as três mega-aulas.<br />Aproximadamente 9 horas de conteúdo.</p>
            <BotaoCompra id="caixa-checkout-oferta" />
            <p className="caixa-compra-nota">Uma oferta complementar à vivência Brincando na Música.</p>
          </div>
        </div>
      </section>

      {/* As provas visuais serão acrescentadas aqui quando forem fornecidas. */}
      <section className="caixa-sobre caixa-container" aria-labelledby="caixa-sobre-titulo">
        <figure><img src={chris} alt="Chris Busato" loading="lazy" width="1600" height="2400" /><figcaption>Escuta, presença e movimento.</figcaption></figure>
        <div>
          <p className="caixa-eyebrow">Quem conduz essa experiência</p>
          <h2 id="caixa-sobre-titulo">Quem é<br /><em>Chris Busato?</em></h2>
          <p>Chris Busato dedica sua trajetória à dança e ao desenvolvimento de uma relação mais musical, expressiva e autêntica com o movimento.</p>
          <p>Com mais de 17 anos de experiência na dança, seu trabalho vai além de ensinar passos: busca ampliar a maneira como cada pessoa se relaciona com a música, com o próprio corpo e com quem dança.</p>
          <p>Na Caixa Secreta, Chris reúne três aprofundamentos que refletem essa proposta: destravar a expressão, abrir espaço para experimentar e descobrir novas possibilidades de se expressar dançando.</p>
        </div>
      </section>

      <section className="caixa-faq caixa-container" aria-labelledby="caixa-faq-titulo">
        <div><p className="caixa-eyebrow">Antes de abrir sua caixa</p><h2 id="caixa-faq-titulo">Dúvidas{' '}<br /><em>frequentes.</em></h2></div>
        <div className="caixa-perguntas">{perguntas.map(([pergunta, resposta]) => <details key={pergunta}><summary>{pergunta}<span aria-hidden="true">+</span></summary><p>{resposta}</p></details>)}</div>
      </section>

      <section className="caixa-final caixa-container">
        <p className="caixa-eyebrow">Destrave-se. Experimente. Expresse-se.</p>
        <h2>Uma dança mais sua<br /><em>tem espaço para acontecer.</em></h2>
        <p>As três mega-aulas por <strong>R$ 197.</strong></p>
        <BotaoCompra id="caixa-checkout-final" />
      </section>
    </main>

    <footer className="caixa-footer" id="caixa-continuar">
      <div className="caixa-container">
        <span className="caixa-marca">Chris Busato<span>Caixa Secreta da Dança Livre</span></span>
        <div><p>Quer seguir com o ingresso que já comprou?</p><nav aria-label="Orientações do ingresso"><Link to="/ad2">Meu ingresso online ↗</Link><Link to="/ad1">Meu ingresso presencial ↗</Link></nav></div>
        <small>© {new Date().getFullYear()} Chris Busato</small>
      </div>
    </footer>
  </div>
}
