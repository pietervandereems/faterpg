import service from '../services/skill.service';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_SKILLS':
      return action.data;
    default:
      return state;
  }
};

export const initializeSkills = () => async (dispatch) => {
  const skills = await service.getAll();
  dispatch({
    type: 'INIT_SKILLS',
    data: skills
  });
};

export default reducer;
