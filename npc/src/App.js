import './App.css';
import React, { useEffect } from 'react';
import Skills from './components/skills.component';
import { initializeAspects } from './reducers/aspects.reducer';
import { initializeSkills } from './reducers/skills.reducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAspects());
    dispatch(initializeSkills());
  }, [dispatch]);

  return (
    <>
      <Skills />
    </>
  );
};

export default App;
