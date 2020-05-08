const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_KEYWORDS':
      state = action.data;
      return state;

    case 'EMPTY_FILTER':
      return state = '';

    default:
      return state;
  }
};

export const updateFilterKeywords = (data) => {
  return {
    type: 'FILTER_KEYWORDS',
    data
  };
};

export const clearFilter = () => {
  return {
    type: 'EMPTY_FILTER'
  };
};

export default filterReducer;