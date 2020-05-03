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
  console.log('initializeSkills');
  const skills = await service.getAll();
  console.log('initializeSkills', { skills });
  dispatch({
    type: 'INIT_SKILLS',
    data: skills
  });
};

export default reducer;
