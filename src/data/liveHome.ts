import type { NavItem } from './nav'
import { siteUrl } from '../lib/utils'

/*
 * The live homepage (www.carfinance247.co.uk) header menus and page meta, word for word. The settings cog's "Exact replica"
 * itself is now a snapshot of the live page (see src/components/live/LiveSite.tsx); these feed the other designs.
 * Change them only if the live page changes.
 */

export const livePage = {
  title: 'Car Finance Freedom | Compare Car Loans',
  description:
    'Looking for car finance? Get a no obligation quote today. We compare over 275 car finance products from a wide panel of lenders. No deposit options. All circumstances considered.',
}

const l = (label: string, path: string) => ({ label, href: path.startsWith('http') ? path : siteUrl(path) })

/** The live header menus: one flat list each, in the live order, with no column titles or promo cards. */
export const liveNavItems: NavItem[] = [
  {
    id: 'car-finance',
    label: 'Car Finance',
    columns: [
      {
        links: [
          l('How It Works', '/how-it-works'),
          l('Car Finance Options Explained', '/car-finance-options-explained'),
          l('HP Car Finance', '/hire-purchase'),
          l('PCP Car Finance', '/pcp-personal-contract-purchase'),
          l('Refinance My Car', '/refinance-car-finance'),
          l('No Deposit Car Finance', '/no-deposit-car-finance'),
          l('Value My Car', '/valuations'),
          l('Business Car Finance', '/business-car-finance'),
          l('Business Van Finance', '/business-van-finance'),
          l('Used Car Finance', '/used-car-finance'),
          l('Electric Car Finance', '/electric-car-finance'),
          l('Hybrid Car Finance', '/hybrid-car-finance'),
          l('Van Finance', '/van-finance'),
          l('Motorbike Finance', '/motorbike-finance'),
          l('Motorhome Finance', '/motorhome-finance'),
          l('Caravan Finance', '/caravan-finance'),
          l('All Locations', '/locations'),
          l('London', '/location/london'),
          l('Birmingham', '/location/birmingham'),
          l('Glasgow', '/location/glasgow'),
          l('Manchester', '/location/manchester'),
          l('Nottingham', '/location/nottingham'),
          l('Leeds', '/location/leeds'),
        ],
      },
    ],
  },
  {
    id: 'bad-credit',
    label: 'Bad Credit',
    columns: [
      {
        links: [
          l('Bad Credit Car Finance', '/bad-credit-car-finance'),
          l('Bad Credit Motorbike Finance', '/bad-credit-motorbike-finance'),
          l('Bad Credit Van Finance', '/bad-credit-van-finance'),
          l('Can You Get Car Finance with an IVA?', '/guide/can-you-get-car-finance-with-an-iva'),
          l('Car Finance With a CCJ', '/guide/car-finance-with-a-ccj'),
          l('Can I get PCP car finance with bad credit?', '/guide/can-i-get-pcp-car-finance-with-bad-credit'),
          l('Car finance with a Default', '/guide/car-finance-with-a-default'),
          l('View all guides', '/guides'),
        ],
      },
    ],
  },
  {
    id: 'calculator',
    label: 'Car Finance Calculator',
    columns: [
      {
        links: [
          l('Car Finance Calculator', '/car-finance-calculator'),
          l('Car Refinance Calculator', '/car-refinance-calculator'),
          l('Motorbike Finance Calculator', '/motorbike-finance-calculator'),
          l('Van Finance Calculator', '/van-finance-calculator'),
        ],
      },
    ],
  },
  {
    id: 'help',
    label: 'Help & Guides',
    columns: [
      {
        links: [
          l('All Help & Guides', '/guides'),
          l('Video Library', '/videos'),
          l('Am I Eligible?', '/guide/am-i-eligible'),
          l('Choosing a Vehicle', '/guide/choosing-a-vehicle'),
          l('Finance Options', '/guide/finance-options'),
          l('Looking to Upgrade', '/guide/looking-to-upgrade'),
          l('My Credit', '/guide/my-credit'),
          l('Can you swap a car on finance?', '/guide/can-you-swap-a-car-on-finance'),
          l('What credit score is needed for car finance?', '/guide/what-credit-score-is-needed-for-car-finance'),
          l('Can I Refinance my Balloon Payment on a PCP?', '/guide/can-i-refinance-my-balloon-payment-on-a-pcp'),
          l('Do I need a driving licence to get car finance?', '/guide/do-i-need-a-driving-licence-to-get-car-finance'),
          l('View all guides', '/guides'),
        ],
      },
    ],
  },
  {
    id: 'company',
    label: 'Company',
    columns: [
      {
        links: [
          l('Our Story', '/about'),
          l('Customer Stories', '/customer-stories'),
          l('Contact Us', '/contact-us'),
          l('Press', '/press'),
          l('Blog', '/blog'),
          l('Careers', 'https://jobs.carfinance247.co.uk'),
        ],
      },
    ],
  },
]
