import { render } from '@testing-library/react';
import { getError } from 'utils/errors.utils';
import { getEventsWithId, getOverlappingEventGroups } from 'utils/events.utils';
import App from './App';
import { Event, MappedEvent, RenderError } from './App.types';

test('renders core calendar HTML elements', () => {
  const { getByTestId } = render(<App />);

  const header = getByTestId('calendar-header');
  const hours = getByTestId('calendar-hours');
  const view = getByTestId('calendar-view');

  expect(header).toBeInTheDocument();
  expect(hours).toBeInTheDocument();
  expect(view).toBeInTheDocument();
});

test('ensures a valid event passes the error handling checks', () => {
  let result: RenderError | undefined | true;

  window.renderDay = (events: Event[]) => {
    const error = getError(events, 9);

    if (!error) {
      result = true;

      return;
    }

    result = error;
  };

  window.renderDay([{ start: 30, end: 90 }]);

  expect(result).toEqual(true);
});

test('an empty array event fails the TS error handling checks', () => {
  let result: RenderError | undefined | true;

  window.renderDay = (events: Event[]) => {
    const error = getError(events, 9);

    if (!error) {
      result = true;

      return;
    }

    result = error;
  };

  window.renderDay([]);

  expect(result).toEqual(RenderError.NO_OBJECT);
});

test('an event whose end time equals its start time fails the TS error handling checks', () => {
  let result: RenderError | undefined | true;

  window.renderDay = (events: Event[]) => {
    const error = getError(events, 9);

    if (!error) {
      result = true;

      return;
    }

    result = error;
  };

  window.renderDay([{ start: 10, end: 10 }]);

  expect(result).toEqual(RenderError.END_LESS_OR_EQUAL_TO_START);
});

test('an event whose end time is less than its start time fails the TS error handling checks', () => {
  let result: RenderError | undefined | true;

  window.renderDay = (events: Event[]) => {
    const error = getError(events, 9);

    if (!error) {
      result = true;

      return;
    }

    result = error;
  };

  window.renderDay([{ start: 10, end: 9 }]);

  expect(result).toEqual(RenderError.END_LESS_OR_EQUAL_TO_START);
});

test('an event whose end time exceeds the calendar total time fails the TS error handling checks', () => {
  let result: RenderError | undefined | true;

  window.renderDay = (events: Event[]) => {
    const error = getError(events, 9);

    if (!error) {
      result = true;

      return;
    }

    result = error;
  };

  window.renderDay([{ start: 10, end: 541 }]);

  expect(result).toEqual(RenderError.MORE_THAN_TOTAL_MINUTES);
});

test('an event whose end time exceeds the calendar total time fails the TS error handling checks', () => {
  let result: RenderError | undefined | true;

  window.renderDay = (events: Event[]) => {
    const error = getError(events, 9);

    if (!error) {
      result = true;

      return;
    }

    result = error;
  };

  window.renderDay([{ start: 10, end: 541 }]);

  expect(result).toEqual(RenderError.MORE_THAN_TOTAL_MINUTES);
});

test('all events should be mapped with an id, which matches the index + 1', () => {
  let result: MappedEvent[] = [];

  window.renderDay = (events: Event[]) => {
    result = getEventsWithId(events);
  };

  window.renderDay([{ start: 30, end: 120 }, { start: 300, end: 330 }, { start: 290, end: 330 }]);

  expect(result).toEqual([{ id: 1, start: 30, end: 120 }, { id: 2, start: 300, end: 330 }, { id: 3, start: 290, end: 330 }]);
});

test('all events with an id should be correctly mapped into overlapping groups', () => {
  let result: MappedEvent[][] = [];

  window.renderDay = (events: Event[]) => {
    const mappedEvents = getEventsWithId(events);

    result = getOverlappingEventGroups(mappedEvents);
  };

  window.renderDay([{ start: 30, end: 120 }, { start: 300, end: 330 }, { start: 290, end: 330 }]);

  expect(result).toEqual([
    [{ start: 30, end: 120, id: 1 }],
    [{ start: 290, end: 330, id: 3 }, { start: 300, end: 330, id: 2 }]
  ]);
});