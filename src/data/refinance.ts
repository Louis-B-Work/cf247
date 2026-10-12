import type { FaqCategory } from './faqs'
import { siteUrl } from '../lib/utils'

/** The live refinance landing page sends every call to action to this quote journey. */
export const refinanceQuoteUrl = 'https://apply.carfinance247.co.uk/?submissionTypeId=1'

/** Representative APR used on the live refinance page and in the illustrative calculator. */
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

export const reasons = [
  { title: 'Keep your current car', icon: 'car' as const },
  { title: 'Finance a PCP balloon payment', icon: 'gem' as const },
  { title: 'Lower your monthly payments, if eligible', icon: 'heart' as const },
  { title: 'See if you could get a better deal', icon: 'search' as const },
]

export const pros = [
  {
    title: 'Reduce your monthly payments',
    body: 'See if you could lower your monthly repayments by spreading the cost over a new finance term that better suits your budget.',
  },
  {
    title: 'Manage your PCP balloon payment',
    body: 'Turn your PCP balloon payment into more affordable monthly instalments, making your final lump sum easier to manage.',
  },
  {
    title: 'Potentially lower your interest rate',
    body: 'If your credit score has improved since you took out your original agreement, you may be eligible for a more competitive interest rate.',
  },
]

export const cons = [
  {
    title: 'Savings aren’t guaranteed',
    body: 'Spreading your outstanding loan over a longer term can reduce the monthly payment but may increase the total amount of interest payable.',
  },
  {
    title: 'Early repayment fees',
    body: 'If you’re thinking about refinancing, it’s a good idea to find out if there are any early repayment charges.',
  },
  {
    title: 'Offers vary by customer',
    body: 'Eligibility, rates and terms depend on your credit history and are subject to lender checks.',
  },
]

export const whyPoints = [
  {
    title: 'Finding you the best deal',
    body: 'We search our wide panel of lenders to get you the best deal for your circumstances.',
    icon: 'search' as const,
  },
  {
    title: 'Personalised support',
    body: 'You’ll have a dedicated account manager on hand to give expert support and guide you through the process.',
    icon: 'people' as const,
  },
  {
    title: 'Convenience',
    body: 'Once provisionally approved, you’re free to go at your own pace and on your terms.',
    icon: 'heart' as const,
  },
  {
    title: 'Product choice',
    body: 'Choose from Hire Purchase and PCP finance options designed to fit your budget and preferences.',
    icon: 'car' as const,
  },
  {
    title: 'Trust',
    body: 'With over 500,000 satisfied customers across the UK, we’re a brand you can rely on.',
    icon: 'shield' as const,
  },
]

export const testimonial = {
  quote: 'It was stress-free, really helpful and I would definitely recommend',
  name: 'Hannah',
  detail: 'Bought a Fiat 500',
}

export const refinanceFaqs: FaqCategory[] = [
  {
    id: 'refinance',
    label: 'Refinancing',
    items: [
      {
        q: 'Can I refinance my existing car?',
        a: [
          'You may be able to refinance your existing car if your circumstances meet your lender’s criteria. Car refinancing just means taking out a new car finance deal to pay off your current one.',
          'You might want lower monthly payments, a different loan length, or potentially a better interest rate than the one you have now. Remember that spreading your outstanding loan over a longer term can reduce the monthly payment but may increase the total amount of interest payable.',
        ],
      },
      {
        q: 'Can you refinance a PCP agreement?',
        a: [
          'At the end of a PCP deal, you may be able to refinance the final balloon payment if you want to keep the car but can’t pay the lump sum in one go. You may also be able to refinance during your PCP agreement to adjust your monthly payments.',
          'Whether you can refinance will depend on your agreement and personal circumstances. Spreading your balloon payment over a longer term can reduce the monthly payment but may increase the total amount of interest payable.',
        ],
      },
      {
        q: 'Are there fees for paying off my current finance early?',
        a: [
          'Some lenders charge an early repayment fee. Check your current agreement or ask your lender for a settlement figure, so you can compare the full cost before you switch.',
        ],
      },
      {
        q: 'What do I need to get started?',
        a: [
          'Just a few details about you, your income and your current car. Adding your registration helps us find your car and speeds things up.',
        ],
      },
      {
        q: 'How long does refinancing take?',
        a: [
          'You’ll usually get a decision in minutes. Once approved, your dedicated account manager will guide you through the next steps with your new lender.',
        ],
      },
    ],
  },
]

export const footerNotes = [
  'We look to find the best rate from our panel of lenders and will offer you the best deal that you’re eligible for. We will be paid a commission for providing our services and this commission may be a fixed amount or a percentage of the amount borrowed. The interest rate you pay is directly linked to the amount you are borrowing and your individual credit status.',
  '* The UK’s largest online car finance broker by unique users to the website. Based on Similar Web data: 1,184,130 to Car Finance 247 vs. 658,656 for nearest competitor. December 2024 to May 2025.',
]

export const guideLinks = {
  balloon: siteUrl('/guide/can-i-refinance-my-balloon-payment-on-a-pcp'),
  pcp: siteUrl('/pcp-personal-contract-purchase'),
  creditScore: siteUrl('/guide/what-credit-score-is-needed-for-car-finance'),
}
