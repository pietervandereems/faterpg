import service from '../services/names.service';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_NAMES':
      return action.data;
    default:
      return state;
  }
};

export const initializeNames = () => async (dispatch) => {
  const skills = await service.getAll();
  dispatch({
    type: 'INIT_NAMES',
    data: skills
  });
};

export default reducer;
