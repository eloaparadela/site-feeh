// ─────────────────────────────────────────────
// ARQUIVO CENTRAL DE CONFIGURAÇÃO — PROSAT
// Edite aqui para atualizar textos, links,
// preços, imagens e conteúdo sem mexer nos componentes.
// ─────────────────────────────────────────────

export interface HeroSlide {
  id: number
  title: string
  subtitle: string
  image: string
  imagePlaceholder: string
  imageAlt: string
  primaryButtonLabel: string
  primaryButtonLink: string
  secondaryButtonLabel: string
  secondaryButtonLink: string
  tertiaryButtonLabel: string
  tertiaryButtonLink: string
  hasExternalButton: boolean
  externalButtonLabel: string
  externalButtonLink: string
}

export interface AppSlide {
  id: number
  title: string
  description: string
  image: string
  imagePlaceholder: string
  imageAlt: string
  appStoreLink: string
  googlePlayLink: string
  learnMoreLink: string
}

export interface FleetSlide {
  id: number
  number: string
  label: string
  title: string
  subtitle: string
  description: string
  image: string
  imagePlaceholder: string
  imageAlt: string
  ctaLabel: string
  ctaLink: string
}

export interface PricingPlan {
  id: string
  vehicleType: string
  icon: 'truck' | 'van' | 'car' | 'motorcycle'
  monthlyPrice: string
  description: string
  installationNote: string
  whatsappMessage: string
  learnMoreLink: string
}

export interface InstallationFee {
  id: string
  label: string
  value: string
}

export interface Testimonial {
  id: number
  stars: number
  quote: string
  name: string
  role: string
  city: string
}

export interface ExitPopupVariant {
  id: string
  isDefault: boolean
  title: string
  description: string
}

// ─────────────────────────────────────────────
// MARCA
// ─────────────────────────────────────────────
export const brand = {
  name: 'Prosat',
  tagline: 'Sistema de Rastreamento',
  logoPlaceholder: 'PROSAT',
  copyright: '© 2025 Prosat Sistema de Rastreamento. Todos os direitos reservados.',
  legalText:
    'Acompanhe seu veículo em tempo real, direto pelo celular. Tenha mais controle, praticidade e tranquilidade no seu dia a dia.',
}

// ─────────────────────────────────────────────
// MENU
// ─────────────────────────────────────────────
export const menuLinks = [
  { label: 'Home', href: '/' },
  { label: 'O Grupo PROSAT', href: '/o-grupo-tracker' },
  { label: 'Como podemos ajudar?', href: '/como-podemos-ajudar' },
  { label: 'Seja parceiro', href: '/seja-parceiro' },
  { label: 'Contato', href: '/contato' },
]

// ─────────────────────────────────────────────
// REDES SOCIAIS
// ─────────────────────────────────────────────
export const socialLinks = {
  instagram: 'https://www.instagram.com/rastreador_prosat/',
}

// ─────────────────────────────────────────────
// WHATSAPP
// ─────────────────────────────────────────────
export const whatsapp = {
  number: '5511959200609',
  defaultMessage: 'Olá, gostaria de mais informações sobre os planos de rastreamento da Prosat.',
  salesMessage: 'Olá, gostaria de falar com o time de vendas da Prosat.',
  fleetMessage: 'Olá, gostaria de saber mais sobre soluções para frotas.',
  messages: {
    caminhao: 'Olá, gostaria de saber mais sobre o rastreamento para Caminhão.',
    utilitario: 'Olá, gostaria de saber mais sobre o rastreamento para Utilitário.',
    carroLeve: 'Olá, gostaria de saber mais sobre o rastreamento para Carro Leve.',
    moto: 'Olá, gostaria de saber mais sobre o rastreamento para Moto.',
  },
}

