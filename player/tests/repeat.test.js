import { repeat, repeatFunc } from '../utils/repeat'
import { jest } from '@jest/globals'

describe('Repeat Module', () => {
  describe('Repeat value', () => {
    test('a repeat of 8 should return an array of length 8', () => {
      const arr = repeat(8, 0)
      expect(arr)
        .toHaveLength(8)
    })
    test('a repeat of 9 0\'s should result in an array with 9 0\'s', () => {
      const arr = repeat(9, 0)
      expect(arr)
        .toHaveLength(9)

      expect(arr)
        .toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0])
    })
  })

  describe('Repeat function', () => {
    test('a function repeat of 10 should call that function 10 times', () => {
      const mock = jest.fn()
      repeatFunc(10, mock)

      expect(mock.mock.calls)
        .toHaveLength(10)
    })

    test('a function repeat of 11 should create an array of length 11 filled with the result of the function', () => {
      const mock = jest.fn(() => 1 + 1)
      const result = repeatFunc(11, mock)

      expect(result)
        .toHaveLength(11)

      expect(result)
        .toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])
    })
  })
})
