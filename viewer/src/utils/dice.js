import { range } from './repeat'

const dice = (sides = 6) => (range = ['+', '', '-']) => ({
  roll: () => {
    let roll = Math.floor(Math.random() * Math.floor(sides))

    while (roll > range.length - 1) {
      roll -= range.length
    }
    return range[roll]
  }
})

const interpretDie = (roll) => {
  switch (roll) {
    case '+':
      return 1
    case '-':
      return -1
    case '':
      return 0
    default:
      return parseInt(roll, 10)
  }
}

const rollDice = (dice = []) => dice.reduce(({ result = 0, rolls = [] }, die) => {
  const rolled = die.roll()
  return {
    result: result + interpretDie(rolled),
    rolls: [...rolls, rolled]
  }
}, { result: 0, rolls: [] })

const rangeFrom1 = range(1)
const d6sided = dice(6)

const fudge = d6sided(['+', '', '-'])
const d4 = dice(4)(rangeFrom1(4))
const d6 = d6sided(rangeFrom1(6))
const d8 = dice(8)(rangeFrom1(8))
const d10 = dice(10)(rangeFrom1(10))
const d20 = dice(20)(rangeFrom1(20))
const fudgeSet = [fudge, fudge, fudge, fudge]

export {
  dice,
  d4, d6, d8, d10, d20,
  fudgeSet,
  rollDice
}