// ─────────────────────────────────────────────
// HERO — 6 SLIDES
// Troque os campos "image" pelo caminho real quando tiver as imagens.
// O campo "imagePlaceholder" é apenas o label do box de placeholder.
// ─────────────────────────────────────────────
export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'Seu veículo protegido. Sua tranquilidade garantida.',
    subtitle: 'Rastreamento inteligente para quem não abre mão de segurança.',
    image: '/images/hero/slide-1.jpg',
    imagePlaceholder: 'Slide 1 — App de rastreamento • 1920×1080',
    imageAlt: 'App de rastreamento na tela de um celular',
    primaryButtonLabel: 'Cotação Online',
    primaryButtonLink: '#orcamento',
    secondaryButtonLabel: 'WhatsApp de Vendas',
    secondaryButtonLink: `https://wa.me/5511959200609?text=${encodeURIComponent('Olá, gostaria de mais informações sobre os planos de rastreamento da Prosat.')}`,
    tertiaryButtonLabel: 'Saiba Mais',
    tertiaryButtonLink: '/como-podemos-ajudar',
    hasExternalButton: false,
    externalButtonLabel: '',
    externalButtonLink: '',
  },
  {
    id: 2,
    title: 'Onde quer que seu veículo esteja, você sabe.',
    subtitle: 'Tecnologia de ponta para proteger o que é seu.',
    image: '/images/hero/slide-2.jpg',
    imagePlaceholder: 'Slide 2 — Caminhão • 1920×1080',
    imageAlt: 'Caminhão em estrada com rastreamento ativo',
    primaryButtonLabel: 'Cotação Online',
    primaryButtonLink: '#orcamento',
    secondaryButtonLabel: 'WhatsApp de Vendas',
    secondaryButtonLink: `https://wa.me/5511959200609?text=${encodeURIComponent('Olá, gostaria de mais informações sobre os planos de rastreamento da Prosat.')}`,
    tertiaryButtonLabel: 'Saiba Mais',
    tertiaryButtonLink: '/como-podemos-ajudar',
    hasExternalButton: false,
    externalButtonLabel: '',
    externalButtonLink: '',
  },
  {
    id: 3,
    title: 'Segurança real. Monitoramento 24 horas. Preço justo.',
    subtitle:
      'A Prosat oferece rastreamento veicular com tecnologia líder no Brasil — para carros, motos e frotas de todos os tamanhos.',
    image: '/images/hero/slide-3.jpg',
    imagePlaceholder: 'Slide 3 — Carro leve • 1920×1080',
    imageAlt: 'Carro leve com sistema de rastreamento instalado',
    primaryButtonLabel: 'Cotação Online',
    primaryButtonLink: '#orcamento',
    secondaryButtonLabel: 'WhatsApp de Vendas',
    secondaryButtonLink: `https://wa.me/5511959200609?text=${encodeURIComponent('Olá, gostaria de mais informações sobre os planos de rastreamento da Prosat.')}`,
    tertiaryButtonLabel: 'Saiba Mais',
    tertiaryButtonLink: '/como-podemos-ajudar',
    hasExternalButton: false,
    externalButtonLabel: '',
    externalButtonLink: '',
  },
  {
    id: 4,
    title: 'Instalação rápida, monitoramento imediato.',
    subtitle: 'Proteção que começa no momento da instalação e nunca para.',
    image: '/images/hero/slide-4.jpg',
    imagePlaceholder: 'Slide 4 — Moto • 1920×1080',
    imageAlt: 'Moto com rastreador instalado',
    primaryButtonLabel: 'Cotação Online',
    primaryButtonLink: '#orcamento',
    secondaryButtonLabel: 'WhatsApp de Vendas',
    secondaryButtonLink: `https://wa.me/5511959200609?text=${encodeURIComponent('Olá, gostaria de mais informações sobre os planos de rastreamento da Prosat.')}`,
    tertiaryButtonLabel: 'Saiba Mais',
    tertiaryButtonLink: '/como-podemos-ajudar',
    hasExternalButton: false,
    externalButtonLabel: '',
    externalButtonLink: '',
  },
  {
    id: 6,
    title: 'Sua frota mais eficiente, seus custos reduzidos.',
    subtitle: 'Monitore rotas, reduza custos e aumente a produtividade da sua equipe com dados em tempo real.',
    image: '/images/hero/slide-6.jpg',
    imagePlaceholder: 'Slide 6 — Frota / logística • 1920×1080',
    imageAlt: 'Vista aérea de frota de veículos logísticos',
    primaryButtonLabel: 'Cotação Online',
    primaryButtonLink: '#orcamento',
    secondaryButtonLabel: 'WhatsApp de Vendas',
    secondaryButtonLink: `https://wa.me/5511959200609?text=${encodeURIComponent('Olá, gostaria de mais informações sobre os planos de rastreamento da Prosat.')}`,
    tertiaryButtonLabel: 'Soluções para Frotas',
    tertiaryButtonLink: '#frotas',
    hasExternalButton: false,
    externalButtonLabel: '',
    externalButtonLink: '',
  },
  {
    id: 7,
    title: 'Do autônomo ao transportador, a Prosat tem o plano certo para você.',
    subtitle: 'Simples de usar, poderoso na prática. Monitoramento contínuo para carros, motos e caminhões.',
    image: '/images/hero/slide-7.jpg',
    imagePlaceholder: 'Slide 7 — Assistência / benefícios • 1920×1080',
    imageAlt: 'Benefícios e planos de rastreamento Prosat',
    primaryButtonLabel: 'Ver Planos',
    primaryButtonLink: '#orcamento',
    secondaryButtonLabel: 'WhatsApp de Vendas',
    secondaryButtonLink: `https://wa.me/5511959200609?text=${encodeURIComponent('Olá, gostaria de mais informações sobre os planos de rastreamento da Prosat.')}`,
    tertiaryButtonLabel: 'Saiba Mais',
    tertiaryButtonLink: '/como-podemos-ajudar',
    hasExternalButton: false,
    externalButtonLabel: '',
    externalButtonLink: '',
  },
]

// ─────────────────────────────────────────────
// SEÇÃO DO APLICATIVO — 3 SLIDES
// ─────────────────────────────────────────────
export const appSection = {
  sectionId: 'aplicativo',
  appStoreLink: 'https://apps.apple.com/',
  googlePlayLink: 'https://play.google.com/',
  learnMoreLink: '/como-podemos-ajudar',
}

