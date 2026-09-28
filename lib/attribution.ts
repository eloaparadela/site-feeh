'use client'

// ─────────────────────────────────────────────
// ATRIBUIÇÃO — UTMs, click IDs, first/last touch, visitor_id
// ─────────────────────────────────────────────
// Camada centralizada de captura e persistência de dados de origem.
// Nenhum componente do site lê query string, referrer ou localStorage
// diretamente — tudo passa por aqui.
//
// O QUE FICA GUARDADO NO NAVEGADOR (localStorage) — nunca PII:
//   prosat_visitor_id    → uuid anônimo, gerado uma vez, para sempre
//   prosat_first_touch   → primeira origem IDENTIFICADA (utm_* ou click id)
//   prosat_last_touch    → última origem identificada (atualiza quando
//                          uma nova origem aparece; visita direta não
//                          sobrescreve)
//   prosat_click_ids     → fbclid/gclid mais recentes capturados
//
// O QUE NUNCA fica em localStorage: nome, e-mail, telefone, mensagem.
//
// Tudo isso é mensuração não essencial — por isso captureAttribution()
// e getVisitorId() só GRAVAM algo depois que o visitante aceita o
// banner de cookies (lib/consent.ts). Sem consentimento, essas funções
// não escrevem nada no navegador (podem gerar um id só em memória,
// pra não quebrar quem chama, mas ele não é salvo).

import { hasMarketingConsent } from './consent'

const STORAGE_KEYS = {
  visitorId: 'prosat_visitor_id',
  firstTouch: 'prosat_first_touch',
  lastTouch: 'prosat_last_touch',
  clickIds: 'prosat_click_ids',
} as const

export interface Touch {
  source: string | null
  medium: string | null
  campaign: string | null
  content: string | null
  term: string | null
  landing_page: string | null
  timestamp: number
}

export interface ClickIds {
  fbclid: string | null
  gclid: string | null
}

function safeGet(key: string): string | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
  } catch {
    return null
  }
}

function safeSet(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined') window.localStorage.setItem(key, value)
  } catch {
    // Privado/bloqueado — segue sem persistir, não quebra o site.
  }
}

