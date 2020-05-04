import AspectListForm from './aspectListForm.component';
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
      <section>
        High Concept
        {aspectlist.highConcepts
          ? <ul>
            {aspectlist.highConcepts.map((aspect) => <Aspect key={aspect} aspect={aspect} />)}
          </ul>
          : null
        }
        <AspectListForm type="highConcept" />
      </section>
      <section>
        Trouble
        {aspectlist.troubles
          ? <ul>
            {aspectlist.troubles.map((aspect) => <Aspect key={aspect} aspect={aspect} />)}
          </ul>
          : null
        }
        <AspectListForm type="troubles" />
      </section>
      <section>
        Other
        {aspectlist.other
          ? <ul>
            {aspectlist.other.map((aspect) => <Aspect key={aspect} aspect={aspect} />)}
          </ul>
          : null
        }
        <AspectListForm type="other" />
      </section>
    </>
  );

};

Aspect.propTypes = {
  aspect: PropTypes.string
};

export default Aspects;
