export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_CURRENCY':
      return [
        ...state,
        {
          id: action.id,
        },
      ];
    default:
      return state;
  }
};