export const appSlides: AppSlide[] = [
  {
    id: 1,
    title: 'Com a Prosat, você tem segurança 24h na palma da mão.',
    description:
      'Nosso aplicativo foi desenvolvido para quem precisa de controle total com praticidade. Acompanhe localização em tempo real, receba alertas de ignição, movimentação e cerca virtual — tudo em uma interface rápida e intuitiva.',
    image: '/images/app/slide-1.jpg',
    imagePlaceholder: 'Imagem app — Slide 1 • 1920×1080',
    imageAlt: 'App de rastreamento Prosat — tela principal',
    appStoreLink: 'https://apps.apple.com/',
    googlePlayLink: 'https://play.google.com/',
    learnMoreLink: '/como-podemos-ajudar',
  },
  {
    id: 2,
    title: 'Simples de usar, poderoso na prática.',
    description:
      'Monitoramento contínuo para carros, motos e caminhões. Disponível para Android e iOS. Conecte-se ao seu rastreador em segundos e tenha controle total de onde estiver.',
    image: '/images/app/slide-2.jpg',
    imagePlaceholder: 'Imagem app — Slide 2 • 1920×1080',
    imageAlt: 'App de rastreamento Prosat — mapa de risco',
    appStoreLink: 'https://apps.apple.com/',
    googlePlayLink: 'https://play.google.com/',
    learnMoreLink: '/como-podemos-ajudar',
  },
  {
    id: 3,
    title: 'Alertas inteligentes, decisões mais rápidas.',
    description:
      'Receba notificações em tempo real sobre ignição, cerca virtual, movimentação suspeita e muito mais. Tudo no seu celular, onde você estiver — 24 horas por dia, 7 dias por semana.',
    image: '/images/app/slide-3.jpg',
    imagePlaceholder: 'Imagem app — Slide 3 • 1920×1080',
    imageAlt: 'App de rastreamento Prosat — alertas e notificações',
    appStoreLink: 'https://apps.apple.com/',
    googlePlayLink: 'https://play.google.com/',
    learnMoreLink: '/como-podemos-ajudar',
  },
]

// ─────────────────────────────────────────────
// SEÇÃO DE FROTAS — 3 SLIDES
// ─────────────────────────────────────────────
export const fleetSection = {
  sectionId: 'frotas',
  sectionLabel: 'Soluções para empresas',
  sectionTitle: 'Prosat Gestão de Frotas',
  sectionSubtitle:
    'Nós cuidamos da segurança e do monitoramento dos seus veículos para que você possa focar no que realmente importa: o crescimento do seu negócio.',
  mainTitle: 'Sua frota mais eficiente, seus custos reduzidos.',
  mainDescription:
    'Gerencie toda a sua frota com visibilidade completa. Soluções de rastreamento para empresas de qualquer porte.',
  supportPhrase: 'Sua logística mais inteligente começa com visibilidade total. A Prosat entrega isso.',
  whatsappMessage: 'Olá, gostaria de saber mais sobre soluções para frotas.',
}

export const fleetSlides: FleetSlide[] = [
  {
    id: 1,
    number: '01',
    label: 'Gestão de frota',
    title: 'Gerencie toda a sua frota com visibilidade completa.',
    subtitle: 'Visibilidade total',
    description:
      'Acompanhe todos os seus veículos em um único painel com rotas, paradas, consumo e alertas em tempo real. Gestão de frota sem complicação, do jeito que o seu negócio precisa.',
    image: '/images/fleet/slide-1.jpg',
    imagePlaceholder: 'Imagem frota 1 • 900×600',
    imageAlt: 'Vista aérea de frota de veículos com gestão logística',
    ctaLabel: 'Fale conosco',
    ctaLink: `https://wa.me/5511959200609?text=${encodeURIComponent('Olá, gostaria de saber mais sobre soluções para frotas.')}`,
  },
  {
    id: 2,
    number: '02',
    label: 'Eficiência operacional',
    title: 'Monitore rotas, reduza custos e aumente a produtividade da sua equipe.',
    subtitle: 'Redução de custos',
    description:
      'Cada veículo é um dado. Cada dado é uma economia. Evite desvios de rota, controle o consumo e receba relatórios automáticos para tomar decisões mais rápidas.',
    image: '/images/fleet/slide-2.jpg',
    imagePlaceholder: 'Imagem frota 2 • 900×600',
    imageAlt: 'Monitoramento de frotas em tempo real com dados precisos',
    ctaLabel: 'Fale conosco',
    ctaLink: `https://wa.me/5511959200609?text=${encodeURIComponent('Olá, gostaria de saber mais sobre soluções para frotas.')}`,
  },
  {
    id: 3,
    number: '03',
    label: 'Crescimento sem complicação',
    title: 'Decisões melhores começam com informação em tempo real.',
    subtitle: 'Escalabilidade',
    description:
      'Seja uma frota de 2 ou 200 veículos, a Prosat tem a solução certa. Escale conforme o seu negócio cresce, sem burocracia e sem perder o controle.',
    image: '/images/fleet/slide-3.jpg',
    imagePlaceholder: 'Imagem frota 3 • 900×600',
    imageAlt: 'Frota de caminhões com rastreamento escalável',
    ctaLabel: 'Fale conosco',
    ctaLink: `https://wa.me/5511959200609?text=${encodeURIComponent('Olá, gostaria de saber mais sobre soluções para frotas.')}`,
  },
]

