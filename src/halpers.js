export const timeFunc = (timeStamp) => {
  const time = new Date(timeStamp)
    .toLocaleTimeString()
    .split(':')
    .slice(0, 2)
    .join(':')
  return time
}
