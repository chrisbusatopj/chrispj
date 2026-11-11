# Black Musical — /black2

A /blackmusical mantém a página do grupo WhatsApp. A /black2 apresenta a oferta, os três blocos de argumentos, módulos e Mapa da Dança reutilizados, depoimentos da Vivência e fechamento.

## Planos e checkouts

| Plano | Padrão | Aluno (30% OFF) |
|---|---|---|
| Semestral, 6 meses | R$582 — https://pay.cakto.com.br/umehfhs | R$407,40 — https://pay.cakto.com.br/3ehqxnn |
| Anual, 12 + 3 meses bônus | R$1.164 — https://pay.cakto.com.br/pj42tqs | R$814,80 — https://pay.cakto.com.br/3ag5fxx |

Os valores mensais de R$97 e R$67,90 são equivalências dos totais em 6 ou 12 meses, não promessas de parcelas sem juros. O checkout calcula o parcelamento. As condições anteriores de R$697 e 12x R$67 foram removidas.

Os links são configurados no servidor. Overrides opcionais: BLACKMUSICAL_CHECKOUT_SEMESTRAL_PADRAO, BLACKMUSICAL_CHECKOUT_SEMESTRAL_ALUNO, BLACKMUSICAL_CHECKOUT_ANUAL_PADRAO e BLACKMUSICAL_CHECKOUT_ANUAL_ALUNO.

## Elegibilidade e envio

server/blackmusical-alunos.js contém 44 e-mails únicos de 46 vendas paid com Valor Pago pelo Cliente >= R$500, importadas de orders_report (4).csv em 10/11/2026. Critério por compra, incluindo juros, sem somar compras. E-mails em minúsculas, sem corrigir possíveis erros de digitação. Lista não importada no frontend. BLACKMUSICAL_ALUNOS_EMAILS, se definida, substitui a lista.

Aluno informa nome, e-mail e telefone. Servidor verifica elegibilidade e escolhe o checkout. E-mail não encontrado permite continuar explicitamente na oferta padrão do mesmo plano. A lista é uma checagem de elegibilidade, não comprovação de posse do e-mail; o checkout pode ser compartilhado.

Contato salvo na integração existente da planilha com categoria online (compatibilidade com Apps Script publicado). E-mail e campanha ainda não são registrados na planilha. Após confirmação, evento Lead e redirecionamento com UTMs. Lead significa formulário salvo, não compra nem entrada em grupo.

## Verificação

node outputs/test-blackmusical.mjs testa os quatro links, lista importada, telefone e erros usando mock da planilha. npm run build valida a compilação. Nenhuma compra de teste foi feita.