// ─────────────────────────────────────────────
// SEÇÃO CLIENTE FINAL — "PROSAT PARA VOCÊ" — 3 SLIDES
// ─────────────────────────────────────────────
export const clientSection = {
  sectionId: 'cliente',
  sectionLabel: 'Prosat para você',
  sectionTitle: 'Seu veículo protegido. Sua tranquilidade garantida.',
  sectionSubtitle: 'Rastreamento inteligente para quem não abre mão de segurança.',
  mainTitle: 'Segurança 24h na palma da mão.',
  supportPhrase: 'Com o app Prosat, você não precisa esperar algo acontecer para agir. O sistema te avisa primeiro.',
}

export const clientSlides: FleetSlide[] = [
  {
    id: 1,
    number: '01',
    label: 'Segurança 24h',
    title: 'Onde quer que seu veículo esteja, você sabe.',
    subtitle: 'Localização em tempo real',
    description:
      'Acompanhe a localização do seu veículo a qualquer hora, de qualquer lugar. Receba alertas de ignição, movimentação suspeita e cerca virtual direto no seu celular.',
    image: '/images/client/slide-1.jpg',
    imagePlaceholder: 'Prosat para você 1 • 900×600',
    imageAlt: 'Pessoa monitorando veículo pelo celular com app Prosat',
    ctaLabel: 'Fale conosco',
    ctaLink: `https://wa.me/5511959200609?text=${encodeURIComponent('Olá, gostaria de mais informações sobre os planos de rastreamento da Prosat.')}`,
  },
  {
    id: 2,
    number: '02',
    label: 'App Prosat',
    title: 'Com a Prosat, você tem segurança 24h na palma da mão.',
    subtitle: 'Android e iOS',
    description:
      'Com o app Prosat, você não precisa esperar algo acontecer para agir. O sistema te avisa primeiro. Simples de usar e poderoso na prática, disponível para Android e iOS.',
    image: '/images/client/slide-2.jpg',
    imagePlaceholder: 'Prosat para você 2 • 900×600',
    imageAlt: 'App Prosat no celular com mapa de rastreamento',
    ctaLabel: 'Fale conosco',
    ctaLink: `https://wa.me/5511959200609?text=${encodeURIComponent('Olá, gostaria de mais informações sobre o app Prosat.')}`,
  },
  {
    id: 3,
    number: '03',
    label: 'Para todos',
    title: 'Do carro à moto, do utilitário ao caminhão. A Prosat tem o plano certo para você.',
    subtitle: 'Instalação rápida',
    description:
      'Seja autônomo, profissional liberal ou empresário: a Prosat tem rastreamento para todos os tipos de veículo, com preço justo e instalação rápida.',
    image: '/images/client/slide-3.jpg',
    imagePlaceholder: 'Prosat para você 3 • 900×600',
    imageAlt: 'Diferentes tipos de veículos com rastreamento Prosat instalado',
    ctaLabel: 'Ver planos',
    ctaLink: '#orcamento',
  },
]

// ─────────────────────────────────────────────
// PREÇOS / PLANOS
// ─────────────────────────────────────────────
export const pricingSection = {
  sectionId: 'orcamento',
  headline: 'OS MELHORES SERVIÇOS DE MONITORAMENTO VEICULAR PARA VOCÊ.',
  subheadline: 'SEU VEÍCULO SEGURO E MONITORADO COM TECNOLOGIA DE PONTA.',
  supportText: 'Do autônomo ao transportador, a Prosat tem o plano certo para você.',
}

export const installationFees: InstallationFee[] = [
  {
    id: 'sp',
    label: 'Taxa de instalação e ativação no Estado de SP',
    value: 'R$ 100,00',
  },
  {
    id: 'fora-sp',
    label: 'Taxa de instalação e ativação fora do Estado de SP',
    value: 'R$ 120,00',
  },
]

export const pricingPlans: PricingPlan[] = [
  {
    id: 'caminhao',
    vehicleType: 'Caminhão',
    icon: 'truck',
    monthlyPrice: '69,90',
    description:
      'Proteção completa para seu caminhão com monitoramento 24 horas e suporte especializado.',
    installationNote: 'Instalação: R$ 100,00 (SP) • R$ 120,00 (outros estados)',
    whatsappMessage: 'Olá, gostaria de saber mais sobre o rastreamento para Caminhão.',
    learnMoreLink: '/instalacao/caminhao',
  },
  {
    id: 'utilitario',
    vehicleType: 'Utilitário',
    icon: 'van',
    monthlyPrice: '65,00',
    description:
      'Solução ideal para utilitários e vans com tecnologia avançada de rastreamento e alertas em tempo real.',
    installationNote: 'Instalação: R$ 100,00 (SP) • R$ 120,00 (outros estados)',
    whatsappMessage: 'Olá, gostaria de saber mais sobre o rastreamento para Utilitário.',
    learnMoreLink: '/instalacao/utilitario',
  },
  {
    id: 'carro-leve',
    vehicleType: 'Carro Leve',
    icon: 'car',
    monthlyPrice: '59,90',
    description:
      'Rastreamento profissional para carros de passeio com app intuitivo e monitoramento contínuo.',
    installationNote: 'Instalação: R$ 100,00 (SP) • R$ 120,00 (outros estados)',
    whatsappMessage: 'Olá, gostaria de saber mais sobre o rastreamento para Carro Leve.',
    learnMoreLink: '/instalacao/carro-leve',
  },
  {
    id: 'moto',
    vehicleType: 'Moto',
    icon: 'motorcycle',
    monthlyPrice: '49,90',
    description:
      'Proteção discreta e eficiente para motos com rastreador de alta precisão e baixo consumo.',
    installationNote: 'Instalação: R$ 100,00 (SP) • R$ 120,00 (outros estados)',
    whatsappMessage: 'Olá, gostaria de saber mais sobre o rastreamento para Moto.',
    learnMoreLink: '/instalacao/moto',
  },
]

