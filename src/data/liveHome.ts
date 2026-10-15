import type { NavItem } from './nav'
import type { FaqCategory } from './faqs'
import { siteUrl } from '../lib/utils'

/*
 * Settings cog "Homepage content: Exact replica". Every string below is word for word from the live homepage
 * (www.carfinance247.co.uk), in the same order, so search engines see the same content in the new design.
 * Change it only if the live page changes. Inline links in FAQ answers use [label](url).
 */

const dA = (path: string) => `https://www.carfinance247.co.uk/dA/${path}`

export const livePage = {
  title: 'Car Finance Freedom | Compare Car Loans',
  description:
    'Looking for car finance? Get a no obligation quote today. We compare over 275 car finance products from a wide panel of lenders. No deposit options. All circumstances considered.',
}

export const liveQuoteUrl = 'https://apply.carfinance247.co.uk'

export const liveHero = {
  title: 'Car Finance Made Easy',
  budgetLabel: 'My monthly budget is',
  cta: 'Get my quote',
  rates: 'Rates from 8.9% APR. Representative 19.5% APR. Car Finance 247 Limited is a credit broker, not a lender.',
  carAlt: 'ford fiesta',
}

export const liveRepExample =
  'Rates from 8.9% APR. Representative Example: Borrow £12,000 over 5 years with a £0 deposit. Representative 19.5% APR fixed rate. Monthly payment: £304.38. Option to purchase fee £10 payable. Total cost of credit: £6,272.80. Total amount repayable: £18,272.80. Car Finance 247 Limited is a credit broker, not a lender.'

export const liveQuickLinks = {
  title: 'Quick Links',
  links: [
    { label: 'Car Finance Calculator', href: siteUrl('/car-finance-calculator'), icon: 'search' as const },
    { label: 'Refinance My Car', href: siteUrl('/refinance-car-finance'), icon: 'car' as const },
    { label: 'Bad Credit Car Finance', href: siteUrl('/bad-credit-car-finance'), icon: 'shield' as const },
  ],
}

export const liveSteps = {
  title: 'Three steps to feel-good car finance',
  cta: 'Get my quote',
  steps: [
    {
      title: 'Get approved',
      body: 'Receive your personalised car finance decision and approval in principle in minutes.',
      image: dA('08e67e350c/Homepage_HIW_01.png/100vw/webp_q'),
    },
    {
      title: 'Choose your car',
      body: 'Buy from any dealership, or browse over 100,000 cars in our members area.',
      image: dA('c44b635c16/HIW_02_New.png/100vw/webp_q'),
    },
    {
      title: 'Drive away',
      body: 'We sort the paperwork with the dealer and lender. You just turn up and drive away.',
      image: dA('4e321dbed1/HIW_03_New.png/100vw/webp_q'),
    },
  ],
}

export type LiveTile =
  | { kind: 'video'; quote: string; name: string; detail: string; image: string; href: string }
  | { kind: 'review'; quote: string; name: string; detail: string; href?: string }

export const liveReviews = {
  title: 'Making car finance simple for 500,000+ customers',
  /** Three columns, in the live order. */
  columns: [
    [
      {
        kind: 'video',
        quote: 'The finance was arranged the same day',
        name: 'Craig',
        detail: 'Bought a Dacia Duster',
        image: dA('44e0a866eb/Untitled%20design%20(2)%203.png'),
        href: 'https://www.youtube.com/watch?v=MA7-YGJRjzg',
      },
      {
        kind: 'review',
        quote: 'Very good customer service, very quick and simple. Definitely would recommend using them, very happy',
        name: 'Molly',
        detail: 'Bought a Dacia Duster',
        href: 'https://uk.trustpilot.com/reviews/66ccdd747a730a1cb0ff22cb',
      },
      {
        kind: 'review',
        quote:
          'It was so easy and hassle free, most of it done over WhatsApp which was really good for me with working long hours. And the staff were fantastic. Overall very happy with the service',
        name: 'Jack',
        detail: 'Bought a Dacia Duster',
        href: 'https://uk.trustpilot.com/reviews/66cf74fb6658590bb86fea7d',
      },
    ],
    [
      {
        kind: 'video',
        quote: "The trust i'd built with them made the process a lot easier",
        name: 'Aimee',
        detail: 'Bought a Mercedes CLA',
        image: dA('b60e472370/Untitled%20design.png'),
        href: 'https://www.youtube.com/watch?v=NzaIhbWkTLs',
      },
    ],
    [
      {
        kind: 'video',
        quote: "I would definitely recommend Car Finance 247, I've used them twice now",
        name: 'Terri',
        detail: 'Bought a Hyundai Ix35',
        image: dA('8874dfbb36/customer2_651x970.png'),
        href: 'https://www.youtube.com/watch?v=whRp2T6iTjg',
      },
      {
        kind: 'review',
        quote:
          'My experience was really great with these guys. Easy quick and effective. Kept me in loop all the way and got me finance approved when everyone else couldnt. Highly recommend them.',
        name: 'Harjinder',
        detail: 'Bought a Hyundai Ix35',
        href: 'https://uk.trustpilot.com/reviews/66cdb188ab48ef0990897092',
      },
    ],
  ] as LiveTile[][],
  trustpilotHeading: 'Rated Excellent by 59,096 customers – 4.9 out of 5 on Trustpilot',
}

