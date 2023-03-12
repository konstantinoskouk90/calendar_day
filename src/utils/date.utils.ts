export function getDate(hours: number, minutes: number, seconds: number, milliseconds: number) {
  const now = new Date();

  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(seconds);
  now.setMilliseconds(milliseconds);

  return now;
}

export function getDatesArr(start: number, end: number) {
  const arr = [];

  for (let i = start; i < end; i++) {
    arr.push(getDate(i, 0, 0, 0));
  }

  return arr;
}