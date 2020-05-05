import { applyMiddleware, combineReducers, createStore } from 'redux';
import aspects from '../reducers/aspects.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import kaijus from '../reducers/kaijus.reducer';
import skills from '../reducers/skills.reducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  aspects,
  kaijus,
  skills
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
