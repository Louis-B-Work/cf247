export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export const SITE = 'https://www.carfinance247.co.uk'

export function siteUrl(path: string) {
  return path.startsWith('http') ? path : `${SITE}${path}`
}
