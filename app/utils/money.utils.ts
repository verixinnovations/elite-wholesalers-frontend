export function formatMoney(amount: number, currencyCode = 'USD', locale = 'en-AU') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  }).format(amount)
}
