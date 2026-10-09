export type BrandImage = {
  src: string
  alt: string
  credit: { name: string; profileUrl: string; photoUrl: string }
  /** Keeps the subject visible and the text quiet zone clear when cropped. */
  objectPosition: string
  quietZone: 'left' | 'right' | 'top' | 'bottom'
}

const u = (id: string, w: number) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

/** Free-licence Unsplash photos with British-looking roads, streets and landscapes, chosen against the imagery guidance (pp. 27 to 32). */
export const images = {
  heroBleed: {
    src: u('1627676200450-a89dcfb0e6e9', 2400),
    alt: 'Car parked on an open road',
    credit: {
      name: 'Unsplash',
      profileUrl: 'https://unsplash.com',
      photoUrl: 'https://unsplash.com/photos/1627676200450-a89dcfb0e6e9',
    },
    objectPosition: '62% 55%',
    quietZone: 'left',
  },
  situationSearching: {
    src: u('1679395608187-ac2bcedba9ab', 1200),
    alt: 'Woman driving a right-hand-drive car on an Oxford road',
    credit: {
      name: 'BEN ELLIOTT',
      profileUrl: 'https://unsplash.com/@benjaminelliott',
      photoUrl: 'https://unsplash.com/photos/a-woman-driving-a-car-while-holding-the-steering-wheel-guSr2jnBZFc',
    },
    objectPosition: '54% 48%',
    quietZone: 'top',
  },
  situationFound: {
    src: u('1652953374145-2db436dd01f1', 1600),
    alt: 'Blue car parked on a leafy Sheffield street',
    credit: {
      name: 'BEN ELLIOTT',
      profileUrl: 'https://unsplash.com/@benjaminelliott',
      photoUrl: 'https://unsplash.com/photos/a-blue-car-parked-on-the-side-of-a-road-oi5blNKbVqo',
    },
    objectPosition: '44% 58%',
    quietZone: 'top',
  },
  situationRefinance: {
    src: u('1784641337381-c51243c1e36c', 1200),
    alt: 'Silver hatchback on a Derbyshire village road',
    credit: {
      name: 'James Read',
      profileUrl: 'https://unsplash.com/@jimread',
      photoUrl: 'https://unsplash.com/photos/a-silver-car-drives-on-a-rural-road-with-houses-FG8Aoxpjr1o',
    },
    objectPosition: '48% 56%',
    quietZone: 'top',
  },
  finalCta: {
    src: u('1735896951413-cb764374f75a', 2400),
    alt: 'White car on a mountain road in Glen Coe under a wide cloudy sky',
    credit: {
      name: 'Joshua Earle',
      profileUrl: 'https://unsplash.com/@joshuaearle',
      photoUrl: 'https://unsplash.com/photos/a-white-car-driving-down-a-mountain-road-cktp9-mCH4Y',
    },
    objectPosition: '50% 40%',
    quietZone: 'top',
  },
} satisfies Record<string, BrandImage>

/** British-looking swap options. */
export const alternates: Partial<Record<keyof typeof images, BrandImage>> = {
  situationSearching: {
    src: u('1624176792478-472315f7766a', 1600),
    alt: 'White car on a quiet village lane',
    credit: {
      name: 'Annie Spratt',
      profileUrl: 'https://unsplash.com/@anniespratt',
      photoUrl: 'https://unsplash.com/photos/white-car-on-road-during-daytime-saOYvI62W1Q',
    },
    objectPosition: '56% 56%',
    quietZone: 'top',
  },
  situationFound: {
    src: u('1755867394923-ee1b5205ed66', 1600),
    alt: 'Car parked on a narrow street of brick and thatched cottages',
    credit: {
      name: 'T',
      profileUrl: 'https://unsplash.com/@tanyabarrow',
      photoUrl: 'https://unsplash.com/photos/quiet-village-street-with-traditional-houses-and-car-P46XPIF-0O0',
    },
    objectPosition: '45% 50%',
    quietZone: 'top',
  },
  situationRefinance: {
    src: u('1698337841339-8a95f6512dbe', 1600),
    alt: 'London taxi passing red telephone boxes on a rainy street',
    credit: {
      name: 'The Now Time',
      profileUrl: 'https://unsplash.com/@thenowtime',
      photoUrl: 'https://unsplash.com/photos/a-car-driving-down-a-street-next-to-a-red-phone-booth-Kmd_ZVmrpQM',
    },
    objectPosition: '42% 58%',
    quietZone: 'top',
  },
  finalCta: {
    src: u('1551628181-38d85b7c38e2', 2400),
    alt: 'Small red car on a winding Peak District road',
    credit: {
      name: 'Roxxie Blackham',
      profileUrl: 'https://unsplash.com/@roxxiewildflower_',
      photoUrl: 'https://unsplash.com/photos/red-vehicle-on-road-during-daytime-Fz4Qk2iv4cw',
    },
    objectPosition: '52% 58%',
    quietZone: 'top',
  },
}