import dice from '../dice'

describe('roll them dice', () => {
  const rollDie = (result) => ({ roll: () => result })
  const rollPlus = rollDie('+')

  describe('fudge', () => {
    test('4 +\'s should equal 4', () => {
      expect(dice.rollResult([rollPlus, rollPlus, rollPlus], rollPlus)).toEqual(4)
    })
  })
})
