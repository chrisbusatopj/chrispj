# Black Musical: abertura externa pausada

Em 29/10/2026 o fluxo intermediario foi removido a pedido do usuario.
A rota /blackmusical mostra a campanha diretamente em qualquer navegador.
O CTA usa o link HTTPS https://chat.whatsapp.com/JAUoLO33t1t4VnjHUsxeFb sem bloqueio por user agent.
O parametro antigo bm_browser nao interfere mais na pagina.

## Fluxo anterior
Commit 2966005 preserva a implementacao: tela escura com foto desfocada e Toque para continuar; deteccao de navegador interno; Android intent para Chrome; instrucoes e copia do link no iPhone. A URL de destino mantinha os parametros da campanha e adicionava bm_browser=1.

## Para retomar
Nao prometer abertura externa forcada: o aplicativo de origem pode bloquear a solicitacao. Validar em aparelhos reais, Instagram Android e iOS, com e sem Chrome, antes de publicar. Nao bloquear o acesso ao grupo caso a abertura externa falhe.
