import { Currency } from '~/types/enums';

export const NumberFunctions = {
  formatNumber(value: number | string) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return formatter.format(Number(value));
  },

  formatCurrency(value: number, currency = Currency.NGN) {
    const formattedNumber = Number(value);
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currencyDisplay: 'narrowSymbol',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      roundingMode: 'trunc',
    });

    // if (formattedNumber >= 1e12) {
    //   return formatter.format(formattedNumber / 1e9) + 'B'
    // }
    // if (formattedNumber >= 1e9) {
    //   return formatter.format(formattedNumber / 1e6) + 'M'
    // } else if (formattedNumber >= 1e6) {
    //   return formatter.format(formattedNumber) + 'k'
    // } else {
    // }
    return formatter.format(formattedNumber);
  },

  maskNumber: (text: string) => {
    const masked = text
      .slice(text.length - 9, text.length)
      .split('')
      .map((i, index) => (index < 5 ? (i = '*') : i));
    return {
      masked: masked.join(''),
      actual: text,
    };
  },
};
