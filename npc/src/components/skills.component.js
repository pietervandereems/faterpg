import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const Skill = ({ skill }) => (
  <li>
    {skill}
  </li>
);

const Skills = () => {
  const skilllist = useSelector((state) => state.skills);
  if (!skilllist) {
    return null;
  }

  return (
    <ul>
      {skilllist.map((skill) => <Skill key={skill} skill={skill} />)}
    </ul>
  );

};

Skill.propTypes = {
  skill: PropTypes.string
};

export default Skills;
