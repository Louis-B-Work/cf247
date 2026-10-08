import { siteUrl } from '../lib/utils'

const dA = (path: string) => `https://www.carfinance247.co.uk/dA/${path}`

export const heroCar = {
  src: 'https://cdn.imagin.studio/getImage?customer=gb-carfinance247&zoomType=fullscreen&margins=0.03&fileType=webp&version=5&surrounding=studio&modelVariant=ha&countryCode=0&licensePlateType=eu&rim=0&interiorId=000002&steering=lhd&tailoring=gray&aspectRatio=1.6&transmission=0&make=ford&modelFamily=fiesta&modelRange=fiesta&modelYear=2022&modelTrim=&bodySize=5&powerTrain=hybrid&angle=23&paintId=pspc0386&width=1800',
  alt: 'White Ford Fiesta with a CF247 number plate',
}

export const steps = [
  {
    title: 'Quote',
    body: 'Answer a few quick questions and see your personalised quote in minutes.',
    image: dA('08e67e350c/Homepage_HIW_01.png/100vw/webp_q'),
    alt: 'Woman smiling at her phone as her quote arrives',
  },
  {
    title: 'Buy',
    body: 'Pick your car from any reputable UK dealer and we help you agree the deal.',
    image: dA('c44b635c16/HIW_02_New.png/100vw/webp_q'),
    alt: 'Hand holding a phone showing car search results',
  },
  {
    title: 'Drive away',
    body: 'We sort the paperwork with the dealer and lender. You just turn up and drive away.',
    image: dA('4e321dbed1/HIW_03_New.png/100vw/webp_q'),
    alt: 'Family running towards their new car',
  },
]

export const partners = [
  { name: 'ClearScore', logo: dA('6678400dc8/fileAsset/clearScore.png/100vw/webp_q') },
  { name: 'Compare the Market', logo: dA('b0032fb627/fileAsset/compareTheMarket.png/100vw/webp_q') },
  { name: 'Experian', logo: dA('b3944ca70f/fileAsset/experian.png/100vw/webp_q') },
  { name: 'Credit Karma', logo: dA('6f16e7bbd8/fileAsset/creditKarma.png/100vw/webp_q') },
]

export const founders = {
  image: dA('a91e476c55/file%20(1).png'),
  alt: 'Founders Reg and Louis Rix',
}

export type Guide = {
  title: string
  category: string
  readTime: number
  excerpt?: string
  image: string
  href: string
}

export const guides: Guide[] = [
  {
    title: 'Can I get PCP car finance with bad credit?',
    category: 'Bad credit',
    readTime: 6,
    excerpt: 'It is possible. Here is how lenders look at your application, and the simple steps that can improve your chances of approval.',
    image: dA('ca0de27e4d56671aa76e24d5522d83d4/asset/PCP%20car%20finance%20with%20bad%20credit.jpg/100vw/webp_q'),
    href: siteUrl('/guide/can-i-get-pcp-car-finance-with-bad-credit'),
  },
  {
    title: 'Can I transfer my car finance?',
    category: 'Finance options',
    readTime: 4,
    image: dA('ab9dd00d215935a5feeb089593078c53/asset/Can%20I%20transfer%20my%20car%20finance.jpg/100vw/webp_q'),
    href: siteUrl('/guide/can-i-transfer-my-car-finance'),
  },
  {
    title: 'Exploring joint car finance',
    category: 'Finance options',
    readTime: 5,
    image: dA('17e9395f5bc946092695d6a219b0da78/asset/Joint%20application%20car%20finance.jpg/100vw/webp_q'),
    href: siteUrl('/guide/exploring-joint-car-finance'),
  },
  {
    title: 'What credit score is needed for car finance?',
    category: 'My credit',
    readTime: 5,
    image: dA('33b74fe5d937df4ebb9b429a2a393e7f/asset/What%20Credit%20Score%20is%20Needed%20for%20Car%20Finance.jpg?language_id=1'),
    href: siteUrl('/guide/what-credit-score-is-needed-for-car-finance'),
  },
]

export const representativeExample =
  'Rates from 8.9% APR. Representative example: borrow £12,000 over 5 years with a £0 deposit. Representative 19.5% APR fixed rate. Monthly payment: £304.38. Option to purchase fee £10 payable. Total cost of credit: £6,272.80. Total amount repayable: £18,272.80. Car Finance 247 Limited is a credit broker, not a lender.'
