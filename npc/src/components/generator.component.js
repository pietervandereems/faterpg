import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getRandomInt } from '../utils/utils';
import { useSelector } from 'react-redux';


const Npc = ({ stats: { highConcept, trouble, name } }) => (
  <section>
    <h3>{name}</h3>
    High Concept: {highConcept}<br />
    Trouble: {trouble}
  </section>
);


const Generator = () => {
  const names = useSelector((state) => state.names);
  const aspects = useSelector((state) => state.aspects);
  const [stats, setStats] = useState({});

  const createName = () => {
    const languages = Object.keys(names);
    const lang = () => languages[getRandomInt(languages.length)];
    let gender = '';
    const fname = (() => {
      const fnameLists = names[lang()].firstnames;
      gender = Object.keys(fnameLists)[getRandomInt(Object.keys(fnameLists).length)];
      return fnameLists[gender][getRandomInt(fnameLists[gender].length)];
    })();
    const lname = (() => {
      const lnameList = names[lang()].lastnames;
      return lnameList[getRandomInt(lnameList.length)];
    })();
    return `${fname} ${lname} (${gender})`;
  };

  const create = () => {
    setStats({
      name: createName(),
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
    name: PropTypes.string,
    highConcept: PropTypes.string,
    trouble: PropTypes.string
  })
};

export default Generator;
