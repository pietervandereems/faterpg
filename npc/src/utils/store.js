import { applyMiddleware, combineReducers, createStore } from 'redux';
import aspects from '../reducers/aspects.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import skills from '../reducers/skills.reducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  aspects,
  skills
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
