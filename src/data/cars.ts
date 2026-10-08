import { heroCar } from './assets'

/** Studio car renders from the imagin.studio CDN, all at the same 23 degree angle and 1.6 framing. */
export const carSrc = (make: string, model: string, year: number, width = 1200) =>
  `https://cdn.imagin.studio/getImage?customer=gb-carfinance247&zoomType=fullscreen&margins=0.03&fileType=webp&version=5&countryCode=0&licensePlateType=eu&aspectRatio=1.6&angle=23&width=${width}&make=${make}&modelFamily=${model}&modelYear=${year}`

export const valueCars = {
  volvo: { src: carSrc('volvo', 'xc40', 2022), alt: 'White Volvo XC40' },
  kia: { src: carSrc('kia', 'sportage', 2023), alt: 'White Kia Sportage' },
  mini: { src: carSrc('mini', 'hatch', 2022), alt: 'White MINI hatch' },
}

/** Hero test option "Cycling cars": the Fiesta, then the three value card models at hero resolution. */
export const heroCycle = [
  heroCar,
  { src: carSrc('volvo', 'xc40', 2022, 1800), alt: valueCars.volvo.alt },
  { src: carSrc('kia', 'sportage', 2023, 1800), alt: valueCars.kia.alt },
  { src: carSrc('mini', 'hatch', 2022, 1800), alt: valueCars.mini.alt },
]