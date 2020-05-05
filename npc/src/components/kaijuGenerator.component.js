import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getRandomInt } from '../utils/utils';
import { useSelector } from 'react-redux';


const Kaiju = ({ stats: { name, quirk } }) => (
  <section>
    <h3>{name}</h3>
    quirk: {quirk.name}<br />
    {quirk.description}
  </section>
);

const KaijuGenerator = () => {
  const kaijus = useSelector((state) => state.kaijus);
  const [stats, setStats] = useState({});

  const create = () => {
    const getFromTable = (table = []) => table[getRandomInt(table.length)];
    const getName = () => {
      switch (getRandomInt(20)) {
        case 0:
          return `${getFromTable(kaijus.names[0])} ${getFromTable(kaijus.names[4])}`;
        case 1:
          return `${getFromTable(kaijus.names[2])} ${getFromTable(kaijus.names[0])}`;
        case 2:
          return `${getFromTable(kaijus.names[1])} ${getFromTable(kaijus.names[3])}`;
        case 3:
          return `${getFromTable(kaijus.names[1])} ${getFromTable(kaijus.names[4])}`;
        case 4:
          return `${getFromTable(kaijus.names[2])} ${getFromTable(kaijus.names[3])}`;
        case 5:
          return `${getFromTable(kaijus.names[2])} ${getFromTable(kaijus.names[4])}`;
        case 6:
          return `${getFromTable(kaijus.names[2])} ${getFromTable(kaijus.names[5])}`;
        case 7:
          return `${getFromTable(kaijus.names[0])} ${getFromTable(kaijus.names[1])} ${getFromTable(kaijus.names[3])}`;
        case 8:
          return `${getFromTable(kaijus.names[0])} ${getFromTable(kaijus.names[1])} ${getFromTable(kaijus.names[4])}`;
        case 9:
          return `${getFromTable(kaijus.names[0])} ${getFromTable(kaijus.names[2])} ${getFromTable(kaijus.names[3])}`;
        case 10:
          return `${getFromTable(kaijus.names[0])} ${getFromTable(kaijus.names[2])} ${getFromTable(kaijus.names[4])}`;
        case 11:
          return `${getFromTable(kaijus.names[1])} ${getFromTable(kaijus.names[3])} ${getFromTable(kaijus.names[5])}`;
        case 12:
          return `${getFromTable(kaijus.names[1])} ${getFromTable(kaijus.names[4])} ${getFromTable(kaijus.names[5])}`;
        case 13:
          return `${getFromTable(kaijus.names[2])} ${getFromTable(kaijus.names[3])} ${getFromTable(kaijus.names[5])}`;
        case 14:
          return `${getFromTable(kaijus.names[2])} ${getFromTable(kaijus.names[5])} ${getFromTable(kaijus.names[5])}`;
        case 15:
          return `${getFromTable(kaijus.names[0])} ${getFromTable(kaijus.names[5])} ${getFromTable(kaijus.names[1])} ${getFromTable(kaijus.names[3])}`;
        case 16:
          return `${getFromTable(kaijus.names[0])} ${getFromTable(kaijus.names[5])} ${getFromTable(kaijus.names[1])} ${getFromTable(kaijus.names[4])}`;
        case 17:
          return `${getFromTable(kaijus.names[0])} ${getFromTable(kaijus.names[5])} ${getFromTable(kaijus.names[2])} ${getFromTable(kaijus.names[3])}`;
        case 18:
          return `${getFromTable(kaijus.names[0])} ${getFromTable(kaijus.names[5])} ${getFromTable(kaijus.names[2])} ${getFromTable(kaijus.names[5])}`;
        default:
          return `${getFromTable(kaijus.names[5])} ${getFromTable(kaijus.names[2])} ${getFromTable(kaijus.names[4])}`;

      }
    };
    setStats({
      name: getName(),
      quirk: kaijus.quirks[getRandomInt(kaijus.quirks.length)]
    });
  };

  return (
    <>
      <button onClick={create}>Kaiju</button>
      {stats.name ? <Kaiju stats={stats} /> : null}
    </>
  );
};

Kaiju.propTypes = {
  stats: PropTypes.shape({
    name: PropTypes.string,
    quirk: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    })
  })
};

export default KaijuGenerator;