// ─────────────────────────────────────────────
// DEPOIMENTOS — 9 REGISTROS
// ─────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    id: 1,
    stars: 5,
    quote:
      'Instalei o rastreador no meu caminhão e em menos de uma semana já monitorava tudo pelo celular. A equipe da Prosat foi super atenciosa desde o primeiro contato até a instalação. Recomendo!',
    name: 'Ricardo Mendes',
    role: 'Transportador',
    city: 'São Paulo, SP',
  },
  {
    id: 2,
    stars: 5,
    quote:
      'Minha moto foi recuperada em menos de 2 horas após o roubo graças ao rastreador da Prosat. Atendimento impecável do início ao fim. Não sei o que seria de mim sem esse serviço.',
    name: 'Juliana Santos',
    role: 'Motoboy',
    city: 'Santo André, SP',
  },
  {
    id: 3,
    stars: 5,
    quote:
      'Preço justo e app muito fácil de usar. O alerta de ignição me avisou quando meu filho pegou o carro sem avisar. Vale muito cada centavo investido.',
    name: 'Carlos Pereira',
    role: 'Autônomo',
    city: 'São Bernardo do Campo, SP',
  },
  {
    id: 4,
    stars: 5,
    quote:
      'Tenho três utilitários e contratei a Prosat para todos. Mensalidade acessível e suporte excelente. Qualquer dúvida é resolvida rapidinho pelo WhatsApp.',
    name: 'Fernanda Oliveira',
    role: 'Gestora de frota',
    city: 'Curitiba, PR',
  },
  {
    id: 5,
    stars: 5,
    quote:
      'A cerca virtual é incrível. Meu veículo trabalha em rotas interestaduais e acompanho tudo em tempo real de casa. Tecnologia de verdade por um preço honesto.',
    name: 'Marcos Willian',
    role: 'Empresário',
    city: 'Belo Horizonte, MG',
  },
  {
    id: 6,
    stars: 5,
    quote:
      'Fiz a instalação no meu carro e fiquei impressionada com a qualidade. O rastreador é discreto, o app funciona perfeitamente e o valor cabe no orçamento.',
    name: 'Ana Teixeira',
    role: 'Professora',
    city: 'São Bernardo do Campo, SP',
  },
  {
    id: 7,
    stars: 5,
    quote:
      'O aplicativo é muito fácil de usar e o monitoramento é preciso. Instalação rápida e atendimento nota 10.',
    name: 'Paulo Rodrigues',
    role: 'Autônomo',
    city: 'Rio de Janeiro, RJ',
  },
  {
    id: 8,
    stars: 5,
    quote:
      'Contratei para a minha frota de utilitários e a diferença foi imediata. Controle total na palma da mão.',
    name: 'Camila Ferreira',
    role: 'Empresária',
    city: 'Goiânia, GO',
  },
  {
    id: 9,
    stars: 5,
    quote:
      'Minha moto é minha ferramenta de trabalho. Com a Prosat, posso trabalhar tranquilo sabendo que está sempre monitorada.',
    name: 'Diego Santos',
    role: 'Motorista de App',
    city: 'Salvador, BA',
  },
]

// ─────────────────────────────────────────────
// POP-UP DE SAÍDA — 3 VARIAÇÕES
// Trocar isDefault para mudar qual versão aparece por padrão.
// ─────────────────────────────────────────────
export const exitPopupVariants: ExitPopupVariant[] = [
  {
    id: 'urgencia-suave',
    isDefault: true,
    title: 'Antes de ir — você sabe onde está seu veículo agora mesmo?',
    description: 'Deixe seu contato e receba uma cotação gratuita em minutos.',
  },
  {
    id: 'emocional',
    isDefault: false,
    title: 'Seu veículo é seu patrimônio.',
    description: 'Não espere algo acontecer para protegê-lo. Fale com a Prosat agora.',
  },
  {
    id: 'direta',
    isDefault: false,
    title: 'Rastreamento veicular a partir de R$ 49,90/mês.',
    description: 'Preencha seus dados e receba uma proposta personalizada.',
  },
]

// ─────────────────────────────────────────────
// LINKS DO FOOTER
// ─────────────────────────────────────────────
export const footerLinks = [
  { label: 'O Grupo PROSAT', href: '/o-grupo-tracker' },
  { label: 'Como podemos ajudar?', href: '/como-podemos-ajudar' },
  { label: 'Seja parceiro', href: '/seja-parceiro' },
  { label: 'Contato', href: '/contato' },
  { label: 'Privacidade e Uso de Dados', href: '/privacidade' },
]

// ─────────────────────────────────────────────
// LINKS DE PÁGINAS DE INSTALAÇÃO (Saiba Mais)
// ─────────────────────────────────────────────
export const objectionPagesLinks = {
  caminhao: '/instalacao/caminhao',
  utilitario: '/instalacao/utilitario',
  carroLeve: '/instalacao/carro-leve',
  moto: '/instalacao/moto',
}