export const livePartners = {
  title: 'We only work with trusted partners and lenders',
  logos: [
    { name: 'ClearScore', logo: dA('6678400dc8/fileAsset/clearScore.png/100vw/webp_q') },
    { name: 'Compare the Market', logo: dA('b0032fb627/fileAsset/compareTheMarket.png/100vw/webp_q') },
    { name: 'Experian', logo: dA('b3944ca70f/fileAsset/experian.png/100vw/webp_q') },
    { name: 'Credit Karma', logo: dA('6f16e7bbd8/fileAsset/creditKarma.png/100vw/webp_q') },
  ],
}

export const liveSituations = {
  title: 'Car finance for every situation',
  cards: [
    {
      image: dA('e7780021eb/CTA_01_Mobile_New.png/100vw/webp_q'),
      alt: '/dA/e7780021eb/CTA 01 Mobile New',
      title: 'Still searching for the perfect car?',
      body: 'Browse personalised quotes on over 100,000 cars in our exclusive members area.',
      cta: 'Start my search',
      href: liveQuoteUrl,
    },
    {
      image: dA('30ab8f3dc7/CTA_02_Mobile_New.png/100vw/webp_q'),
      alt: '/dA/30ab8f3dc7/CTA 02 Mobile New',
      title: 'Found a car you love?',
      body: 'Seen it, love it, now quote it.',
      cta: 'Get my quote',
      href: liveQuoteUrl,
    },
    {
      image: dA('65edee8472/CTA_03_Mobile_New.png/100vw/webp_q'),
      alt: '/dA/65edee8472/CTA 03 Mobile New',
      title: 'Thinking of refinancing your car?',
      body: 'Love your current car? Try refinancing and see if you can lower your monthly payments.',
      cta: 'See what you can save',
      href: siteUrl('/refinance-car-finance'),
      note: 'Extending the term of your loan could increase the interest payable.',
    },
  ],
}

export const liveFounders = {
  image: dA('a91e476c55/file%20(1).png'),
  alt: 'Reg and Louis Rix',
  title: 'Proudly founded in Manchester by Reg and Louis Rix.',
  body: 'The motor trade has been interlinked with their lives for as long as they can remember. From working in their Dad’s dealership as kids to striking out as entrepreneurs in their own right, it’s always been the industry for them. Still is. They’re passionate about what we do and proud to be the UK’s leading digital car finance platform.',
  cta: 'About us',
  href: 'https://carfinance247.co.uk/about',
}

export const liveGuides = {
  title: 'Featured guides',
  all: { label: 'Explore all guides', href: siteUrl('/guides') },
  cta: 'Read guide',
  guides: [
    {
      title: 'Can I get PCP car finance with bad credit?',
      href: siteUrl('/guide/can-i-get-pcp-car-finance-with-bad-credit'),
      image: dA('ca0de27e4d56671aa76e24d5522d83d4/asset/PCP%20car%20finance%20with%20bad%20credit.jpg/100vw/webp_q'),
    },
    {
      title: 'Can I transfer my car finance?',
      href: siteUrl('/guide/can-i-transfer-my-car-finance'),
      image: dA('ab9dd00d215935a5feeb089593078c53/asset/Can%20I%20transfer%20my%20car%20finance.jpg/100vw/webp_q'),
    },
    {
      title: 'Exploring joint car finance',
      href: siteUrl('/guide/exploring-joint-car-finance'),
      image: dA('17e9395f5bc946092695d6a219b0da78/asset/Joint%20application%20car%20finance.jpg/100vw/webp_q'),
    },
  ],
}

