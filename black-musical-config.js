// Fim da Black Musical: virada de 30/11 para 01/12, em São Paulo. (Novembro tem 30 dias.)
export const BLACK_MUSICAL_START = '2026-11-11T00:00:00-03:00'
export const BLACK_MUSICAL_END = '2026-12-01T00:00:00-03:00'
export const BLACK_MUSICAL_GROUP = 'https://chat.whatsapp.com/JAUoLO33t1t4VnjHUsxeFb'

export function countdownParts(now, target = BLACK_MUSICAL_END) {
  const seconds = Math.max(0, Math.floor((Date.parse(target) - now) / 1000))
  return [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60]
}