// ─────────────────────────────────────────────
// LINKS DAS LOJAS
// ─────────────────────────────────────────────
export const appStoreLinks = {
  ios: 'https://apps.apple.com/',
  android: 'https://play.google.com/',
}

// ─────────────────────────────────────────────
// PÁGINA — O GRUPO TRACKER
// ─────────────────────────────────────────────
export const grupoTrackerPage = {
  meta: {
    title: 'O Grupo PROSAT',
    description: 'Conheça a PROSAT, especialista em rastreamento veicular com mais de 15 anos protegendo veículos em todo o Brasil.',
  },
  hero: {
    label: 'Quem somos',
    headline: 'Tecnologia e confiança a serviço da sua segurança.',
    subheadline: 'A PROSAT é um sistema de rastreamento veicular, que te mantém sempre um passo à frente, com localização em tempo real e muito mais controle sobre o seu veículo.',
    description: 'Nosso sistema permite monitorar a localização do seu veículo de forma prática e confiável, direto pelo celular.',
    buttonLabel: 'Conheça nosso rastreamento',
    buttonLink: '/#orcamento',
  },
  blocks: [
    {
      title: 'Nossa Missão',
      body: 'Oferecer soluções de rastreamento veicular acessíveis, confiáveis e eficientes para proteger pessoas, veículos e patrimônios em todo o Brasil.',
    },
    {
      title: 'Nossa Visão',
      body: 'Ser a referência nacional em segurança veicular, reconhecida pela qualidade da tecnologia, excelência no atendimento e impacto positivo na vida dos nossos clientes.',
    },
    {
      title: 'Nossos Valores',
      body: 'Transparência, inovação constante, compromisso com o cliente e responsabilidade social guiam cada decisão que tomamos.',
    },
  ],
  stats: [
    { value: '500 mil+', label: 'Veículos rastreados' },
    { value: '15 anos', label: 'De experiência' },
    { value: 'Todo o Brasil', label: 'Cobertura nacional' },
  ],
  about: {
    headline: 'Mais do que rastreamento — uma parceria de confiança.',
    body: 'A Prosat combina tecnologia de ponta, atendimento humanizado e planos acessíveis para que qualquer pessoa possa proteger seu veículo sem abrir mão da qualidade. Nossa equipe está presente em todo o território nacional, com suporte ágil e estrutura para atender desde o cliente individual até grandes frotas corporativas.',
  },
  cta: {
    headline: 'Faça parte da família Prosat.',
    description: 'Proteja seu veículo com quem entende de segurança.',
    buttonLabel: 'Solicitar orçamento',
    buttonLink: '/#orcamento',
  },
}

// ─────────────────────────────────────────────
// PÁGINA — COMO PODEMOS AJUDAR?
// ─────────────────────────────────────────────
export const comoAjudarPage = {
  meta: {
    title: 'Como podemos ajudar? — Prosat',
    description: 'Descubra como a Prosat pode ajudar você a proteger seu veículo com rastreamento profissional e tecnologia de ponta.',
  },
  hero: {
    label: 'Soluções',
    headline: 'Do autônomo à grande frota, temos a solução certa para você.',
    description: 'A Prosat oferece rastreamento veicular para todos os perfis. Encontre abaixo a solução que melhor se encaixa na sua necessidade.',
  },
  solutions: [
    {
      icon: 'car' as const,
      title: 'Carro Leve',
      description: 'Rastreamento profissional para carros de passeio com app intuitivo, alertas em tempo real e monitoramento contínuo 24 horas.',
      link: '/instalacao/carro-leve',
      linkLabel: 'Ver plano',
      price: 'A partir de R$ 59,90/mês',
    },
    {
      icon: 'motorcycle' as const,
      title: 'Moto',
      description: 'Proteção discreta e eficiente para motos com rastreador de alta precisão, baixo consumo e recuperação ágil em caso de furto.',
      link: '/instalacao/moto',
      linkLabel: 'Ver plano',
      price: 'A partir de R$ 49,90/mês',
    },
    {
      icon: 'truck' as const,
      title: 'Caminhão',
      description: 'Monitoramento 24h com suporte especializado para caminhões. Proteção completa para quem depende da carga para trabalhar.',
      link: '/instalacao/caminhao',
      linkLabel: 'Ver plano',
      price: 'A partir de R$ 69,90/mês',
    },
    {
      icon: 'van' as const,
      title: 'Utilitário',
      description: 'Solução ideal para utilitários, vans e veículos de trabalho. Controle de rota, alertas automáticos e relatórios em tempo real.',
      link: '/instalacao/utilitario',
      linkLabel: 'Ver plano',
      price: 'A partir de R$ 65,00/mês',
    },
    {
      icon: 'fleet' as const,
      title: 'Gestão de Frota',
      description: 'Monitore todos os seus veículos em um único painel. Relatórios automáticos, controle de rotas e redução de custos operacionais.',
      link: '/#frotas',
      linkLabel: 'Ver soluções',
      price: 'Consulte',
    },
    {
      icon: 'app' as const,
      title: 'Aplicativo Prosat',
      description: 'Acompanhe tudo pelo celular em tempo real. App disponível para Android e iOS com interface simples e alertas inteligentes.',
      link: '/#aplicativo',
      linkLabel: 'Saiba mais',
      price: 'Incluído no plano',
    },
  ],
  proText: 'Com a Prosat, você não precisa esperar algo acontecer para agir. O sistema te avisa primeiro — ignição, movimentação fora da cerca, localização em tempo real. Tudo no seu celular, 24h por dia.',
  cta: {
    headline: 'Ainda com dúvidas? Fale com a nossa equipe.',
    description: 'Nossos especialistas estão prontos para ajudar você a escolher a melhor solução.',
    orcamentoLabel: 'Ver Planos e Preços',
    orcamentoLink: '/#orcamento',
    whatsappMessage: 'Olá, gostaria de saber mais sobre as soluções da Prosat.',
  },
}

