export default (
  state = {
    isFetching: false,
  },
  action
) => {
  switch (action.type) {
    case 'REQUEST_CURRENCIES_LIST':
      return {
        ...state,
        isFetching: true,
      };

    case 'RECEIVE_CURRENCIES_LIST':
      return {
        ...state,
        isFetching: false,
        list: action.currencies,
        lastUpdated: action.lastUpdated,
      };
    default:
      return state;
  }
};
