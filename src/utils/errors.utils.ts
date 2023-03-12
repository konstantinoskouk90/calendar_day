import { Event, RenderError } from 'App/App.types';

export function getError(events: Event[], diffInHours: number) {
  /*
   * Although we are using TypeScript which helps us check the input against the Event type in development we have
   * made the renderDay() function available via the window object and thus why we need additional JS error handling
  */

  // JS Errors
  if (!Array.isArray(events)) {
    return RenderError.NOT_OF_TYPE_ARRAY;
  }

  const incorrectProps = events.some((event) => typeof event.start === 'undefined' || typeof event.end === 'undefined');

  if (incorrectProps) {
    return RenderError.INCORRECT_PROPS;
  }

  // TS Errors
  const noObject = events.length === 0;

  if (noObject) {
    return RenderError.NO_OBJECT;
  }

  const dayRangeInMinutes = diffInHours * 60;
  const moreThanTotalMinutes = events.some((event) => event.end > dayRangeInMinutes);

  if (moreThanTotalMinutes) {
    return RenderError.MORE_THAN_TOTAL_MINUTES;
  }

  const endLessOrEqualToStart = events.some((event) => event.end <= event.start);

  if (endLessOrEqualToStart) {
    return RenderError.END_LESS_OR_EQUAL_TO_START;
  }
}