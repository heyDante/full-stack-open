import React from 'react';
import { useDispatch, connect } from 'react-redux';

import { updateFilterKeywords, clearFilter } from '../reducers/filterReducer';

const Filter = ({ filterKeywords }) => {
  const dispatch = useDispatch();

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

const mapStateToProps = (state) => {
  return {
    filterKeywords: state.filter
  };
};

export default connect(mapStateToProps)(Filter);