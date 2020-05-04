import './App.css';
import React, { useEffect, useState } from 'react';
import Aspects from './components/aspects.component';
import Skills from './components/skills.component';
import { initializeAspects } from './reducers/aspects.reducer';
import { initializeSkills } from './reducers/skills.reducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const [showSkills, setShowSkills] = useState(false);
  const [showAspects, setShowAspects] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAspects());
    dispatch(initializeSkills());
  }, [dispatch]);


  return (
    <>
      <button onClick={() => setShowSkills(!showSkills)}>{showSkills ? 'Hide' : 'Show'} Skills</button>
      {showSkills ? <Skills /> : null}
      <button onClick={() => setShowAspects(!showAspects)}>{showAspects ? 'Hide' : 'Show'} Aspects</button>
      {showAspects ? <Aspects /> : null}
    </>
  );
};

export default App;
