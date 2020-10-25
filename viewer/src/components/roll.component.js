import React, { useState } from 'react'
import { fudgeSet, rollDice } from '../utils/dice'
// import PropTypes from 'prop-types'

const Roll = () => {
  const [rolled, setRolled] = useState(false)

  const roll = () => {
    setRolled(rollDice(fudgeSet))
  }

  return (
    <section id='roll'>
      <h1>Roll</h1>
      <button onClick={roll}>Average</button>
      <section><p title={rolled.rolls}>{rolled.result}</p></section>
    </section>
  )
}

export default Roll
