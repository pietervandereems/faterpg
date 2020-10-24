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

const rollResult = (dice = []) => dice.reduce((result, die) => result + interpretDie(die.roll()), 0)

const d6sided = dice(6)
const fudge = d6sided(['+', '', '-'])
const d4 = dice(4)([1, 2, 3, 4])
const d6 = d6sided([1, 2, 3, 4, 5, 6])
const d8 = dice(8)([1, 2, 3, 4, 5, 6, 7, 8])
const d20 = dice(20)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)
const d10 = dice(10)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
const fudgeSet = [fudge, fudge, fudge, fudge]

export {
  dice,
  d4, d6, d8, d10, d20,
  fudgeSet,
  rollResult
}
