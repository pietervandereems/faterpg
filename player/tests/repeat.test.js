import { range, rangeFrom1, repeat, repeatFunc } from '../utils/repeat'
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

  describe('Range', () => {
    test('rangeFrom1(10) should give an array with numbers from 1 to 10', () => {
      const rangeList = rangeFrom1(10)
      expect(rangeList)
        .toHaveLength(10)

      expect(rangeList)
        .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
    test('range 3 14 should give an array with numbers from 3 to 14', () => {
      const rangeList = range(3)(14)
      expect(rangeList)
        .toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
    })
  })
})
