import { rollResult, fudgeSet } from '../dice.js'
import { repeat } from '../utils/repeat'

describe('roll them dice', () => {
  const rollDie = (result) => ({ roll: () => result })
  const rollPlus = rollDie('+')
  const rollMin = rollDie('-')
  const rollBlank = rollDie('')

  describe('fudge', () => {
    test('+ + + + should equal 4', () => {
      expect(rollResult([rollPlus, rollPlus, rollPlus, rollPlus]))
        .toEqual(4)
    })

    test('+ - blank blank should equal 0', () => {
      expect(rollResult([rollPlus, rollMin, rollBlank, rollBlank]))
        .toEqual(0)
    })

    test('A fudgeset should contain 4 dice', () => {
      expect(fudgeSet.length)
        .toEqual(4)
    })

    test('A fudgeset result should be between -4 and 4', () => {
      const fudgeRoll = rollResult(fudgeSet)
      const roll100 = repeat(100, fudgeRoll)

      roll100.forEach((roll) => {
        expect(roll)
          .toBeGreaterThanOrEqual(-4)

        expect(roll)
          .toBeLessThanOrEqual(4)
      })
    })
  })
})
