import { partners } from '../../data/assets'

export function Partners() {
  return (
    <section aria-labelledby="partners-title" className="border-y border-purple-10 bg-white py-10">
      <div className="container-cf flex flex-col items-center gap-6 md:gap-7">
        <h2
          id="partners-title"
          className="text-center font-display text-sm font-semibold tracking-normal text-purple sm:text-base md:text-lg"
        >
          We only work with trusted partners and lenders
        </h2>
        {/* Phones: two per row, with an odd last logo centred across the row. Tablet and up: one even row. */}
        <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-6 sm:max-w-5xl sm:grid-cols-5">
          {partners.map((p) => (
            <li key={p.name} className="flex h-8 min-w-0 items-center justify-center last:odd:col-span-2 sm:last:odd:col-span-1 md:h-9">
              <img
                src={p.logo}
                alt={p.name}
                loading="lazy"
                className="max-h-full w-auto max-w-[min(100%,140px)] object-contain transition-transform duration-300 hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}