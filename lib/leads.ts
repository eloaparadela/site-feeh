// ─────────────────────────────────────────────
// Envio de leads dos formulários do site para o
// backend (Supabase Edge Function `submit-lead`),
// que grava em prosat.leads e dispara o e-mail.
// ─────────────────────────────────────────────

// A Edge Function `submit-lead` é pública (não exige chave): ela faz sua própria
// validação e anti-spam. Por isso aqui não há nenhuma chave — apenas a URL pública
// do endpoint, que pode ser sobrescrita por variável de ambiente no build.
const ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_ENDPOINT ??
  'https://vrgdodtixssqqpdpwnys.supabase.co/functions/v1/submit-lead'

export type LeadType = 'orcamento' | 'contato' | 'parceiro'

export interface LeadInput {
  type: LeadType
  name: string
  email?: string
  phone?: string
  /** Campos específicos do formulário (modelo, placa, assunto, empresa, etc.) */
  payload?: Record<string, unknown>
  /** Honeypot anti-spam: deve ficar sempre vazio (preenchido só por bots). */
  honeypot?: string
}

/**
 * Envia um lead. Lança um erro se a requisição falhar — o componente deve
 * tratar e exibir uma mensagem ao usuário.
 */
export async function submitLead(input: LeadInput): Promise<{ ok: true; id?: string }> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: input.type,
      name: input.name,
      email: input.email ?? '',
      phone: input.phone ?? '',
      payload: input.payload ?? {},
      company_website: input.honeypot ?? '', // honeypot
    }),
  })

  if (!res.ok) {
    let detail = ''
    try {
      detail = (await res.json())?.error ?? ''
    } catch {
      /* ignore */
    }
    throw new Error(detail || `Falha no envio (HTTP ${res.status})`)
  }

  return res.json()
}
