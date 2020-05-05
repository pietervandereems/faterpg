import service from '../services/kaiju.service';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'INIT_KAIJUS':
      return action.data;
    default:
      return state;
  }
};

export const initializeKaijus = () => async (dispatch) => {
  const kaijus = await service.getAll();
  dispatch({
    type: 'INIT_KAIJUS',
    data: kaijus
  });
};

export default reducer;
