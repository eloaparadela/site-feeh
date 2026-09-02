# Guia do Projeto — Prosat Site

Site institucional da **Prosat — Sistema de Rastreamento Veicular**, desenvolvido em Next.js + Tailwind CSS.

---

## Estrutura geral

```
site-feeh-main/
├── data/siteData.ts          ← ARQUIVO CENTRAL — edite tudo aqui (textos, preços, imagens, páginas)
├── app/                      ← Rotas (Next.js App Router) — 1 pasta por página, sem lógica/texto solto
│   ├── page.tsx              ← Homepage
│   ├── o-grupo-tracker/
│   ├── como-podemos-ajudar/
│   ├── seja-parceiro/
│   ├── contato/
│   └── instalacao/caminhao|utilitario|carro-leve|moto/  ← todas puxam de installationPages no siteData
├── components/
│   ├── layout/                ← Header, Footer, menu mobile
│   ├── sections/               ← Blocos da Home (Hero, Frota, Preços...) e o layout das páginas de instalação
│   ├── modals/                 ← Popups (saída, orçamento)
│   ├── providers/               ← Tema claro/escuro
│   └── ui/                      ← Botões, imagem inteligente, ícones
├── public/images/              ← Fotos do site (ver seção "Imagens" abaixo)
└── .github/workflows/           ← Deploy automático GitHub Pages
```

**Regra de ouro:** para mudar texto, preço, link ou imagem, você só precisa mexer em `data/siteData.ts`.
Nenhuma página em `app/` deveria ter texto de conteúdo "cravado" no meio do JSX — se algo não
estiver no `siteData.ts`, é bug, não é assim que o site foi pensado.

---

## Rodar localmente

### Opção 1 — Duplo clique (mais fácil)

Dê duplo clique no arquivo **`iniciar-site.bat`** (na raiz do projeto). Ele abre o servidor numa
janela do terminal e, depois de alguns segundos, abre o site sozinho no navegador em
`http://localhost:3000`. Para parar, feche a janela preta do terminal.

> Só funciona depois que as dependências já foram instaladas pelo menos uma vez (Opção 2, passo 1).

### Opção 2 — Pelo terminal

```bash
npm install     # só na primeira vez (ou quando package.json mudar)
npm run dev     # sobe o servidor local
```

Abra `http://localhost:3000` no navegador. Toda vez que você salvar um arquivo, o site atualiza
sozinho (hot reload). Para parar, `Ctrl + C` no terminal.

---

## Editar textos, preços e páginas — tudo em `data/siteData.ts`

| O que | Seção em `siteData.ts` |
|---|---|
| Nome da marca, copyright, texto legal | `brand` |
| Links do menu / rodapé | `menuLinks`, `footerLinks` |
| Instagram, Facebook, LinkedIn, YouTube | `socialLinks` |
| Número e mensagens do WhatsApp | `whatsapp` |
| Slides do carrossel Home (6) | `heroSlides` |
| Slides da seção Aplicativo (3) | `appSlides` |
| Slides da seção Frotas (3) | `fleetSlides` |
| Slides da seção "Prosat para você" (3) | `clientSlides` |
| Planos e preços mensais | `pricingPlans` |
| Taxas de instalação | `installationFees` |
| Depoimentos (9) | `testimonials` |
| Textos do pop-up de saída | `exitPopupVariants` |
| Página "O Grupo Tracker" (hero, missão/visão/valores, stats) | `grupoTrackerPage` |
| Página "Como podemos ajudar" (grid de soluções) | `comoAjudarPage` |
| Página "Seja parceiro" (benefícios, formulário) | `sejaParceiroPagina` |
| Página "Contato" (info, formulário) | `contatoPagina` |
| Páginas de instalação — Caminhão / Utilitário / Carro Leve / Moto | `installationPages` |

Cada seção é um objeto ou array simples: basta trocar o texto entre aspas. Não precisa mexer em
vírgulas, chaves `{}` ou na estrutura. Para adicionar/remover um item de uma lista (ex: um slide
ou um depoimento), copie um bloco `{ ... }` inteiro e cole na posição desejada, ou apague o bloco
inteiro (da `{` até a `}` e a vírgula seguinte).

Trocar o WhatsApp de todo o site, por exemplo, é uma linha só:

```ts
export const whatsapp = {
  number: '5500000000000',  // ← troque pelo número real, só dígitos, com DDI 55
```

---

## Adicionar, remover ou editar um slide do carrossel

Todos os carrosséis do site são listas de blocos `{ ... }` dentro de `data/siteData.ts`:

| Carrossel | Array em `siteData.ts` | Campos de texto de cada slide |
|---|---|---|
| Hero (topo da Home) | `heroSlides` | `title`, `subtitle`, `primaryButtonLabel`, `secondaryButtonLabel`, `tertiaryButtonLabel` |
| Seção Aplicativo | `appSlides` | `title`, `description` |
| Seção Frotas | `fleetSlides` | `label`, `title`, `subtitle`, `description`, `ctaLabel` |
| "Prosat para você" | `clientSlides` | `label`, `title`, `subtitle`, `description`, `ctaLabel` |

