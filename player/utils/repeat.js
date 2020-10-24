const repeatFunc = (times = 1, func = () => { }) => Array.from({ length: times }, func)
const repeat = (times = 1, value) => repeatFunc(times, () => value)

export {
  repeatFunc,
  repeat
}
