import { useEffect, useRef } from 'react'
import behaviours from './live-behaviour.js'
import html from './live-home.html?raw'
import './live-replica.css'
import './live-overrides.css'

/**
 * Settings cog "Homepage content: Exact replica". The live homepage (header, content and footer) exactly as it is on
 * www.carfinance247.co.uk, with only fonts and colours swapped (live-overrides.css), for the first A/B test.
 * The markup, CSS and scripts are a snapshot: refresh them with `npm run live:snapshot`.
 */
export function LiveSite() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = ref.current
    // The scripts bind to the markup once; React's dev double-effect must not bind them twice.
    if (!root || root.dataset.wired) return
    root.dataset.wired = 'true'
    for (const run of behaviours) run()
  }, [])

  return <main id="main" ref={ref} className="live-replica" dangerouslySetInnerHTML={{ __html: html }} />
}