const s = siteUrl
const balloon = s('/guide/balloon-payments-in-car-finance')
const hp = s('/hire-purchase')
const pcp = s('/pcp-personal-contract-purchase')
const aprGuide = s('/guide/car-finance-interest-rates-and-apr-explained')
const creditScore = s('/guide/what-credit-score-is-needed-for-car-finance')
const documents = s('/guide/what-documents-do-i-need-for-car-finance')

export const liveFaqTitle = 'Frequently Asked Questions'

export const liveFaqs: FaqCategory[] = [
  {
    id: 'home',
    label: 'Frequently Asked Questions',
    items: [
      {
        q: 'How does student car finance work?',
        a: [
          'Student car finance generally works the same as any other car finance. You borrow money from a lender to cover the cost of a new or used car and then pay it back in more manageable monthly repayments. There are several types of loan available and car finance is the catch-all term used to describe them.',
          'You’ll need to know how much you want to borrow and how long you want to borrow it for (the loan term) to find the car finance deal that’s right for you. You could also put down a deposit to reduce the total loan amount. If your loan is approved and you decide to proceed, you’ll then pay it back in monthly instalments, plus interest, for the duration of the loan term, which typically lasts between one and five years. Depending on the deal you choose, your finance might be secured against the car.',
        ],
      },
      {
        q: 'Types of student car finance',
        a: [
          `There are several types of car finance students could choose from but the most common are [Hire Purchase (HP)](${hp}) and [Personal Contract Purchase (PCP)](${pcp}).`,
          'Hire Purchase: The loan is secured against the car and you won’t own it until you’ve reached the end of your agreement and paid the ‘Option to Purchase’ fee. You might need to put down a deposit but it’s unlikely that you’ll have to agree to any mileage restrictions.',
          `Personal Contract Purchase: Loans are also secured against the vehicle, but you don’t automatically own the car when the loan term ends. Instead, you can choose to give it back, use any positive equity as a deposit in a new deal, or buy the car by paying the [balloon payment](${balloon}). Monthly payments could be lower than with HP car finance, but you may have to agree to annual mileage limits.`,
        ],
      },
      {
        q: 'How do I choose the right student car finance option?',
        a: [
          'Deciding on the best car finance option for you will depend on your individual circumstances, the car you want to buy, and how you want to use it.',
          `With [Hire Purchase (HP) finance](${hp}), you’ll own the car at the end of your loan term, but your monthly repayments might be higher than other options and you won’t be able to sell or change the car during your agreement.`,
          `[Personal Contract Purchase (PCP)](${pcp}) car finance could offer the lowest monthly repayments, but you may have to agree to mileage restrictions, and you won’t automatically own the car at the end of the loan term. At the end of the term you can decide whether you want to return the car, or pay the final [balloon payment](${balloon}) to keep the car.`,
          'No matter which financing option you choose, at Car Finance 247, we’ll always look to try and find you the best deal from our panel of lenders.',
        ],
      },
      {
        q: 'What is the cheapest way to finance a car?',
        a: [
          `The cheapest way to finance a car depends on a few factors including the type of loan you have, the loan length, and the [APR](${aprGuide}). Keep in mind that the loan that offers the lowest monthly repayment might not be the cheapest deal as you could end up paying back more in interest over time.`,
          `[PCP car finance](${pcp}) may be more expensive overall, but monthly payments may be cheaper than HP or a personal loan as you don’t have to borrow the full amount your vehicle is worth. Instead, you’ll borrow the difference between the price now and the amount the lender thinks your car will be worth at the end of your agreement – the [Guaranteed Future Value (GFV)](${s('/guide/guaranteed-future-value-gfv-explained')}). But remember, you won’t own the car at the end of your loan unless you choose to pay the [balloon payment.](${balloon})`,
        ],
      },
      {
        q: 'Will applying for finance affect my credit score?',
        a: [
          `When you apply with Car Finance 247, there is no impact on your credit score. We use a [soft search](${s('/guide/car-finance-with-a-soft-credit-check')}) to give you a quote. If you proceed, a hard search will be conducted which may impact your credit score.`,
        ],
      },
      {
        q: 'Do you have a finance calculator?',
        a: [
          `Yes! You can use the [car finance calculator](${s('/car-finance-calculator')}) to get an estimate of your monthly repayments based on the amount you’d like to borrow, the loan term length, and your credit score boundary. We also have a [car refinance calculator.](${s('/car-refinance-calculator')})`,
        ],
      },
      {
        q: 'Who is eligible for a car loan?',
        a: ["To apply for car finance with us, there are a few key requirements you'll need to meet.", 'Most lenders typically ask for the following:'],
        list: [
          'Age: You must be aged 18 or over to apply.',
          'UK Residency: You must have lived in the UK for the last three years or more. This helps us confirm your identity and check your eligibility for credit.',
          'Valid driving licence: You’ll need to hold a UK provisional or full driving licence to show you’re legally allowed to drive a vehicle.',
          'Proof of income: If you choose to proceed, some lenders may ask for recent payslips or benefit statements to check affordability.',
        ],
        after: [
          `Visit our guides to understand [what documents you need for car finance](${documents}) and [what lenders look for when approving car finance.](${s('/guide/what-do-lenders-look-for-when-approving-car-finance')})`,
        ],
      },
      {
        q: 'How quickly can I get a car loan?',
        a: [
          'With Car Finance 247, you get a decision in minutes. Make an application, pop the kettle on, and you’ll have a decision by the time you’ve finished your tea. If we’ve found you an approval in principle, your dedicated account manager will give you a call to confirm your details and discuss the next steps.',
        ],
      },
      {
        q: 'How much does car finance cost?',
        a: [
          'The cost of car finance is typically defined as the amount of money you borrow plus the interest and any other charges that you’ll need to pay on the loan over the repayment term.',
          `If you choose [Hire Purchase (HP) car finance](${hp}), your monthly repayments will cover a portion of the car finance and your interest payment. The [interest rate](${aprGuide}) that you’re offered depends on a few things including your [credit score](${creditScore}) and [improving your score](${s('/guide/how-to-improve-your-credit-score')}) which could give you access to better rates. Credit is subject to status.`,
        ],
      },
      {
        q: 'What information is needed for a financing decision?',
        a: [
          'If you know how much you’d like to borrow or have already found a car you’d like to buy, it’s time to apply. It all starts with a quote. Our online application form will ask you to enter some personal details, your current employment status, monthly income, and information about the vehicle you’re looking to buy so that we can get to work trying to find you an approval in principle from our panel of lenders.',
          `Read our guide on [what documents you need for car finance](${documents}) for more information.`,
        ],
      },
      {
        q: 'I have a part exchange can I trade this in?',
        a: [
          'Yes, we could accept part-exchanges.',
          `A [part-exchange](${s('/blog-post/how-part-exchange-works-and-what-you-need-to-understand')}) acts as a deposit towards your new car. This would reduce your total loan amount, which means the amount you pay back each month is reduced too.`,
          'Having a part-exchange may sometimes help when it comes to likelihood of approval as it means a smaller loan amount is requested, which might open more options up to you. If you wanted to put a cash deposit down, we could accept these too!',
        ],
      },
      {
        q: "What if I've been refused elsewhere?",
        a: [
          'We may be able to help customers that have been refused elsewhere.',
          `If you've applied somewhere else (such as a bank, car dealership or even another car finance broker) and have been [refused car finance](${s('/guide/refused-car-finance')}), you might start to think that nobody can help. Some of the lenders we work with specialise in helping people with [bad credit](${s('/bad-credit-car-finance')}) get car finance, so we'll try our best to find the right finance option for you. Credit is subject to status.`,
        ],
      },
      {
        q: 'I have fair credit, can you help?',
        a: [
          "Working with a large panel of lenders means we could help customers with a range of credit histories to get car finance, and we have been able to help people with fair credit. We work with a wide panel of lenders, some of which consider customers with fair credit, so we'd be hopeful of being able to help you to get a competitive finance deal in place. Credit is subject to status.",
        ],
      },
      {
        q: 'Can I buy my car from any dealer?',
        a: [
          'Yes, you can choose a car from any verified UK dealership!',
          "To make finding the right car easier, we've got over 95,000 cars for you to view on our car search. Once you've found a car, you just need to share the details with your account manager, and they'll do the rest.",
          "You don't have to choose a car from our search and, if you need a hand finding the right car, your account manager will be happy to help - just let them know what you're looking for.",
        ],
      },
      {
        q: 'What is a good deposit for a car?',
        a: [
          `While [no deposit car loans](${s('/no-deposit-car-finance')}) may be available, having a good deposit upfront reduces the amount you need to borrow. This could mean that you have lower monthly repayments or a shorter loan period. A good deposit is one that you can afford and still leaves you with funds to cover essentials like tax, insurance, and fuel. Typically, a car finance deposit of at least 10% of the total loan may be considered good.`,
        ],
      },
      {
        q: 'Can I repay my car loan early?',
        a: [
          `Yes, you could repay a car loan early by paying the [settlement figure](${s('/guide/what-is-a-settlement-figure')}). This is the amount you need to pay to end your finance agreement and typically includes any outstanding finance minus any future interest that you won’t need to pay. This could help you save money overall. Contact the lender to request a settlement figure and find out whether there are any early settlement fees to pay.`,
        ],
      },
      {
        q: 'What is APR?',
        a: [
          `[APR stands for Annual Percentage Rate](${aprGuide}) and it represents the total annual cost of borrowing money including interest, admin fees, and any arrangement charges. APRs are tailored to your individual circumstances and the one that you’re offered depends on several factors including your [credit score](${creditScore}).`,
        ],
      },
      {
        q: 'Is getting a car on finance worth it?',
        a: [
          `Getting a car on finance is worth it if it’s the best choice for you and your circumstances. If you have savings, buying a car outright could be the easiest and cheapest option if you plan to keep the same car for a long time and aren’t worried about [depreciation](${s('/blog-post/a-quick-guide-to-car-depreciation')}) over time. However, if you don’t have the money to pay for a car all in one go, would like to change the car regularly, or even hand it back after a few years then a car finance option like [PCP](${pcp}) could be the better choice for you.`,
        ],
      },
    ],
  },
]

