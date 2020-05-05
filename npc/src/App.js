import './App.css';
import React, { useEffect, useState } from 'react';
import Aspects from './components/aspects.component';
import Generator from './components/generator.component';
import KaijuGenerator from './components/kaijuGenerator.component';
import Skills from './components/skills.component';
import { initializeAspects } from './reducers/aspects.reducer';
import { initializeKaijus } from './reducers/kaijus.reducer';
import { initializeNames } from './reducers/names.reducer';
import { initializeSkills } from './reducers/skills.reducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const [showSkills, setShowSkills] = useState(false);
  const [showAspects, setShowAspects] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAspects());
    dispatch(initializeSkills());
    dispatch(initializeKaijus());
    dispatch(initializeNames());
  }, [dispatch]);


  return (
    <>
      <button onClick={() => setShowSkills(!showSkills)}>{showSkills ? 'Hide' : 'Show'} Skills</button>
      {showSkills ? <Skills /> : null}
      <button onClick={() => setShowAspects(!showAspects)}>{showAspects ? 'Hide' : 'Show'} Aspects</button>
      {showAspects ? <Aspects /> : null}
      <Generator />
      <KaijuGenerator />
    </>
  );
};

export default App;
