// ─────────────────────────────────────────────
// CONTEÚDO DA POLÍTICA DE PRIVACIDADE
// ─────────────────────────────────────────────
// Versão simplificada — linguagem direta, sem detalhe técnico de
// cookies/ferramentas específicas. Baseada no funcionamento real do
// site (formulários + cookies de mensuração/publicidade), estruturada
// com referência à LGPD (Lei nº 13.709/2018).
//
// Onde a informação depende de um dado empresarial que não existe no
// projeto (CNPJ, endereço, e-mail de privacidade), o campo aparece
// como [A CONFIRMAR] — substitua antes de publicar.
//
// Ver PRIVACY_AUDIT_REPORT.md na raiz do projeto para o detalhamento
// técnico completo por trás deste texto (não publicado nesta página,
// disponível como referência interna).

export const LAST_UPDATED = '27 de setembro de 2026'

export interface PolicySection {
  id: string
  title: string
  paragraphs?: string[]
  list?: string[]
  paragraphs2?: string[]
}

export const policySections: PolicySection[] = [
  {
    id: 'sobre',
    title: '1. Sobre esta Política',
    paragraphs: [
      'Esta Política explica, de forma simples, quais dados o site da Prosat coleta e como usamos essas informações. Ela foi elaborada com base na Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).',
    ],
  },
  {
    id: 'controlador',
    title: '2. Quem é o responsável pelos dados',
    paragraphs: ['O responsável pelo tratamento dos dados coletados neste site é:'],
    list: [
      'Razão social: [RAZÃO SOCIAL A CONFIRMAR]',
      'CNPJ: [CNPJ A CONFIRMAR]',
      'Contato: prosat.rastreamentobr@gmail.com',
    ],
  },
  {
    id: 'dados-coletados',
    title: '3. Dados coletados',
    paragraphs: ['Coletamos:'],
    list: [
      'Dados que você preenche em um formulário do site (contato, orçamento ou parceria) — como nome, e-mail, telefone e informações relacionadas à sua solicitação (por exemplo, dados do veículo, quando aplicável).',
      'Dados de navegação, coletados automaticamente enquanto você usa o site — como as páginas visitadas e cookies usados para mensuração e publicidade.',
    ],
  },
  {
    id: 'finalidade',
    title: '4. Para que usamos os dados',
    list: [
      'Responder seu contato e elaborar orçamentos.',
      'Dar andamento a negociações comerciais.',
      'Avaliar propostas de parceria.',
      'Medir e melhorar o desempenho das nossas campanhas de anúncios.',
    ],
  },
  {
    id: 'cookies',
    title: '5. Cookies',
    paragraphs: [
      'Usamos cookies e tecnologias semelhantes para o site funcionar corretamente e para medir o desempenho das nossas campanhas de publicidade.',
      'Na primeira visita, exibimos um aviso onde você pode aceitar ou recusar o uso de cookies não essenciais. Essa escolha fica salva no seu navegador e pode ser alterada a qualquer momento.',
    ],
  },
  {
    id: 'compartilhamento',
    title: '6. Compartilhamento de dados',
    paragraphs: [
      'Não vendemos seus dados. Compartilhamos informações apenas com prestadores de serviço que nos ajudam a operar o site, sempre limitado ao necessário:',
    ],
    list: [
      'Ferramentas de análise e publicidade, para entender quais canais trazem contato/orçamento até nós.',
      'Prestadores de tecnologia que processam os formulários enviados pelo site.',
      'Provedor de hospedagem, que mantém o site no ar.',
    ],
  },
  {
    id: 'armazenamento',
    title: '7. Armazenamento e segurança',
    paragraphs: [
      'Seus dados ficam armazenados pelo tempo necessário para cumprir as finalidades descritas nesta Política. Adotamos medidas técnicas e administrativas razoáveis para proteger essas informações — embora nenhum sistema seja 100% imune a incidentes.',
    ],
  },
  {
    id: 'direitos',
    title: '8. Seus direitos',
    paragraphs: ['De acordo com a LGPD, você pode, a qualquer momento:'],
    list: [
      'Confirmar se tratamos algum dado seu, e acessá-lo.',
      'Corrigir dados incompletos ou desatualizados.',
      'Solicitar a exclusão dos seus dados.',
      'Retirar um consentimento dado anteriormente.',
      'Saber com quem compartilhamos suas informações.',
    ],
  },
  {
    id: 'exercicio-direitos',
    title: '9. Como exercer seus direitos',
    paragraphs: ['Entre em contato pelo e-mail abaixo para qualquer solicitação sobre seus dados:'],
    list: ['E-mail: prosat.rastreamentobr@gmail.com'],
  },
  {
    id: 'alteracoes',
    title: '10. Alterações nesta Política',
    paragraphs: [
      'Esta Política pode ser atualizada periodicamente. A data da última atualização está sempre indicada no fim desta página.',
    ],
  },
  {
    id: 'contato',
    title: '11. Contato',
    paragraphs: ['Dúvidas sobre esta Política podem ser enviadas para:'],
    list: ['E-mail: prosat.rastreamentobr@gmail.com'],
  },
]
