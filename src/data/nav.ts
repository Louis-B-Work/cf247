import type { IconName } from '../components/ui/Icon'
import { siteUrl } from '../lib/utils'
import { liveNavItems } from './liveHome'

export type NavLink = { label: string; href: string }

export type NavColumn = { title?: string; links: NavLink[] }

export type NavFeature = {
  title: string
  body: string
  cta: string
  href: string
  icon: IconName
}

export type NavItem = {
  id: string
  label: string
  columns: NavColumn[]
  /** Promo card beside the links (redesign only). */
  feature?: NavFeature
  /** Catch-all link shown along the bottom of the desktop dropdown (redesign only). */
  all?: NavLink
}

const l = (label: string, path: string): NavLink => ({ label, href: siteUrl(path) })

/** Promo cards shown beside the redesign's dropdown links, keyed by menu. */
const features: Record<string, NavFeature> = {
  'car-finance': {
    title: 'Been refused elsewhere?',
    body: 'Some of our lenders specialise in helping people with bad credit.',
    cta: 'Get my quote',
    href: 'https://apply.carfinance247.co.uk/',
    icon: 'shield',
  },
  'bad-credit': {
    title: 'Been refused elsewhere?',
    body: 'Some of our lenders specialise in helping people with bad credit.',
    cta: 'Get my quote',
    href: 'https://apply.carfinance247.co.uk/',
    icon: 'shield',
  },
  calculator: {
    title: 'What could you borrow?',
    body: 'Set your budget, term and credit profile to see estimated monthly repayments in seconds.',
    cta: 'Open the calculator',
    href: siteUrl('/car-finance-calculator'),
    icon: 'car',
  },
  help: {
    title: 'Talk it through',
    body: 'Got a question about your quote or car finance? Get in touch and our team will be happy to help.',
    cta: 'Contact us',
    href: siteUrl('/contact-us'),
    icon: 'people',
  },
}

/**
 * The redesign's menus: the live site's Car Finance, Bad Credit, Car Finance Calculator and Help & Guides menus
 * (same labels and links, in the live order, shared with the Exact replica option), each with a promo card,
 * followed by the redesign's own Team247 menu.
 */
export const navItems: NavItem[] = [
  ...liveNavItems
    .filter((item) => item.id !== 'company')
    .map((item) => ({ ...item, feature: features[item.id] })),
  {
    id: 'life',
    label: 'Team247',
    all: l('Meet the team behind Car Finance 247', '/about'),
    columns: [
      {
        title: 'About us',
        links: [
          l('Our story', '/about'),
          l('Customer stories', '/customer-stories'),
          l('Press', '/press'),
        ],
      },
      {
        title: 'Work with us',
        links: [l('Careers', 'https://jobs.carfinance247.co.uk'), l('Contact us', '/contact-us')],
      },
    ],
    feature: {
      title: 'Proudly Mancunian',
      body: 'Founded in Manchester by brothers Reg and Louis Rix, helping 500,000+ customers and counting.',
      cta: 'Read our story',
      href: siteUrl('/about'),
      icon: 'heart',
    },
  },
]

export const signInUrl = 'https://my.carfinance247.co.uk/'
export const quoteUrl = 'https://apply.carfinance247.co.uk/?option=monthly'

/** The apply form pre-fills its loan amount from `monthlyBudget` (it borrows budget × 60 months). */
export const quoteUrlWithBudget = (monthlyBudget: number) => `${quoteUrl}&monthlyBudget=${monthlyBudget}`