O carrossel se ajusta sozinho ao número de blocos — a quantidade de bolinhas (dots) e as
setas seguem a lista automaticamente. **Não existe outro arquivo para mexer.**

### Editar os textos de um slide

Abra `data/siteData.ts`, ache o array (ex: `heroSlides`), localize o bloco do slide pelo
`id` ou pelo texto atual e troque o conteúdo entre aspas. Só o texto — não mexa em `{`, `}`,
vírgulas ou nos nomes dos campos.

```ts
{
  id: 2,
  title: 'Onde quer que seu veículo esteja, você sabe.',   // ← troque este texto
  subtitle: 'Tecnologia de ponta para proteger o que é seu.', // ← e este
  ...
}
```

### Remover um slide

Apague o bloco inteiro, da linha `{` até a linha `},` logo abaixo do fim daquele slide
(incluindo essa vírgula). Salve e pronto.

**Exemplo — remover o slide "App Prosat" do Hero (era o slide 5):** dentro de `heroSlides`,
apague todo o bloco que começava em `id: 5` e tinha
`imagePlaceholder: 'Slide 5 — App Prosat • 1920×1080'`, da `{` até o `},`. Os slides
seguintes (`id: 6` e `id: 7`) continuam funcionando — não é obrigatório renumerar os `id`.

Sobre a imagem: o campo `image` de cada slide aponta para um arquivo em
`public/images/hero/`. Ao remover o slide, o arquivo que ele usava (ex:
`public/images/hero/slide-5.jpg`) simplesmente deixa de ser usado — pode apagá-lo ou
deixar lá, não faz diferença para o site.

### Adicionar um slide

Copie um bloco `{ ... }` inteiro (com a vírgula no fim), cole na posição desejada dentro
do mesmo array, troque o `id` para um número que ainda não exista e ajuste os textos e o
caminho da `image`.

---

## Imagens

Todo lugar do site que mostra uma foto usa o componente `SmartImage`
([`components/ui/SmartImage.tsx`](components/ui/SmartImage.tsx)), que funciona sozinho:

- **Enquanto o arquivo não existir** em `public/`, aparece uma caixa tracejada com o texto
  descrevendo o que deveria entrar ali e o tamanho sugerido.
- **Assim que você colocar o arquivo real** no caminho esperado, a foto aparece sozinha — não
  precisa editar nenhum código, só adicionar o arquivo.

Isso significa que dá para ir trocando as fotos aos poucos, sem nunca deixar o site com uma
imagem quebrada.

### Padrão de cor das fotos (filtro + transparência)

Todas as fotos que ocupam a largura do bloco (hero, aplicativo, frotas, "Prosat para você",
institucional, pop-up de saída e páginas de instalação) recebem **automaticamente** duas
camadas, para o site inteiro ter a mesma "pegada" visual mesmo que as fotos venham de fontes
diferentes:

1. um **filtro de cor** nos pixels da foto;
2. uma **camada semi-transparente** por cima (a "transparência" / véu).

A logo e as caixas tracejadas de placeholder não são afetadas.

**Você controla tudo num lugar só:** o bloco `TRATAMENTO DE COR DAS FOTOS` no topo de
[`app/globals.css`](app/globals.css):

```css
:root {
  --photo-filter: saturate(0.9) contrast(1.03) brightness(0.97) sepia(0.06);

  /* Camada por cima da foto. Cor + força no mesmo rgba():
     os 3 primeiros números = cor, o último (0 a 1) = opacidade. */
  --photo-veil: rgba(15, 10, 15, 0.32);   /* preto a 32% */

  --photo-veil-blend: normal;             /* normal, soft-light, multiply, overlay… */
}
```

Ajustes rápidos (só mexe no `--photo-veil`):

- **Mais transparência / foto mais suave:** sobe o último número — `rgba(15, 10, 15, 0.45)`.
- **Menos, quase nada:** `rgba(15, 10, 15, 0.15)`.
- **Clima quente/dourado:** `rgba(180, 153, 90, 0.28)`.
- **Tom claro/leitoso:** `rgba(242, 242, 242, 0.18)`.
- **Efeito preto e branco parcial:** `--photo-filter: saturate(0.4) contrast(1.05);`.
- **Desligar tudo:** `--photo-filter: none;` e `--photo-veil: transparent;`.

`--photo-veil-blend: normal` deixa o véu "chapado" (escurece parelho); `soft-light` ou
`multiply` tonalizam mantendo mais contraste da foto — teste os dois.