// ─────────────────────────────────────────────
// PÁGINA — SEJA PARCEIRO
// ─────────────────────────────────────────────
export const sejaParceiroPagina = {
  meta: {
    title: 'Seja Parceiro — Prosat',
    description: 'Seja um parceiro Prosat e ofereça soluções de rastreamento veicular de qualidade para seus clientes.',
  },
  hero: {
    label: 'Parceria',
    headline: 'Cresça com a Prosat. Juntos, chegamos mais longe.',
    description: 'Programa de parceria para revendedores, instaladores e distribuidores. Comissões atrativas, suporte completo e marca forte para alavancar seu negócio.',
  },
  benefits: [
    {
      title: 'Comissão atrativa',
      body: 'Ganhe por cada cliente indicado ou serviço contratado. Modelo de remuneração claro, transparente e sem complicações.',
    },
    {
      title: 'Suporte completo',
      body: 'Treinamento, material de apoio e equipe dedicada para o parceiro ter sucesso desde o primeiro dia.',
    },
    {
      title: 'Marca consolidada',
      body: 'Associe-se a uma marca reconhecida no mercado de rastreamento veicular com mais de 15 anos de história.',
    },
    {
      title: 'Tecnologia de ponta',
      body: 'Ofereça produtos e serviços com a melhor tecnologia do mercado, com plataforma atualizada e suporte técnico.',
    },
  ],
  form: {
    headline: 'Quero ser parceiro',
    description: 'Preencha seus dados e entraremos em contato para apresentar o programa completo.',
    namePlaceholder: 'Seu nome completo',
    companyPlaceholder: 'Empresa (opcional)',
    phonePlaceholder: 'Telefone / WhatsApp',
    cityPlaceholder: 'Cidade e Estado',
    messagePlaceholder: 'Conte como você pretende atuar como parceiro...',
    submitLabel: 'Enviar solicitação',
    successMessage: 'Solicitação recebida! Entraremos em contato em breve.',
  },
  whatsappMessage: 'Olá, gostaria de saber mais sobre o programa de parceria da Prosat.',
}

// ─────────────────────────────────────────────
// PÁGINAS DE INSTALAÇÃO (Caminhão, Utilitário, Carro Leve, Moto)
// Cada chave corresponde à rota em /instalacao/[chave].
// ─────────────────────────────────────────────
export interface InstallationFeature {
  title: string
  description: string
}

export interface InstallationPageContent {
  vehicleType: string
  meta: { title: string; description: string }
  heroLabel: string
  heroTitleLine: string
  heroTitleHighlight: string
  heroDescription: string
  image: { src: string; alt: string; placeholderText: string }
  features: InstallationFeature[]
  ctaTitle: string
  ctaDescription: string
}

