import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getRandomInt } from '../utils/utils';
import { useSelector } from 'react-redux';


const Npc = ({ stats }) => (
  <section>
    High Concept: {stats.highConcept}<br />
    Trouble: {stats.trouble}
  </section>
);


const Generator = () => {
  // const skilllist = useSelector((state) => state.skills);
  const aspects = useSelector((state) => state.aspects);
  const [stats, setStats] = useState({});
  const create = () => {
    setStats({
      highConcept: aspects.highConcepts[getRandomInt(aspects.highConcepts.length)],
      trouble: aspects.troubles[getRandomInt(aspects.troubles.length)]
    });
  };

  return (
    <>
      <button onClick={create}>Npc</button>
      {stats.trouble ? <Npc stats={stats} /> : null}
    </>
  );
};

Npc.propTypes = {
  stats: PropTypes.shape({
    highConcept: PropTypes.string,
    trouble: PropTypes.string
  })
};

export default Generator;
