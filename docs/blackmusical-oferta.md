# Black Musical / Dance Friday

A rota /black2 apresenta semestral (6 meses, R$582) e anual (12 meses, R$1.164 + 3 meses extras), ambos a R$97/mês equivalente. Os 30% para alunos precisam estar configurados nos próprios checkouts; o site não altera o preço cobrado pela Cakto.

## Configuração pendente

Definir no servidor (Vercel e .env.local para desenvolvimento), nunca com prefixo VITE_:

- BLACKMUSICAL_ALUNOS_EMAILS: e-mails separados por vírgula, ponto e vírgula ou quebra de linha.
- BLACKMUSICAL_CHECKOUT_SEMESTRAL_PADRAO
- BLACKMUSICAL_CHECKOUT_ANUAL_PADRAO
- BLACKMUSICAL_CHECKOUT_SEMESTRAL_ALUNO
- BLACKMUSICAL_CHECKOUT_ANUAL_ALUNO

URLs devem ser HTTPS no domínio pay.cakto.com.br. Sem configuração, o formulário informa indisponibilidade, sem criar contato nem abrir checkout antigo. Reiniciar Vite após alterar .env.local; publicar novo deploy após configurar Vercel.

## Fluxo

Não aluno informa nome/telefone. Aluno informa também e-mail; servidor compara em minúsculas com a lista privada. E-mail não encontrado permite continuar explicitamente com a oferta padrão, mantendo nome/telefone. Lista não configurada não é tratada como e-mail inelegível.

O contato é salvo pela integração existente em Leads, com categoria `online` para compatibilidade com o Apps Script já publicado. Ela ainda não registra plano semestral/anual, campanha nem e-mail. Não é necessário trocar o script para este fluxo.

Após salvamento confirmado, registra evento Lead e redireciona com UTMs. Lead significa formulário salvo, não compra nem entrada em grupo. A lista de e-mails restringe elegibilidade, mas não comprova identidade ou posse do e-mail. O checkout de desconto também pode ser compartilhado: se for necessária restrição forte, usar verificação de e-mail e controles no provedor do checkout.

## Reuso

MapaDaDanca e ModulosGravados são exportados de PropostaLP e reutilizados aqui, com imagens, tipografia e paleta da /corpomusical. O conteúdo das outras rotas foi preservado. A rota /blackmusical mantém a página do grupo de WhatsApp e o contador originais.
