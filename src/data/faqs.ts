export type Faq = {
  q: string
  a: string[]
  list?: string[]
}

export type FaqCategory = {
  id: string
  label: string
  items: Faq[]
}

export const faqCategories: FaqCategory[] = [
  {
    id: 'getting-started',
    label: 'Getting started',
    items: [
      {
        q: 'How quickly can I get a car loan?',
        a: [
          'With Car Finance 247, you get a decision in minutes. Make an application, pop the kettle on, and you’ll have a decision by the time you’ve finished your tea.',
          'If we’ve found you an approval in principle, your dedicated account manager will give you a call to confirm your details and discuss the next steps.',
        ],
      },
      {
        q: 'What information is needed for a financing decision?',
        a: [
          'It all starts with a quote. Our online application asks for some personal details, your employment status, monthly income and information about the vehicle you’re looking to buy.',
          'We then get to work finding you an approval in principle from our panel of lenders.',
        ],
      },
      {
        q: 'Can I buy my car from any dealer?',
        a: [
          'Yes, you can choose a car from any verified UK dealership. We’ve also got over 95,000 cars to view on our car search.',
          'Once you’ve found a car, share the details with your account manager and they’ll do the rest. If you need a hand finding the right car, just let them know what you’re looking for.',
        ],
      },
      {
        q: 'I have a part exchange, can I trade this in?',
        a: [
          'Yes, we could accept part exchanges. A part exchange acts as a deposit towards your new car, reducing your total loan amount and your monthly repayments.',
          'It may also help your likelihood of approval, as a smaller loan amount might open up more options. Cash deposits are welcome too.',
        ],
      },
      {
        q: 'Do you have a finance calculator?',
        a: [
          'Yes. Our car finance calculator estimates your monthly repayments based on how much you’d like to borrow, the loan term and your credit score boundary. We also have a car refinance calculator.',
        ],
      },
    ],
  },
  {
    id: 'eligibility',
    label: 'Eligibility & credit',
    items: [
      {
        q: 'Who is eligible for a car loan?',
        a: ['To apply for car finance with us, most lenders typically ask for the following:'],
        list: [
          'Age: you must be aged 18 or over.',
          'UK residency: you must have lived in the UK for the last three years or more.',
          'Valid driving licence: a UK provisional or full licence.',
          'Proof of income: some lenders may ask for recent payslips or benefit statements.',
        ],
      },
      {
        q: 'Will applying for finance affect my credit score?',
        a: [
          'When you apply with Car Finance 247, there is no impact on your credit score. We use a soft search to give you a quote. If you proceed, a hard search will be conducted which may impact your credit score.',
        ],
      },
      {
        q: 'What if I’ve been refused elsewhere?',
        a: [
          'We may be able to help customers that have been refused elsewhere, whether by a bank, a dealership or another broker.',
          'Some of the lenders we work with specialise in helping people with bad credit get car finance, so we’ll try our best to find the right option for you. Credit is subject to status.',
        ],
      },
      {
        q: 'I have fair credit, can you help?',
        a: [
          'Working with a large panel of lenders means we could help customers with a range of credit histories, and we have been able to help people with fair credit get a competitive deal in place. Credit is subject to status.',
        ],
      },
    ],
  },
  {
    id: 'costs',
    label: 'Costs & repayments',
    items: [
      {
        q: 'How much does car finance cost?',
        a: [
          'The cost of car finance is the amount you borrow plus the interest and any other charges you’ll pay over the repayment term.',
          'The interest rate you’re offered depends on a few things, including your credit score. Credit is subject to status.',
        ],
      },
      {
        q: 'What is APR?',
        a: [
          'APR stands for Annual Percentage Rate. It represents the total annual cost of borrowing, including interest, admin fees and any arrangement charges. APRs are tailored to your circumstances, including your credit score.',
        ],
      },
      {
        q: 'What is a good deposit for a car?',
        a: [
          'A deposit reduces the amount you need to borrow, which could mean lower monthly repayments or a shorter loan period.',
          'A good deposit is one you can afford while still covering tax, insurance and fuel. Typically, at least 10% of the total loan may be considered good.',
        ],
      },
      {
        q: 'Can I repay my car loan early?',
        a: [
          'Yes, you could repay a car loan early by paying the settlement figure: any outstanding finance minus future interest you won’t need to pay.',
          'Contact your lender to request a settlement figure and check for any early settlement fees.',
        ],
      },
      {
        q: 'What is the cheapest way to finance a car?',
        a: [
          'It depends on the type of loan, the loan length and the APR. The lowest monthly repayment isn’t always the cheapest deal, as you could pay more interest over time.',
          'PCP monthly payments may be lower than HP because you borrow the difference between the price now and the Guaranteed Future Value. You won’t own the car unless you pay the balloon payment.',
        ],
      },
    ],
  },
  {
    id: 'choosing',
    label: 'Choosing finance',
    items: [
      {
        q: 'What types of car finance are there?',
        a: [
          'The most common are Hire Purchase (HP) and Personal Contract Purchase (PCP).',
          'With HP, the loan is secured against the car and you own it once you’ve paid the Option to Purchase fee. With PCP, you can hand the car back, use any positive equity towards a new deal, or pay the balloon payment to keep it.',
        ],
      },
      {
        q: 'How do I choose the right finance option?',
        a: [
          'It depends on your circumstances, the car you want and how you’ll use it. HP means you’ll own the car at the end. PCP could offer lower monthly repayments but may include mileage limits.',
          'Whichever you choose, we’ll always look to find you the best deal from our panel of lenders.',
        ],
      },
      {
        q: 'Is getting a car on finance worth it?',
        a: [
          'If you have savings and plan to keep the same car for a long time, buying outright could be cheapest. If you’d rather spread the cost, change cars regularly or hand it back after a few years, an option like PCP could suit you better.',
        ],
      },
      {
        q: 'How does student car finance work?',
        a: [
          'Student car finance works the same as any other car finance. You borrow from a lender to cover the cost of a new or used car, then pay it back in monthly instalments plus interest, typically over one to five years.',
        ],
      },
    ],
  },
]
