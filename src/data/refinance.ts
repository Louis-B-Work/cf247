import type { FaqCategory } from './faqs'
import { siteUrl } from '../lib/utils'

/** The live refinance landing page sends every call to action to this quote journey. */
export const refinanceQuoteUrl = 'https://apply.carfinance247.co.uk/?submissionTypeId=1'

/** Representative APR used on the live refinance page. */
export const refinanceApr = 15.5

const dA = (path: string) => `https://www.carfinance247.co.uk/dA/${path}`

export const refinanceImages = {
  hero: {
    src: dA('0f6b155070/Car%20Finance%20247%20-%20Day%20144913.jpg/webp'),
    alt: 'A family laughing together beside their white car outside home',
  },
  why: {
    src: dA('d61c7d31ff/whycf247_girl.png/webp'),
    alt: 'Car Finance 247 customer standing in front of her car',
  },
}

export const heroBullets = ['Keep your current car', 'Spread your final payment', 'Switch to a new deal']

/*
 * All copy below is word for word from the live page (carfinance247.co.uk/refinance), kept the same for SEO.
 * Change it only if the live page changes.
 */

export const pageTitle = 'Refinance My Car | Switch Your Loan Today'

export const heroDisclaimer = {
  lead: 'No impact on your credit score.',
  body: 'We use a soft search to give you a quote. If you proceed, a hard search will be conducted which may impact your credit score.',
  apr: 'Representative 15.5% APR.',
  broker: 'Car Finance 247 Limited is a credit broker not a lender.',
}

export const reasons = [
  { title: 'To keep their current car', icon: 'car' as const },
  { title: 'To finance a balloon payment on a', link: 'Personal Contract Purchase (PCP)', after: 'deal', icon: 'gem' as const },
  { title: 'To lower their monthly payments (if eligible)', icon: 'heart' as const },
  { title: 'To see if they could secure a better deal', icon: 'search' as const },
]

export const pros = [
  {
    title: 'Reduce Your Monthly Payments',
    body: 'See if you could lower your monthly repayments by spreading the cost over a new finance term that better suits your budget.',
  },
  {
    title: 'Manage Your PCP Balloon Payment',
    body: 'Turn your PCP balloon payment into more affordable monthly instalments, making your final lump sum easier to manage.',
  },
  {
    title: 'Potentially Lower Your Interest Rate',
    body: 'If your credit score has improved since you took out your original agreement, you may be eligible for a more competitive interest rate.',
  },
]

export const cons = [
  {
    title: 'Savings Aren’t Guaranteed',
    body: 'Spreading your outstanding loan over a longer term can reduce the monthly payment but may increase the total amount of interest payable.',
  },
  {
    title: 'Early Repayment Fees',
    body: 'If you’re thinking about refinancing, it’s a good idea to find out if there are any early repayment charges.',
  },
  {
    title: 'Offers Vary by Customer',
    body: 'Eligibility, rates, and terms depend on your credit history and are subject to lender checks.',
  },
]

export const howItWorks = [
  { title: 'Get Approved', body: 'Make a quick application and get a decision in minutes.' },
  { title: 'Switch Your Deal', body: 'We\'ll work with your current lender to settle your existing finance.' },
  { title: 'Keep Your Car', body: 'Stay behind the wheel of the car you love, just with a deal that suits you better.' },
]

export const whyPoints = [
  {
    title: 'Finding You the Best Deal',
    body: 'We search our wide panel of lenders to get you the best deal for your circumstances!',
    icon: 'search' as const,
  },
  {
    title: 'Personalised Support',
    body: 'You\'ll have a dedicated account manager on hand to provide expert support and to help guide you through the process.',
    icon: 'people' as const,
  },
  {
    title: 'Convenience',
    body: 'Once provisionally approved, you\'re free to go at your own pace and on your terms.',
    icon: 'heart' as const,
  },
  {
    title: 'Product Choice',
    body: 'Choose from Hire Purchase and PCP finance options designed to fit your budget and preferences.',
    icon: 'car' as const,
  },
  {
    title: 'Trust',
    body: 'With over 500,000+ satisfied customers across the UK, we\'re a brand you can rely on.',
    icon: 'shield' as const,
  },
]

export const testimonial = {
  quote: 'It was stress-free, really helpful and I would definitely recommend',
  name: 'Hannah',
  detail: 'Bought a Fiat 500',
}

/** The live page's Trustpilot band heading. */
export const trustpilotHeading = 'Rated Excellent by 59,096 Customers – 4.9 Out of 5 on Trustpilot'

export const commissionNote =
  'We look to find the best rate from our panel of lenders and will offer you the best deal that you\'re eligible for. We will be paid a commission for providing our services and this commission may be a fixed amount or a percentage of the amount borrowed. The interest rate you pay is directly linked to the amount you are borrowing and your individual credit status.'

