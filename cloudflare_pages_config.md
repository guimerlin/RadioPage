# Configurações para Deploy no Cloudflare Pages

Para fazer o deploy do seu projeto `RadioPage` no Cloudflare Pages, siga as instruções abaixo:

## 1. Conectar o Repositório GitHub

No painel do Cloudflare Pages, conecte seu repositório GitHub (`guimerlin/RadioPage`).

## 2. Configurações de Build

Ao configurar o projeto no Cloudflare Pages, utilize as seguintes configurações:

*   **Framework preset:** `Next.js`
*   **Build command:** `npx @cloudflare/next-on-pages`
*   **Build output directory:** `.vercel/output/static`

## 3. Variáveis de Ambiente (Opcional, mas recomendado)

Para garantir a compatibilidade e evitar problemas de build, você pode adicionar a seguinte variável de ambiente:

*   **NODE_VERSION:** `20` (ou a versão mais recente do Node.js suportada pelo Cloudflare Pages e pelo seu projeto)

## 4. Observações Importantes

*   O arquivo `next.config.mjs` já contém a configuração `config.cache = false;` para desativar o cache do Webpack, o que deve resolver o problema de arquivos grandes que você mencionou.
*   O script `build` no seu `package.json` foi atualizado para `"build": "next build && next-on-pages"`, garantindo que o `@cloudflare/next-on-pages` seja executado após o build do Next.js.

Com essas configurações, seu projeto deve ser implantado com sucesso no Cloudflare Pages.


