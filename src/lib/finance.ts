/** Standard amortised monthly payment for a fixed-rate loan. Used by the illustrative refinance calculator. */
export function estimateMonthly(balance: number, aprPercent: number, months: number) {
  const r = aprPercent / 100 / 12
  if (r === 0) return balance / months
  return (balance * r) / (1 - Math.pow(1 + r, -months))
}