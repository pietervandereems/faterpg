import { addHighConcepts, addOther, addTroubles } from '../reducers/aspects.reducer';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';

const AspectListForm = ({ type }) => {
  const dispatch = useDispatch();

  const processForm = (event) => {
    event.preventDefault();
    const list = event.target.list.value.split('\n');
    event.target.list.value = '';
    switch (type) {
      case 'troubles':
        return dispatch(addTroubles(list));
      case 'highConcept':
        return dispatch(addHighConcepts(list));
      case 'other':
        return dispatch(addOther(list));
      default:
        return dispatch(addHighConcepts(list));
    }
  };

  return (
    <form onSubmit={processForm}>
      <label>
        List:<textarea name="list"></textarea>
      </label>
      <button type="submit">Add</button>
    </form>
  );
};

AspectListForm.propTypes = {
  type: PropTypes.string
};

export default AspectListForm;
