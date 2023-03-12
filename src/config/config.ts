import assert from 'assert';

const CALENDAR_START_HOUR = process.env.REACT_APP_CALENDAR_START_HOUR;
const CALENDAR_END_HOUR = process.env.REACT_APP_CALENDAR_END_HOUR;

assert(CALENDAR_START_HOUR, 'CALENDAR_START_HOUR must be defined');
assert(CALENDAR_END_HOUR, 'CALENDAR_END_HOUR must be defined');

const config = {
  CALENDAR_START_HOUR: Number(CALENDAR_START_HOUR),
  CALENDAR_END_HOUR: Number(CALENDAR_END_HOUR),
};
  
export default config;