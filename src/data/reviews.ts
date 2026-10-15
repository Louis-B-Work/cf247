/**
 * Review copy from Car Finance 247's public Trustpilot page and the current homepage.
 * Lightly trimmed for length; names shown as they appear on Trustpilot.
 */
export type Review = {
  name: string
  quote: string
  detail: string
  rating: 5
}

export type VideoReview = {
  name: string
  quote: string
  detail: string
  poster: string
  /** Crop focus for the poster (CSS object-position); defaults to the top of the frame. */
  objectPosition?: string
}

export const trustpilot = {
  score: '4.9',
  reviews: '59,096',
  url: 'https://uk.trustpilot.com/review/www.carfinance247.co.uk',
}

export const reviews: Review[] = [
  {
    name: 'Rich Mills',
    quote:
      'After finding a car first thing in the morning, we were all signed and sorted with our new car on the drive by end of day. This is my fourth car via CF247, you don’t keep coming back without good reason!',
    detail: 'Fourth car with CF247',
    rating: 5,
  },
  {
    name: 'Jack',
    quote:
      'It was so easy and hassle free, most of it done over WhatsApp which was really good for me with working long hours. And the staff were fantastic. Overall very happy with the service',
    detail: 'Bought a Dacia Duster',
    rating: 5,
  },
  {
    name: 'GM',
    quote:
      'I was in need of refinancing my car and Harry helped me every step of the way. He made everything clear and transparent. 10/10 service.',
    detail: 'Refinanced their car',
    rating: 5,
  },
  {
    name: 'GF',
    quote:
      'Oliver went above and beyond to find not only a similar shape to my original preference but at a fraction of the cost. I left the phone call a very happy woman!',
    detail: 'Stayed within budget',
    rating: 5,
  },
  {
    name: 'MM',
    quote:
      'Aaron got me the best rate available and answered every question professionally and promptly. Within 24 hours my finance was in place and the car collected from the dealer.',
    detail: 'Sorted in 24 hours',
    rating: 5,
  },
  {
    name: 'Harjinder',
    quote:
      'My experience was really great with these guys. Easy, quick and effective. Kept me in the loop all the way and got me finance approved when everyone else couldn’t. Highly recommend them.',
    detail: 'Bought a Hyundai ix35',
    rating: 5,
  },
  {
    name: 'DA',
    quote:
      'Roisin walked me through everything really well and helped me get the exact car I was after. Did not push me towards anything I didn’t want.',
    detail: 'Found the exact car',
    rating: 5,
  },
  {
    name: 'Sal Munir',
    quote:
      'I recently went through a vehicle rejection with another finance company. Eikan took me through every step of the way and found me the best deal.',
    detail: 'Approved after a setback',
    rating: 5,
  },
  {
    name: 'Molly',
    quote: 'Very good customer service, very quick and simple. Definitely would recommend using them, very happy.',
    detail: 'Bought a Dacia Duster',
    rating: 5,
  },
  {
    name: 'DM',
    quote:
      'Excellent service from start to finish. Good car and found it really quickly. Ramesh was brilliant, so friendly and honest, and knew exactly what I was looking for.',
    detail: 'Found a car quickly',
    rating: 5,
  },
  {
    name: 'MI',
    quote:
      'Callum went above and beyond to meet my needs and get me on the road. Nothing was too much to ask. I would definitely use the company again.',
    detail: 'Back on the road',
    rating: 5,
  },
  {
    name: 'SA',
    quote:
      'The support and guidance I received from Benjamin was excellent. He explained every single step, from the finance to selecting the correct car, and he listened.',
    detail: 'Guided every step',
    rating: 5,
  },
  {
    name: 'RB',
    quote:
      'Made it very easy and simple and actually wants you to get your car at a good rate. Within a few hours of first speaking, my car was paid for.',
    detail: 'Done in a few hours',
    rating: 5,
  },
  {
    name: 'andy',
    quote:
      'Brilliant! From start to finish, fast, secure and transparent. Everything went smoothly. Special thanks to Oussama who kindly guided me.',
    detail: 'Smooth from start to finish',
    rating: 5,
  },
]

export const videoReviews: VideoReview[] = [
  {
    name: 'Craig',
    quote: 'The finance was arranged the same day',
    detail: 'Bought a Dacia Duster',
    poster: 'https://www.carfinance247.co.uk/dA/44e0a866eb/Untitled%20design%20(2)%203.png',
  },
  {
    name: 'Aimee',
    quote: 'The trust I’d built with them made the process a lot easier',
    detail: 'Bought a Mercedes CLA',
    poster: 'https://www.carfinance247.co.uk/dA/b60e472370/Untitled%20design.png',
    objectPosition: '50% 30%',
  },
  {
    name: 'Terri',
    quote: 'I would definitely recommend Car Finance 247, I’ve used them twice now',
    detail: 'Bought a Hyundai ix35',
    poster: 'https://www.carfinance247.co.uk/dA/8874dfbb36/customer2_651x970.png',
  },
]
