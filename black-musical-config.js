// Horário provisório: início do dia 11/11, em São Paulo.
export const BLACK_MUSICAL_START = '2026-11-11T00:00:00-03:00'
export const BLACK_MUSICAL_GROUP = 'https://chat.whatsapp.com/JAUoLO33t1t4VnjHUsxeFb'

export function countdownParts(now, target = BLACK_MUSICAL_START) {
  const seconds = Math.max(0, Math.floor((Date.parse(target) - now) / 1000))
  return [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60]
}
