import { CURRENCY_RATE } from './api-endpoints';

const dateFormatter = Intl.DateTimeFormat('sv'); // YYYY-MM-DD

// eslint-disable-next-line import/prefer-default-export
export const createAPIURLToRate = (from, to, date) => {
  // Valid params.
  if (typeof from !== 'string' || from.length === 0) {
    throw new TypeError(
      '`from` must be a non empty string representing currency symbol.'
    );
  }

  if (
    !(to === null || typeof to === 'string' || Array.isArray(to)) ||
    (to !== null && to.length === 0) ||
    (Array.isArray(to) &&
      to.find((el) => typeof el !== 'string' || el.length === 0))
  ) {
    throw new TypeError(
      '`to` must be a null OR non empty string OR array of strings representing currency symbol.'
    );
  }

  if (date instanceof Date && !Number.isNaN(date.valueOf(date))) {
    throw new TypeError('`date` must be a valid Date');
  }

  // Create URL.
  const APIURL = new URL(CURRENCY_RATE);

  APIURL.pathname = dateFormatter.format(date);
  APIURL.searchParams.set('from', from.toUpperCase());

  // Set 'to' param.
  if (to !== null) {
    let toParam = '';
    if (Array.isArray(to)) {
      toParam = to.join(',');
    } else {
      toParam = to;
    }

    APIURL.searchParams.set('to', toParam);
  }

  return APIURL.toString();
};

export const formatDate = (date) => dateFormatter.format(date);
