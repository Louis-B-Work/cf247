import type { IconName } from '../components/ui/Icon'
import { siteUrl } from '../lib/utils'

export type NavLink = { label: string; href: string }

export type NavColumn = { title: string; links: NavLink[] }

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
  feature: NavFeature
  /** Catch-all link shown along the bottom of the desktop dropdown. */
  all: NavLink
}

const l = (label: string, path: string): NavLink => ({ label, href: siteUrl(path) })

export const navItems: NavItem[] = [
  {
    id: 'finance',
    label: 'Finance',
    all: l('Compare all finance options', '/car-finance-options-explained'),
    columns: [
      {
        title: 'Car finance',
        links: [
          l('How it works', '/how-it-works'),
          l('Finance options explained', '/car-finance-options-explained'),
          l('HP car finance', '/hire-purchase'),
          l('PCP car finance', '/pcp-personal-contract-purchase'),
          l('Refinance my car', '/refinance-car-finance'),
          l('No deposit car finance', '/no-deposit-car-finance'),
          l('Value my car', '/valuations'),
        ],
      },
      {
        title: 'Bad credit',
        links: [
          l('Bad credit car finance', '/bad-credit-car-finance'),
          l('Bad credit van finance', '/bad-credit-van-finance'),
          l('Bad credit motorbike finance', '/bad-credit-motorbike-finance'),
          l('Car finance with an IVA', '/guide/can-you-get-car-finance-with-an-iva'),
          l('Car finance with a CCJ', '/guide/car-finance-with-a-ccj'),
          l('Car finance with a default', '/guide/car-finance-with-a-default'),
          l('PCP with bad credit', '/guide/can-i-get-pcp-car-finance-with-bad-credit'),
        ],
      },
      {
        title: 'By vehicle',
        links: [
          l('Used car finance', '/used-car-finance'),
          l('Electric car finance', '/electric-car-finance'),
          l('Hybrid car finance', '/hybrid-car-finance'),
          l('Van finance', '/van-finance'),
          l('Motorbike finance', '/motorbike-finance'),
          l('Motorhome finance', '/motorhome-finance'),
          l('Caravan finance', '/caravan-finance'),
          l('Business car finance', '/business-car-finance'),
          l('Business van finance', '/business-van-finance'),
        ],
      },
      {
        title: 'Locations',
        links: [
          l('London', '/location/london'),
          l('Birmingham', '/location/birmingham'),
          l('Manchester', '/location/manchester'),
          l('Glasgow', '/location/glasgow'),
          l('Leeds', '/location/leeds'),
          l('Nottingham', '/location/nottingham'),
          l('All locations', '/locations'),
        ],
      },
    ],
    feature: {
      title: 'Been refused elsewhere?',
      body: 'Some of our lenders specialise in helping people with bad credit.',
      cta: 'Get my quote',
      href: 'https://apply.carfinance247.co.uk/',
      icon: 'shield',
    },
  },
  {
    id: 'calculator',
    label: 'Calculator',
    all: l('Open the car finance calculator', '/car-finance-calculator'),
    columns: [
      {
        title: 'Calculators',
        links: [
          l('Car finance calculator', '/car-finance-calculator'),
          l('Car refinance calculator', '/car-refinance-calculator'),
          l('Van finance calculator', '/van-finance-calculator'),
          l('Motorbike finance calculator', '/motorbike-finance-calculator'),
        ],
      },
      {
        title: 'Before you calculate',
        links: [
          l('What is APR?', '/guides'),
          l('What credit score do I need?', '/guide/what-credit-score-is-needed-for-car-finance'),
          l('Refinance a balloon payment', '/guide/can-i-refinance-my-balloon-payment-on-a-pcp'),
        ],
      },
    ],
    feature: {
      title: 'What could you borrow?',
      body: 'Set your budget, term and credit profile to see estimated monthly repayments in seconds.',
      cta: 'Open the calculator',
      href: siteUrl('/car-finance-calculator'),
      icon: 'car',
    },
  },
  {
    id: 'help',
    label: 'Help & Guidance',
    all: l('Browse all help & guides', '/guides'),
    columns: [
      {
        title: 'Topics',
        links: [
          l('Am I eligible?', '/guide/am-i-eligible'),
          l('Choosing a vehicle', '/guide/choosing-a-vehicle'),
          l('Finance options', '/guide/finance-options'),
          l('Looking to upgrade', '/guide/looking-to-upgrade'),
          l('My credit', '/guide/my-credit'),
          l('Video library', '/videos'),
          l('Blog', '/blog'),
          l('All help & guides', '/guides'),
        ],
      },
      {
        title: 'Popular questions',
        links: [
          l('Can you swap a car on finance?', '/guide/can-you-swap-a-car-on-finance'),
          l('What credit score is needed?', '/guide/what-credit-score-is-needed-for-car-finance'),
          l('Do I need a driving licence?', '/guide/do-i-need-a-driving-licence-to-get-car-finance'),
          l('Can I refinance my balloon payment?', '/guide/can-i-refinance-my-balloon-payment-on-a-pcp'),
        ],
      },
    ],
    feature: {
      title: 'Talk it through',
      body: 'Got a question about your quote or car finance? Get in touch and our team will be happy to help.',
      cta: 'Contact us',
      href: siteUrl('/contact-us'),
      icon: 'people',
    },
  },
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
