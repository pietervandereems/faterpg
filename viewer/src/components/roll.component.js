import React, { useState } from 'react'
import { fudgeSet, rollDice } from '../utils/dice'
// import PropTypes from 'prop-types'

const Roll = () => {
  const [result, setResult] = useState(false)

  const roll = () => {
    setResult(rollDice(fudgeSet).result)
  }

  return (
    <section id='roll'>
      <h1>Roll</h1>
      <button onClick={roll}>Average</button>
      <section>{result}</section>
    </section>
  )
}

export default Roll