function readJson<T>(key: string): T | null {
  const raw = safeGet(key)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

/**
 * ID anônimo do visitante. Gerado uma única vez (crypto.randomUUID) e
 * reutilizado em todas as visitas seguintes. Não é derivado de nenhum
 * dado pessoal.
 */
export function getVisitorId(): string {
  const existing = safeGet(STORAGE_KEYS.visitorId)
  if (existing) return existing
  const id =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `visitor_${Date.now()}_${Math.random().toString(36).slice(2)}`
  if (hasMarketingConsent()) {
    safeSet(STORAGE_KEYS.visitorId, id)
  }
  return id
}

export function getFirstTouch(): Touch | null {
  return readJson<Touch>(STORAGE_KEYS.firstTouch)
}

export function getLastTouch(): Touch | null {
  return readJson<Touch>(STORAGE_KEYS.lastTouch)
}

export function getClickIds(): ClickIds {
  return readJson<ClickIds>(STORAGE_KEYS.clickIds) ?? { fbclid: null, gclid: null }
}

function param(sp: URLSearchParams, key: string): string | null {
  const v = sp.get(key)
  return v && v.trim() !== '' ? v : null
}

/**
 * Roda a cada carregamento/navegação (chamado pelo TrackingProvider).
 * Lê a query string atual e:
 *  - se houver QUALQUER sinal de origem identificável (utm_* ou
 *    fbclid/gclid), grava como last_touch, e como first_touch também
 *    SE ainda não existir um first_touch salvo;
 *  - se não houver nenhum sinal (visita direta/navegação interna),
 *    não mexe em first_touch nem em last_touch — evita que navegação
 *    interna do site apague a origem de campanha já capturada.
 *  - fbclid/gclid são persistidos separadamente e sobrevivem entre
 *    páginas até que um novo valor apareça na URL.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return
  if (!hasMarketingConsent()) return // banner de cookies ainda não aceito — não grava nada

  const sp = new URLSearchParams(window.location.search)
  const utm_source = param(sp, 'utm_source')
  const utm_medium = param(sp, 'utm_medium')
  const utm_campaign = param(sp, 'utm_campaign')
  const utm_content = param(sp, 'utm_content')
  const utm_term = param(sp, 'utm_term')
  const fbclid = param(sp, 'fbclid')
  const gclid = param(sp, 'gclid')

  // Click IDs: persiste o que vier, mantém o anterior se não vier nada novo.
  if (fbclid || gclid) {
    const current = getClickIds()
    safeSet(
      STORAGE_KEYS.clickIds,
      JSON.stringify({
        fbclid: fbclid ?? current.fbclid,
        gclid: gclid ?? current.gclid,
      })
    )
  }

  const hasIdentifiableSource = Boolean(
    utm_source || utm_medium || utm_campaign || utm_content || utm_term || fbclid || gclid
  )
  if (!hasIdentifiableSource) return // visita direta/navegação interna — não sobrescreve nada

  const touch: Touch = {
    source: utm_source,
    medium: utm_medium,
    campaign: utm_campaign,
    content: utm_content,
    term: utm_term,
    landing_page: window.location.pathname,
    timestamp: Date.now(),
  }

  if (!getFirstTouch()) {
    safeSet(STORAGE_KEYS.firstTouch, JSON.stringify(touch))
  }
  safeSet(STORAGE_KEYS.lastTouch, JSON.stringify(touch))
}

/** Referrer da visita ATUAL (não persistido — document.referrer já é nativo do navegador). */
export function getReferrer(): string | null {
  if (typeof document === 'undefined') return null
  return document.referrer && document.referrer !== '' ? document.referrer : null
}

/** Landing page da jornada: a página do first_touch, se existir. */
export function getLandingPage(): string | null {
  return getFirstTouch()?.landing_page ?? null
}

export interface AttributionSnapshot {
  visitor_id: string
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  fbclid: string | null
  gclid: string | null
  landing_page: string | null
  referrer: string | null
  first_touch_source: string | null
  first_touch_medium: string | null
  first_touch_campaign: string | null
  first_touch_content: string | null
  first_touch_term: string | null
  first_touch_landing_page: string | null
  first_touch_timestamp: number | null
  last_touch_source: string | null
  last_touch_medium: string | null
  last_touch_campaign: string | null
  last_touch_content: string | null
  last_touch_term: string | null
  last_touch_landing_page: string | null
  last_touch_timestamp: number | null
}

/**
 * Foto completa da atribuição no momento da chamada. Usada por
 * lib/tracking.ts para enriquecer Contact/Lead — os componentes do
 * site nunca chamam isso diretamente.
 */
export function getAttributionSnapshot(): AttributionSnapshot {
  const sp = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const clickIds = getClickIds()
  const first = getFirstTouch()
  const last = getLastTouch()

  return {
    visitor_id: getVisitorId(),
    utm_source: param(sp, 'utm_source'),
    utm_medium: param(sp, 'utm_medium'),
    utm_campaign: param(sp, 'utm_campaign'),
    utm_content: param(sp, 'utm_content'),
    utm_term: param(sp, 'utm_term'),
    fbclid: clickIds.fbclid,
    gclid: clickIds.gclid,
    landing_page: getLandingPage(),
    referrer: getReferrer(),
    first_touch_source: first?.source ?? null,
    first_touch_medium: first?.medium ?? null,
    first_touch_campaign: first?.campaign ?? null,
    first_touch_content: first?.content ?? null,
    first_touch_term: first?.term ?? null,
    first_touch_landing_page: first?.landing_page ?? null,
    first_touch_timestamp: first?.timestamp ?? null,
    last_touch_source: last?.source ?? null,
    last_touch_medium: last?.medium ?? null,
    last_touch_campaign: last?.campaign ?? null,
    last_touch_content: last?.content ?? null,
    last_touch_term: last?.term ?? null,
    last_touch_landing_page: last?.landing_page ?? null,
    last_touch_timestamp: last?.timestamp ?? null,
  }
}

/**
 * Normaliza o nome de exibição do veículo (ex: "Carro Leve") pra um
 * slug estável (ex: "carro"). Só mapeia os 4 tipos que o site vende —
 * não inventa/adivinha fora disso.
 */
export function normalizeVehicleType(display: string | undefined | null): string | undefined {
  if (!display) return undefined
  const map: Record<string, string> = {
    'Carro Leve': 'carro',
    Moto: 'moto',
    Caminhão: 'caminhao',
    Utilitário: 'utilitario',
  }
  return map[display] ?? undefined
}
