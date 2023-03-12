import { Event, MappedEvent } from 'App/App.types';

/**
 * Create groups of overlapping events using an events array of objects
 * which contains an event id to treat each individual event uniquely
 */
export function getOverlappingEventGroups(events: MappedEvent[]) {
  // Sort the events by start date
  events.sort((a, b) => {
    const result = a.start - b.start;

    if (result) {
      return result;
    }

    return a.end - b.end;
  });

  const mappedEventGroups: MappedEvent[][] = [];

  let currentGroup: MappedEvent[] = [];
  let lastEnd = -1;

  // Create groups of overlapping events
  events.forEach((event) => {
    const start = event.start;
    const end = event.end;

    if (lastEnd < start) {
      currentGroup = [];

      mappedEventGroups.push(currentGroup);
    }

    currentGroup.push(event);

    lastEnd = Math.max(lastEnd, end);
  });

  return mappedEventGroups;
}

/**
 * Add an id to an event incrementally, using its index +1
 */
export function getEventsWithId(originalEvents: Event[]) {
  return originalEvents.map((event, index) => {
    return {
      ...event,
      id: index + 1,
    }
  });
}