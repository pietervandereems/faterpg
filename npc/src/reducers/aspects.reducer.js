import service from '../services/aspect.service';

const reducer = (state = { highConcepts: [], troubles: [], other: [] }, action) => {
  switch (action.type) {
    case 'INIT_ASPECTS':
      return action.data;
    case 'UPDATE_HIGHCONCEPTS':
      return {
        ...state,
        highConcepts: action.data
      };
    case 'UPDATE_TROUBLES':
      return {
        ...state,
        troubles: action.data
      };
    case 'UPDATE_OTHER':
      return {
        ...state,
        other: action.data
      };
    default:
      return state;
  }
};

export const initializeAspects = () => async (dispatch) => {
  const aspects = await service.getAll();
  dispatch({
    type: 'INIT_ASPECTS',
    data: aspects
  });
};

const addType = (type = 'highConcepts') => (aspect = '') => async (dispatch, getState) => {
  const { aspects } = getState();
  const newAspects = await service.update({
    ...aspects,
    [type]: aspects[type].concat(aspect)
  });
  const dis = {
    type: `UPDATE_${type.toUpperCase()}`,
    data: newAspects.highConcepts
  };
  dispatch(dis);
};

export const addHighConcepts = addType('highConcepts');
export const addTroubles = addType('troubles');
export const addOther = addType('other');

export default reducer;
