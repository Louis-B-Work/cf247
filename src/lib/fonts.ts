/**
 * Loads Neulis Neue and Neulis Cursive from an Adobe Fonts web project when
 * VITE_TYPEKIT_ID is set. Without it, the Urbanist fallback in index.css is used.
 */
export function loadBrandFonts() {
  const kitId = import.meta.env.VITE_TYPEKIT_ID as string | undefined
  if (!kitId) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://use.typekit.net/${kitId}.css`
  link.onload = () => document.documentElement.classList.add('has-neulis')
  document.head.appendChild(link)
}
