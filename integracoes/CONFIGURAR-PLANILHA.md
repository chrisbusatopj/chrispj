# Contatos da Comunidade Corpo Musical

O visitante escolhe um plano, informa nome e telefone e vê um aviso sobre o contato da equipe. O site confirma o registro na aba Leads e abre o checkout Cakto correspondente. A planilha registra interesse, não confirmação de compra.

## 1. Criar a planilha

A aba Leads já foi criada na planilha informada. Use o ID `1TG5PVaKtIYmJxz5XJCvZQpiAA9nKoat6fn7RPUImNwY`. Compartilhe somente com pessoas autorizadas. Não publique a planilha na internet.

Copie seu ID: é a parte entre `/d/` e `/edit` na URL.

## 2. Instalar o código

Na planilha, abra **Extensões → Apps Script**. Substitua o conteúdo de Código.gs pelo arquivo `integracoes/leads-google.gs` deste projeto e salve.

Em **Configurações do projeto → Propriedades do script**, adicione:

| Propriedade | Valor |
| --- | --- |
| PLANILHA_ID | O ID da planilha |

Configure o fuso horário do projeto e da planilha para São Paulo.

## 3. Publicar o receptor

Clique **Implantar → Nova implantação → Aplicativo da Web**:

- Executar como: **Eu**.
- Quem pode acessar: **Qualquer pessoa**.

Autorize com a conta proprietária da planilha e copie a URL terminada em `/exec`. O receptor aceita envios sem senha; a planilha permanece privada. Se sua organização não permitir acesso público ao aplicativo, será necessária outra integração.

## 4. Conectar à Vercel

A URL validada já está configurada no servidor em `server/leads-assinatura.js`; não é obrigatório cadastrar variável na Vercel. A rota `/api/leads-assinatura` compartilha a função de assinatura para manter o projeto em 12 funções. Para substituir essa URL futuramente, abra **Settings → Environment Variables** e cadastre:

| Variável | Valor |
| --- | --- |
| LEADS_GOOGLE_SCRIPT_URL | URL do aplicativo terminada em /exec |

Use o nome exato da variável, sem prefixo VITE_. Publique o código atualizado e faça um novo deploy depois de adicioná-la.

Para testar no localhost, coloque essa mesma variável em `.env.local` na raiz do projeto e reinicie `npm run dev`. Esse arquivo é ignorado pelo Git.

## 5. Testar

Abra `/online#planos`, escolha cada plano e preencha um contato de teste. Confira a nova linha na aba **Leads** e o redirecionamento ao checkout correto. Não precisa comprar para testar. A equipe pode marcar a caixa da última coluna, “Já entrou em contato?”, após falar com a pessoa. Cada novo contato chega com a caixa desmarcada.

Se o receptor ficar indisponível, o formulário apresenta erro e não avança. Falhas de envio preservam os campos para tentar novamente.

Se alterar o Apps Script depois: **Implantar → Gerenciar implantações → Editar → Nova versão → Implantar**, mantendo a mesma URL.

Documentação: https://developers.google.com/apps-script/guides/web
