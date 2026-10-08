import { useSyncExternalStore } from 'react'

/** Reads a settings-cog test option from <html data-*> and re-renders when the cog changes it. */
export function useTestOption(attr: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mo = new MutationObserver(onChange)
      mo.observe(document.documentElement, { attributes: true, attributeFilter: [`data-${attr}`] })
      return () => mo.disconnect()
    },
    () => document.documentElement.dataset[attr] ?? '',
  )
}