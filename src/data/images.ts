export type BrandImage = {
  src: string
  alt: string
  credit: { name: string; profileUrl: string; photoUrl: string }
  /** Keeps the subject visible and the text quiet zone clear when cropped. */
  objectPosition: string
  quietZone: 'left' | 'right' | 'top' | 'bottom'
}

const u = (id: string, w: number) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

/** Free-licence photos from the Unsplash "car lifestyle" search, chosen against the imagery guidance (pp. 27 to 32). */
export const images = {
  lifestyleBand: {
    src: u('1608341089966-92c09e62214f', 2400),
    alt: 'Two cars parked at a mountain overlook at sunset',
    credit: {
      name: 'Tyler Clemmensen',
      profileUrl: 'https://unsplash.com/@tyler_clemmensen',
      photoUrl: 'https://unsplash.com/photos/two-cars-parked-on-mountain-overlook-5q1xp_kresk',
    },
    objectPosition: '60% 30%',
    quietZone: 'top',
  },
  situationSearching: {
    src: u('1541570213932-8cd806e3f8f6', 1200),
    alt: 'Passenger leaning out of a car window on a tree-lined road',
    credit: {
      name: 'William Bout',
      profileUrl: 'https://unsplash.com/@williambout',
      photoUrl: 'https://unsplash.com/photos/woman-sitting-inside-vehicle-Vsf30J-DCm8',
    },
    objectPosition: '40% 60%',
    quietZone: 'top',
  },
  situationFound: {
    src: u('1587580945215-5d4aabb2c8ef', 1600),
    alt: 'Woman leaning on her white SUV on a quiet desert road',
    credit: {
      name: 'Jamie Street',
      profileUrl: 'https://unsplash.com/@jamie452',
      photoUrl: 'https://unsplash.com/photos/woman-in-blue-denim-jacket-standing-beside-silver-5-door-hatchback-during-daytime-jYVnwIc1H-c',
    },
    objectPosition: '30% 50%',
    quietZone: 'top',
  },
  situationRefinance: {
    src: u('1618353482480-61ca5a9a7879', 1200),
    alt: 'Grey SUV with its headlights on in an open field at sunset',
    credit: {
      name: 'Kirk Thornton',
      profileUrl: 'https://unsplash.com/@kirkthornton',
      photoUrl: 'https://unsplash.com/photos/gray-bmw-x-6-on-green-grass-field-during-sunset-8scCtYs4Dp8',
    },
    objectPosition: '50% 62%',
    quietZone: 'top',
  },
  finalCta: {
    src: u('1529369623266-f5264b696110', 2400),
    alt: 'Man leaning on his white SUV beside an empty desert road under a clear sky',
    credit: {
      name: 'Unsplash',
      profileUrl: 'https://unsplash.com',
      photoUrl: 'https://images.unsplash.com/photo-1529369623266-f5264b696110',
    },
    objectPosition: '50% 52%',
    quietZone: 'top',
  },
  faqAside: {
    src: u('1530065928592-fb0dc85d2f27', 1000),
    alt: 'Two friends laughing together in the open boot of a hatchback',
    credit: {
      name: 'Jorge Saavedra',
      profileUrl: 'https://unsplash.com/@_jorgesvd',
      photoUrl: 'https://unsplash.com/photos/two-women-sitting-at-the-back-of-the-car-94qZsII4kN8',
    },
    objectPosition: '50% 45%',
    quietZone: 'bottom',
  },
} satisfies Record<string, BrandImage>

/** Previous picks, kept as swaps. */
export const alternates: Partial<Record<keyof typeof images, BrandImage>> = {
  lifestyleBand: {
    src: u('1610809589386-9ea41901eb54', 2400),
    alt: 'Car travelling through green hills at golden hour',
    credit: {
      name: 'Thyler Voss',
      profileUrl: 'https://unsplash.com/@thylervoss',
      photoUrl: 'https://unsplash.com/photos/black-car-on-road-during-daytime-xFgL8xGIGpk',
    },
    objectPosition: '68% 58%',
    quietZone: 'left',
  },
  situationSearching: {
    src: u('1564415051543-cb73a7468103', 1600),
    alt: 'Two friends sitting on a car roof at dusk',
    credit: {
      name: 'Kylo',
      profileUrl: 'https://unsplash.com/@kylo8',
      photoUrl: 'https://unsplash.com/photos/two-men-sitting-on-vehicle-FPZ8Lnn5Ws8',
    },
    objectPosition: '62% 50%',
    quietZone: 'left',
  },
  situationFound: {
    src: u('1530645956250-c32934150328', 1600),
    alt: 'Woman standing beside a car at a pink sunset',
    credit: {
      name: 'Karl Fredrickson',
      profileUrl: 'https://unsplash.com/@kfred',
      photoUrl: 'https://unsplash.com/photos/womens-gray-sweater-U7DYp9l7kRc',
    },
    objectPosition: '42% 50%',
    quietZone: 'right',
  },
  situationRefinance: {
    src: u('1739412847848-ac3ec73de1b3', 1600),
    alt: 'Woman driving through greenery in warm sunlight',
    credit: {
      name: 'Mark Stuckey',
      profileUrl: 'https://unsplash.com/@m_stuckey',
      photoUrl: 'https://unsplash.com/photos/a-woman-driving-a-car-with-a-brown-hat-on-XpiuKHFCH8g',
    },
    objectPosition: '40% 50%',
    quietZone: 'right',
  },
  finalCta: {
    src: u('1572401611152-cf63d874b019', 2400),
    alt: 'Red car driving along an open road through wide hills',
    credit: {
      name: 'Maksim Tarasov',
      profileUrl: 'https://unsplash.com/@awsmsky',
      photoUrl: 'https://unsplash.com/photos/red-hatchback-vehicle-on-asphalt-road-bFTVxTo266E',
    },
    objectPosition: '72% 68%',
    quietZone: 'top',
  },
  faqAside: {
    src: u('1541570213932-8cd806e3f8f6', 1000),
    alt: 'Passenger leaning out of a car window on a quiet road',
    credit: {
      name: 'William Bout',
      profileUrl: 'https://unsplash.com/@williambout',
      photoUrl: 'https://unsplash.com/photos/woman-sitting-inside-vehicle-Vsf30J-DCm8',
    },
    objectPosition: '48% 58%',
    quietZone: 'top',
  },
}