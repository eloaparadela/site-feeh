'use client'

import { useEffect } from 'react'

/**
 * Quando o usuário troca de aba (a página fica em segundo plano), o título da
 * aba passa a exibir uma mensagem de alerta "correndo". Ao voltar para a aba,
 * o título original da página é restaurado.
 *
 * Edite a mensagem em MESSAGE abaixo.
 */
const MESSAGE = 'Seu veículo pode estar desprotegido neste momento'

export default function AwayTitleAlert() {
  useEffect(() => {
    // Separador com espaços para o texto "andar" de forma legível na aba.
    const ticker = `${MESSAGE}     •     `
    let originalTitle = document.title
    let interval: ReturnType<typeof setInterval> | undefined
    let offset = 0

    const stop = () => {
      if (interval) {
        clearInterval(interval)
        interval = undefined
      }
    }

    const start = () => {
      if (interval) return
      offset = 0
      // Empurra 1 caractere por vez → efeito de mensagem passando.
      interval = setInterval(() => {
        document.title = ticker.slice(offset) + ticker.slice(0, offset)
        offset = (offset + 1) % ticker.length
      }, 180)
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        // Saiu da aba: guarda o título real da página atual e começa o alerta.
        if (!interval) originalTitle = document.title
        start()
      } else {
        // Voltou para a aba: para o alerta e restaura o título.
        stop()
        document.title = originalTitle
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      stop()
      document.title = originalTitle
    }
  }, [])

  return null
}