export const liveCommission =
  'We look to find the best rate from our panel of lenders and will offer you the best deal that you’re eligible for. We will be paid a commission for providing our services and this commission may be a fixed amount or a percentage of the amount borrowed. The interest rate you pay is directly linked to the amount you are borrowing and your individual credit status.'

export const liveFinalCta = {
  title: "Let's get you started",
  body: 'Applying with us only takes a couple of minutes.',
  cta: 'Get my quote',
  href: 'https://apply.carfinance247.co.uk/',
  legal: 'Representative 19.5% APR. Car Finance 247 Limited is a credit broker, not a lender.',
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

export const liveSignIn = 'Sign In'

/** The live mobile menu repeats the menu links in the page (minus "View all guides"); parity mode keeps that copy too. */
export const liveMobileMenuLinks = liveNavItems.flatMap((item) => item.columns.flatMap((c) => c.links)).filter((link) => link.label !== 'View all guides')

/** The live homepage footer. */
export const liveFooter = {
  links: [
    l('Car Finance Calculator', '/car-finance-calculator'),
    l('Fuel Save', '/fuel-save'),
    l('About Us', '/about'),
    l('How It Works', '/how-it-works'),
    l('Careers', 'https://jobs.carfinance247.co.uk/'),
    l('Help & Guides', '/guides'),
    l("Dealer's Portal", 'https://dealer.carfinance247.co.uk/'),
    l('Contact Us', '/contact-us'),
    l('Glasgow Car Finance', '/location/glasgow'),
    l('Birmingham Car Finance', '/location/birmingham'),
    l('Nottingham Car Finance', '/location/nottingham'),
    l('Manchester Car Finance', '/location/manchester'),
    l('London Car Finance', '/location/london'),
    l('Leeds Car Finance', '/location/leeds'),
    l('Luton Car Finance', '/location/luton'),
    l('Leicester Car Finance', '/location/leicester'),
  ],
  appTitle: 'Get The App',
  followTitle: 'Follow Us',
  socials: [
    { name: 'Twitter', icon: 'x' as const, href: 'https://twitter.com/CarFinance247' },
    { name: 'LinkedIn', icon: 'linkedin' as const, href: 'https://www.linkedin.com/company/car-finance-247' },
    { name: 'YouTube', icon: 'youtube' as const, href: 'https://www.youtube.com/channel/UCREA9FCb-iWyR88aiIxVHkQ' },
    { name: 'TikTok', icon: 'tiktok' as const, href: 'https://www.tiktok.com/@carfinance_247?' },
    { name: 'Facebook', icon: 'facebook' as const, href: 'https://www.facebook.com/carfinance247' },
    { name: 'Instagram', icon: 'instagram' as const, href: 'https://www.instagram.com/carfinance247' },
  ],
  notes: [
    "* The UK's largest online car finance broker by unique users to the website. Based on Similar Web data – 1,184,130 to Car Finance 247 vs. 658,656 for nearest competitor. December 2024 to May 2025.",
  ],
}