export const refinanceFaqs: FaqCategory[] = [
  {
    id: 'refinance',
    label: 'Refinancing',
    items: [
      {
        q: 'Can I refinance my existing car?',
        a: [
          'Yes, you could refinance your existing car. Car refinancing just means taking out a new car finance deal to pay off your current one. There are several reasons you might want to refinance your car. You might want to get lower monthly payments, change the length of your loan, or potentially get a better interest rate than the one you currently have. However, it\'s important to remember that spreading your outstanding loan over a longer term can reduce the monthly payment but may increase the total amount of interest payable.',
        ],
      },
      {
        q: 'Does refinancing lower your monthly payment?',
        a: [
          'Some people choose to refinance their car if they are able to lower their monthly payments. This could be possible if they are offered a lower interest rate or pick a longer repayment period. But remember, a lower monthly cost could mean paying more overall by the end of the agreement, depending on the car refinance terms. It’s important to look at the total cost as well as the monthly cost.',
        ],
      },
      {
        q: 'Can you refinance a PCP agreement?',
        a: [
          'At the end of a PCP deal, you may be able to refinance the final balloon payment if you want to keep the car at the end but can’t pay the lump sum in one go. You may also be able to refinance a car during your PCP agreement to adjust your monthly payments. But, whether you can refinance your car under a PCP deal will depend on your agreement and personal circumstances. It’s important to remember that that spreading your balloon payment over a longer term can reduce the monthly payment but may increase the total amount of interest payable.',
        ],
      },
    ],
  },
]

/** Footer footnote for the asterisked claim, as on the live page. */
export const footerNotes = [
  '* The UK\'s largest online car finance broker by unique users to the website. Based on Similar Web data – 1,184,130 to Car Finance 247 vs. 658,656 for nearest competitor. December 2024 to May 2025.',
]

export const guideLinks = {
  balloon: siteUrl('/guide/can-i-refinance-my-balloon-payment-on-a-pcp'),
  pcp: siteUrl('/pcp-personal-contract-purchase'),
  creditScore: siteUrl('/guide/what-credit-score-is-needed-for-car-finance'),
}

/** Calculator copy, settings and help text from the live refinance calculator. */
export const calculator = {
  title: 'Refinance Calculator',
  intro: 'Run an illustrative quote to see how much you could save*',
  existingTitle: 'Your Existing Finance',
  currentLabel: 'Current Monthly Payments',
  settlementLabel: 'Early Settlement Figure',
  settlementHint: 'An estimate is fine if you don\'t know the exact figure.',
  newTitle: 'Calculate Your New Finance Deal',
  termLabel: 'Finance Term (Months)',
  terms: [24, 36, 48, 60],
  profileLabel: 'Your Credit Profile',
  /** Illustrative APR by credit profile, as on the live calculator. */
  profiles: [
    { id: 'Excellent', apr: 11.9 },
    { id: 'Good', apr: 11.9 },
    { id: 'Fair', apr: 14.9 },
    { id: 'Poor', apr: 19.9 },
  ],
  productLabel: 'Finance Product',
  /** PCP optional final payment as a share of the amount financed, by term in months. */
  balloonShare: { 24: 0.6588127, 36: 0.5549655, 48: 0.45976, 60: 0.3773218 } as Record<number, number>,
  optionFee: 10,
  apply: 'Apply Now',
  breakdownTitle: 'New Deal Breakdown',
  mileageTitle: 'Excess Mileage Charges',
  mileageBody: 'If you exceed your maximum mileage for your PCP agreement you may need to pay an excess mileage charge, which may vary between lenders.',
  repExample:
    'Rates from 9.9% APR. Representative Example: Borrow £14,000 over 5 years with a £0 deposit. Representative 15.5% APR fixed rate. Monthly payment: £329.37. Option to purchase fee £10 payable. Total cost of credit: £5,772.20. Total amount repayable: £19,772.20.',
  footnote:
    '*Please bear in mind that spreading your outstanding loan over a longer term can reduce the monthly payment but may increase the total amount of interest payable.',
  subjectToStatus: 'Credit is subject to status.',
  help: {
    settlement: {
      title: 'How to Get Your Early Settlement Figure',
      body: [
        'To get your early settlement figure, you\'ll need to contact your current finance provider directly. They will be able to tell you the exact amount needed to pay off your finance agreement early.',
        'You can usually find your finance provider\'s contact details on your finance agreement or on recent statements. Many providers also offer this information through their online portal or mobile app.',
      ],
    },
    credit: {
      title: 'What Is a Credit Score?',
      body: [
        'Your credit score is based on your payment history (paying bills on time), debt levels, length of credit history, types of credit, and recent credit inquiries.',
      ],
      link: { label: 'Improve my Credit Score', href: siteUrl('/guide/how-to-improve-your-credit-score') },
    },
    product: {
      title: 'What Finance Options Are Available?',
      body: [
        'HP (Hire Purchase): involves making regular monthly payments until you\'ve covered the full cost of the car. Once all payments are made, you own the car outright.',
        'PCP (Personal Contract Purchase): involves making lower monthly payments compared to HP. At the end of the contract, you have the choice to either buy the car by making a final balloon payment or return it.',
      ],
    },
    apr: {
      title: 'APR',
      body: [
        'APR (Annual Percentage Rate) is the total cost of borrowing, shown as a percentage. It includes interest and helps you compare and understand how much a loan will cost annually.',
      ],
    },
  },
}