export const installationPages: Record<string, InstallationPageContent> = {
  caminhao: {
    vehicleType: 'Caminhão',
    meta: {
      title: 'Rastreamento para Caminhão — Prosat',
      description: 'Solução completa de rastreamento para caminhões. Monitoramento 24h, instalação rápida e suporte especializado.',
    },
    heroLabel: 'Instalação',
    heroTitleLine: 'Rastreamento para',
    heroTitleHighlight: 'Caminhão',
    heroDescription:
      'Rastreamento profissional pensado para quem depende da carga para trabalhar. Acompanhe a localização do seu caminhão em tempo real, receba alertas de rota e tenha a tranquilidade de saber onde seu veículo está a qualquer momento.',
    image: {
      src: '/images/instalacao/caminhao.jpg',
      alt: 'Caminhão com rastreador instalado',
      placeholderText: 'Imagem caminhão com rastreador • 700×450',
    },
    features: [
      { title: 'Instalação rápida', description: 'Equipe técnica especializada realiza a instalação sem burocracia, com o mínimo de tempo parado do seu veículo.' },
      { title: 'Monitoramento 24h', description: 'O rastreador acompanha seu caminhão dia e noite, com localização atualizada em tempo real direto no app.' },
      { title: 'Suporte especializado', description: 'Conte com uma equipe que entende do seu negócio para tirar dúvidas e ajudar sempre que precisar.' },
    ],
    ctaTitle: 'Pronto para proteger seu caminhão?',
    ctaDescription: 'Fale com a gente e receba uma proposta personalizada para o seu caminhão ou para a sua frota.',
  },
  utilitario: {
    vehicleType: 'Utilitário',
    meta: {
      title: 'Rastreamento para Utilitário — Prosat',
      description: 'Solução completa de rastreamento para utilitários e vans. Monitoramento 24h e instalação rápida.',
    },
    heroLabel: 'Instalação',
    heroTitleLine: 'Rastreamento para',
    heroTitleHighlight: 'Utilitário',
    heroDescription:
      'Solução de rastreamento feita para quem usa o utilitário como ferramenta de trabalho. Monitore a localização, acompanhe rotas e mantenha o controle total da sua operação.',
    image: {
      src: '/images/instalacao/utilitario.jpg',
      alt: 'Utilitário com rastreador instalado',
      placeholderText: 'Imagem utilitário com rastreador • 700×450',
    },
    features: [
      { title: 'Instalação rápida', description: 'Processo ágil, sem burocracia e com pouquíssimo tempo de veículo parado.' },
      { title: 'Monitoramento 24h', description: 'Seu utilitário rastreado o tempo todo, com localização em tempo real pelo aplicativo.' },
      { title: 'Gestão de frota', description: 'Acompanhe um ou vários veículos no mesmo painel, com relatórios simples e objetivos.' },
    ],
    ctaTitle: 'Pronto para proteger seu utilitário?',
    ctaDescription: 'Fale com a gente e receba uma proposta personalizada para o seu utilitário ou para a sua frota.',
  },
  'carro-leve': {
    vehicleType: 'Carro Leve',
    meta: {
      title: 'Rastreamento para Carro Leve — Prosat',
      description: 'Solução completa de rastreamento para carros de passeio. Monitoramento 24h e app intuitivo.',
    },
    heroLabel: 'Instalação',
    heroTitleLine: 'Rastreamento para',
    heroTitleHighlight: 'Carro Leve',
    heroDescription:
      'Rastreamento pensado para o seu dia a dia. Tenha a localização do seu carro sempre à mão, com um aplicativo simples e alertas que avisam qualquer movimentação fora do comum.',
    image: {
      src: '/images/instalacao/carro-leve.jpg',
      alt: 'Carro leve com rastreador instalado',
      placeholderText: 'Imagem carro leve com rastreador • 700×450',
    },
    features: [
      { title: 'Rastreador discreto', description: 'Instalação profissional, sem alterar a aparência ou o funcionamento do seu carro.' },
      { title: 'App completo', description: 'Acompanhe a localização e o histórico de trajetos direto no celular.' },
      { title: 'Alertas automáticos', description: 'Notificações de ignição, cerca virtual e movimentação suspeita em tempo real.' },
    ],
    ctaTitle: 'Pronto para proteger seu carro?',
    ctaDescription: 'Fale com a gente e receba uma proposta personalizada para o seu carro.',
  },
  moto: {
    vehicleType: 'Moto',
    meta: {
      title: 'Rastreamento para Moto — Prosat',
      description: 'Solução completa de rastreamento para motos. Proteção discreta e monitoramento 24h.',
    },
    heroLabel: 'Instalação',
    heroTitleLine: 'Rastreamento para',
    heroTitleHighlight: 'Moto',
    heroDescription:
      'Proteção discreta e eficiente pensada para a rotina de quem anda de moto. Rastreador de alta precisão, fácil de instalar e pronto para te avisar em caso de movimentação fora do comum.',
    image: {
      src: '/images/instalacao/moto.jpg',
      alt: 'Moto com rastreador instalado',
      placeholderText: 'Imagem moto com rastreador • 700×450',
    },
    features: [
      { title: 'Alta precisão', description: 'Localização exata da sua moto, mesmo em áreas urbanas com muitos obstáculos.' },
      { title: 'Baixo consumo', description: 'Tecnologia pensada para não pesar na bateria da moto, com autonomia prolongada.' },
      { title: 'Recuperação rápida', description: 'Em caso de furto, nossa equipe te ajuda a acionar a recuperação com agilidade.' },
    ],
    ctaTitle: 'Pronto para proteger sua moto?',
    ctaDescription: 'Fale com a gente e receba uma proposta personalizada para a sua moto.',
  },
}

// ─────────────────────────────────────────────
// PÁGINA — CONTATO
// ─────────────────────────────────────────────
export const contatoPagina = {
  meta: {
    title: 'Contato — Prosat',
    description: 'Entre em contato com a Prosat. Atendimento por WhatsApp, telefone e e-mail.',
  },
  hero: {
    label: 'Fale conosco',
    headline: 'Estamos prontos para ajudar.',
    description: 'Nossa equipe de atendimento está disponível de segunda a sexta, das 8h às 18h.',
  },
  info: {
    whatsappDisplay: '(11) 95920-0609',
    email: 'prosat.rastreamentobr@gmail.com',
    address: 'São Paulo, SP — Brasil',
    hours: 'Seg–Sex: 8h às 18h',
  },
  form: {
    headline: 'Envie uma mensagem',
    namePlaceholder: 'Seu nome completo',
    phonePlaceholder: 'Telefone / WhatsApp',
    emailPlaceholder: 'Seu e-mail',
    subjectPlaceholder: 'Assunto',
    messagePlaceholder: 'Escreva sua mensagem aqui...',
    submitLabel: 'Enviar mensagem',
    successMessage: 'Mensagem recebida! Retornaremos em breve.',
  },
  whatsappMessage: 'Olá, gostaria de entrar em contato com a Prosat.',
}
