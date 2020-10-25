const repeatFunc = (times = 1, func = () => { }) => Array.from({ length: times }, func)
const repeat = (times = 1, value) => repeatFunc(times, () => value)

const rangeFunc = (start) => (_ignore, index) => index + start
const range = (start) => (end) => repeatFunc(end - start + 1, rangeFunc(start))
const rangeFrom1 = range(1)

export {
  repeatFunc,
  repeat,
  range,
  rangeFrom1
}
