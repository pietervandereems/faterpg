import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const Aspect = ({ aspect }) => (
  <li>
    {aspect}
  </li>
);

const Aspects = () => {
  const aspectlist = useSelector((state) => state.aspects);
  if (!aspectlist) {
    return null;
  }

  return (
    <>
      <p>
        High Concept
        {aspectlist.highConcepts
          ? <ul>
            {aspectlist.highConcepts.map((aspect) => <Aspect key={aspect} aspect={aspect} />)}
          </ul>
          : null
        }
      </p>
      <p>
        Trouble
        {aspectlist.troubles
          ? <ul>
            {aspectlist.troubles.map((aspect) => <Aspect key={aspect} aspect={aspect} />)}
          </ul>
          : null
        }
      </p>
      <p>
        Other
        {aspectlist.other
          ? <ul>
            {aspectlist.other.map((aspect) => <Aspect key={aspect} aspect={aspect} />)}
          </ul>
          : null
        }
      </p>
    </>
  );

};

Aspect.propTypes = {
  aspect: PropTypes.string
};

export default Aspects;
