# Guia do Projeto — Prosat Site

Site institucional da **Prosat — Sistema de Rastreamento Veicular**, desenvolvido em Next.js 14 + Tailwind CSS.

---

## Estrutura geral

```
Site feeh/
├── data/siteData.ts          ← ARQUIVO CENTRAL — edite tudo aqui
├── app/                      ← Páginas (Next.js App Router)
│   ├── page.tsx              ← Homepage
│   ├── o-grupo-tracker/
│   ├── como-podemos-ajudar/
│   ├── seja-parceiro/
│   ├── contato/
│   └── instalacao/caminhao|utilitario|carro-leve|moto/
├── components/               ← Componentes visuais
├── public/                   ← Imagens e arquivos estáticos
└── .github/workflows/        ← Deploy automático GitHub Pages
```

---

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`

---

## Trocar o WhatsApp

Arquivo: `data/siteData.ts` — linha 121

```ts
export const whatsapp = {
  number: '5500000000000',  // ← troque pelo número real (só dígitos, com DDI 55)
```

**Exemplo real:** `'5511987654321'`

Isso atualiza **todos** os botões de WhatsApp do site de uma vez.

---

## Adicionar a Logo

Atualmente aparece o texto `LOGO` no lugar. Para colocar a logo real:

**1.** Coloque o arquivo em `public/logo-prosat.svg` (ou `.png`)

**2.** Abra `components/layout/Header.tsx` linha 68 e substitua:

```tsx
// ANTES:
<span className="theme-logo-text font-black text-xl ...">
  {brand.logoPlaceholder}
</span>

// DEPOIS:
<Image src="/logo-prosat.svg" alt="Prosat" width={180} height={52} priority />
```

**3.** Faça o mesmo em `components/layout/Footer.tsx` linha 21.

---

## Substituir imagens

Todas as imagens têm um campo `image` no `siteData.ts`. O fluxo:

**1.** Coloque as imagens na pasta `public/images/`:

```
public/
└── images/
    ├── hero/
    │   ├── slide-1-app.jpg
    │   ├── slide-2-caminhao.jpg
    │   ├── slide-3-carro.jpg
    │   ├── slide-4-moto.jpg
    │   ├── slide-5-app-prosat.jpg
    │   ├── slide-6-frota.jpg
    │   └── slide-7-planos.jpg
    ├── app/
    │   ├── slide-1.jpg
    │   ├── slide-2.jpg
    │   └── slide-3.jpg
    └── fleet/
        ├── slide-1.jpg
        ├── slide-2.jpg
        └── slide-3.jpg
```

**2.** Nos componentes, troque `ImagePlaceholder` por `Image` do Next.js:

```tsx
// ANTES (placeholder):
<ImagePlaceholder text={s.imagePlaceholder} className="w-full h-full" />

// DEPOIS (imagem real):
<Image src={s.image} alt={s.imageAlt} fill className="object-cover" />
```

Os campos `image` e `imageAlt` já estão preenchidos no siteData — só precisa trocar o componente.

---

## Editar textos e conteúdo

Tudo fica em `data/siteData.ts`. Nunca precisa mexer nos componentes para alterar conteúdo.

| O que | Linha | Campo |
|---|---|---|
| Nome da marca | 88 | `brand.name` |
| Texto legal do footer | 93 | `brand.legalText` |
| Links do menu | 99–105 | `menuLinks` |
| Instagram / Facebook | 111–112 | `socialLinks` |
| Slides do Hero (7 slides) | 138–260 | `heroSlides[].title`, `.subtitle` |
| Slides do App (3 slides) | 273–310 | `appSlides[].title`, `.description` |
| Slides de Frotas (3 slides) | 326–369 | `fleetSlides[].title`, `.description` |
| Preços dos planos | 394–439 | `pricingPlans[].monthlyPrice` |
| Taxas de instalação | 381–392 | `installationFees[].value` |
| Depoimentos (9) | 444–526 | `testimonials[].quote`, `.name` |
| Texto do pop-up de saída | 532–551 | `exitPopupVariants[].title` |

---

## Editar páginas institucionais

Cada página tem seu bloco no final do `siteData.ts`:

| Página | Objeto no siteData |
|---|---|
| O Grupo Tracker | `grupoTrackerPage` |
| Como podemos ajudar | `comoAjudarPage` |
| Seja parceiro | `sejaParceiroPagina` |
| Contato | `contatoPagina` |

---

## Redes Sociais

Arquivo: `data/siteData.ts` — linha 110

```ts
export const socialLinks = {
  instagram: 'https://instagram.com/prosat',  // ← troque pela URL real
  facebook: 'https://facebook.com/prosat',
}
```

Os ícones no header e footer atualizam automaticamente.

---

## Deploy — GitHub Pages

Qualquer `git push` na branch `main` dispara o deploy automático via GitHub Actions.

```bash
git add .
git commit -m "descrição da alteração"
git push
```

Em ~2 minutos o site atualiza em:

**https://eloaparadela.github.io/site-feeh/**

Acompanhe o progresso em: `github.com/eloaparadela/site-feeh → Actions`

---

## Stack

- [Next.js 14](https://nextjs.org/) — App Router, Server + Client Components
- [Tailwind CSS](https://tailwindcss.com/) — estilização
- [TypeScript](https://www.typescriptlang.org/)
- GitHub Pages — hospedagem estática via `output: 'export'`

---

Desenvolvido por **Hubble Agency**
