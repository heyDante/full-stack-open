import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateFilterKeywords, clearFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const filterKeywords = useSelector(state => state.filter);

  const handleChange = (e) => {
    dispatch(updateFilterKeywords(e.target.value));
  };

  const handleClick = (e) => {
    dispatch(clearFilter());
    e.target.value = '';
  };

  return (
    <div className="filter">
      <h2>Filter</h2>
      <input
        value={filterKeywords}
        onChange={handleChange}
      />
      <button onClick={handleClick}>clear</button>
    </div>
  );
};

export default Filter;