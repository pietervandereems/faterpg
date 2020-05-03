import service from '../services/aspect.service';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ASPECTS':
      return action.data;
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

export default reducer;
