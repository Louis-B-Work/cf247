/**
 * Loads Neulis Neue from the Adobe Fonts web project.
 */
export function loadBrandFonts() {
  const kitId = import.meta.env.VITE_TYPEKIT_ID || 'kvt3yqx'

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://use.typekit.net/${kitId}.css`
  link.onload = () => document.documentElement.classList.add('has-neulis')
  document.head.appendChild(link)
}
