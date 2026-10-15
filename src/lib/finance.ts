export type RefinanceProduct = 'HP' | 'PCP'

/**
 * Illustrative refinance quote, reproducing the live carfinance247.co.uk/refinance calculator: the APR is converted
 * to an effective monthly rate; HP repays everything over the term, while PCP makes one fewer monthly payment and
 * leaves an optional final payment set as a share of the amount financed (`balloonShare`).
 */
export function refinanceQuote({
  amount,
  aprPercent,
  months,
  product,
  balloonShare,
  optionFee,
}: {
  amount: number
  aprPercent: number
  months: number
  product: RefinanceProduct
  balloonShare: number
  optionFee: number
}) {
  const r = Math.pow(1 + aprPercent / 100, 1 / 12) - 1
  // Like the live calculator, payments are rounded to the penny before the totals are worked out.
  const pennies = (n: number) => Math.round(n * 100) / 100
  if (product === 'HP') {
    const monthly = pennies((amount * r) / (1 - Math.pow(1 + r, -months)))
    const paid = monthly * months
    return { payments: months, monthly, finalPayment: 0, costOfCredit: paid - amount, totalRepayable: paid + optionFee }
  }
  const finalPayment = pennies(amount * balloonShare)
  const payments = months - 1
  const monthly = pennies(((amount - finalPayment * Math.pow(1 + r, -months)) * r) / (1 - Math.pow(1 + r, -payments)))
  const totalRepayable = monthly * payments + finalPayment
  return { payments, monthly, finalPayment, costOfCredit: totalRepayable - amount, totalRepayable }
}