Salve o arquivo com `npm run dev` rodando e o site atualiza na hora. Para tirar o efeito de
uma foto específica, passe `treatment={false}` naquele `<SmartImage>`.

### Onde colocar cada foto

Prepare as imagens já otimizadas para web e salve em `public/images/...`, usando exatamente estes caminhos:

| Seção | Caminho | Tamanho sugerido |
|---|---|---|
| Carrossel Home (1 arquivo por slide do `heroSlides`) | `public/images/hero/slide-N.jpg` | 1920×1080 |
| Aplicativo (slides 1–3) | `public/images/app/slide-N.jpg` | 1920×1080 |
| Prosat para você (slides 1–3) | `public/images/client/slide-N.jpg` | 900×600 |
| Frotas (slides 1–3) | `public/images/fleet/slide-N.jpg` | 900×600 |
| O Grupo Tracker (foto da equipe / sede) | `public/images/institucional/equipe-sede.jpg` | 700×450 |
| Instalação (1 por veículo) | `public/images/instalacao/{caminhao,utilitario,carro-leve,moto}.jpg` | 700×450 |
| Pop-up de saída | `public/images/popup/ilustracao-veiculo-rastreado.jpg` | 280×200 |
| Logo (header + footer) | `public/logo-prosat.svg` | — |

Se preferir outro nome de arquivo, edite o campo `image`/`src` correspondente: nos carrosséis, ele
fica em `data/siteData.ts` dentro do objeto do slide; nas páginas institucionais e de instalação,
também está em `siteData.ts` (`grupoTrackerPage`, `installationPages`, etc.) ou direto na propriedade
`src` de um `<SmartImage>`. Ajuste também o `alt` para descrever a nova foto (acessibilidade e SEO).

Enquanto a logo não existir, aparece o texto "PROSAT" no lugar (comportamento esperado).

### Exemplo prático — renomeando uma foto do carrossel Home

Digamos que você tem a foto de um caminhão e quer usá-la no **slide 2** do carrossel da Home.
O caminho esperado (ver tabela acima) é `public/images/hero/slide-2.jpg`. Passo a passo no Windows:

1. Copie sua foto para dentro da pasta `public\images\hero\`.
2. Clique com o botão direito no arquivo → **Renomear**.
3. Apague **só o nome**, sem tocar na extensão, e digite `slide-2` — resultado final: `slide-2.jpg`.
4. Salve com `npm run dev` rodando e confira em `http://localhost:3000` se a foto apareceu no lugar da caixa tracejada.

**Atenção ao "nome.jpg.jpg"** — a causa mais comum de imagem que "não funciona": por padrão o
Windows Explorer **esconde a extensão** dos arquivos conhecidos. Se ao renomear você digitar o
nome inteiro com `.jpg` no final (ex: `slide-2.jpg`) enquanto a extensão está escondida, o Windows
adiciona a extensão de novo por baixo — o arquivo vira `slide-2.jpg.jpg` sem avisar, e como o site
está procurando por `slide-2.jpg`, ele não encontra e continua mostrando o placeholder.

Como conferir/corrigir:
- No Explorer, vá em **Exibir → Mostrar → Extensões de nomes de arquivos** (ou **Exibir → Itens
  marcados → Extensões de nomes de arquivo**, dependendo da versão do Windows) para ligar a
  exibição da extensão. Com isso ativado, você vê o nome completo e não digita `.jpg` duas vezes.
- Se um arquivo já foi salvo errado, o nome vai aparecer como `slide-2.jpg.jpg` (ou só `slide-2.jpg`
  com um ícone de imagem, dependendo da configuração) — renomeie removendo o `.jpg` extra do final.
- Regra prática: o nome final do arquivo, **sem contar a extensão**, deve ser exatamente `slide-2`
  (ou `slide-1`, `slide-3`... conforme o slide) — nem espaço, nem sufixo, nem `.jpg` repetido.

O mesmo vale para todas as outras pastas de imagem da tabela acima (`app/`, `client/`, `fleet/`,
`instalacao/`, etc.) — o nome do arquivo precisa bater exatamente com o que está em `data/siteData.ts`
(ou na propriedade `src` do `<SmartImage>`, nas páginas que não usam carrossel).

---

## Deploy — GitHub Pages

Qualquer `git push` na branch `main` dispara o deploy automático via GitHub Actions.

```bash
git add .
git commit -m "descrição da alteração"
git push
```

Em ~2 minutos o site atualiza em: **https://eloaparadela.github.io/site-feeh/**
Acompanhe o progresso em `github.com/eloaparadela/site-feeh → Actions`.

---

## Stack

- [Next.js](https://nextjs.org/) — App Router, Server + Client Components
- [Tailwind CSS](https://tailwindcss.com/) — estilização
- [TypeScript](https://www.typescriptlang.org/)
- GitHub Pages — hospedagem estática via `output: 'export'`

---

Desenvolvido por **Hubble Agency**
