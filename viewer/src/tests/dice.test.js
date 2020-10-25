import { rollDice, fudgeSet } from '../utils/dice'
import { repeat } from '../utils/repeat'

describe('roll them dice', () => {
  const rollDie = (result) => ({ roll: () => result })
  const rollPlus = rollDie('+')
  const rollMin = rollDie('-')
  const rollBlank = rollDie('')

  describe('fudge', () => {
    test('+ + + + should equal 4', () => {
      const fudgeRoll = rollDice([rollPlus, rollPlus, rollPlus, rollPlus])
      expect(fudgeRoll.result)
        .toEqual(4)
      expect(fudgeRoll.rolls)
        .toEqual(['+', '+', '+', '+'])
    })

    test('+ - blank blank should equal 0', () => {
      const fudgeRoll = rollDice([rollPlus, rollMin, rollBlank, rollBlank])
      expect(fudgeRoll.result)
        .toEqual(0)
      expect(fudgeRoll.rolls)
        .toEqual(['+', '-', '', ''])
    })

    test('A fudgeset should contain 4 dice', () => {
      expect(fudgeSet.length)
        .toEqual(4)
    })

    test('A fudgeset result should be between -4 and 4', () => {
      const fudgeRoll = rollDice(fudgeSet)
      const roll100 = repeat(100, fudgeRoll)

      roll100.forEach(({ result }) => {
        expect(result)
          .toBeGreaterThanOrEqual(-4)

        expect(result)
          .toBeLessThanOrEqual(4)
      })
    })
  })
})
