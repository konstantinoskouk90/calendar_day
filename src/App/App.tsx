import { useEffect, useState } from 'react';
import { differenceInHours, format } from 'date-fns';
import { getDate, getDatesArr } from 'utils/date.utils';
import { getError } from 'utils/errors.utils';
import { getEventsWithId, getOverlappingEventGroups } from 'utils/events.utils';
import config from 'config/config';
import { Event, Group, MappedEvent } from './App.types';
import {
  CalendarContainer,
  CalendarDay,
  CalendarEvent,
  CalendarEventsWrapper,
  CalendarHourLabel,
  CalendarHourLabelWrapper,
  CalendarHourRow,
  CalendarHours,
  CalendarView,
} from './App.styles';

// Extend the window object to include the renderDay function
declare global {
  interface Window { renderDay: (events: Event[]) => void; }
}

// Get values from config
const startHour = config.CALENDAR_START_HOUR;
const endHour = config.CALENDAR_END_HOUR;

// Get start and end date
const start = getDate(startHour, 0, 0, 0);
const end = getDate(endHour, 0, 0, 0)

// Estimate difference in hours and get all dates within day range
const diffInHours = differenceInHours(end, start);
const datesArr = getDatesArr(startHour, endHour);

function App() {
  const [events, setEvents] = useState<MappedEvent[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  // Helper functions to get coordinates and width / height required to position an event on the calendar view
  const getCalendarEventLeft = (order?: number, count?: number) => count && order && order > 1 ? (order - 1) * (100 / count) : 0;
  const getCalendarEventTop = (start: number) => (100 / diffInHours) * (start / 60);
  const getCalendarEventHeight = (start: number, end: number) => (100 / diffInHours) * ((end - start) / 60);
  const getCalendarEventWidth = (count?: number) => count || 1;

  useEffect(() => {
    window.renderDay = (originalEvents: Event[]) => {
      // Input error handling
      const error = getError(originalEvents, diffInHours);

      if (error) {
        throw new Error(error);
      }

      // Reset state every time we run the global render function
      setEvents([]);
      setGroups([]);

      // Event mapping
      const events: MappedEvent[] = getEventsWithId(originalEvents);
      setEvents(events);

      // Group mapping
      const overlappingEventGroups = getOverlappingEventGroups(events);

      overlappingEventGroups.forEach((group) => {
        // Do not map event groups that have a single entry
        if (group.length <= 1) {
          return;
        }

        // Map rest of the event groups
        group.forEach((event, index) => {
          // Set mapped event group state
          setGroups((oldGroup: Group[]) => [{
            id: event.id,
            order: index + 1,
            count: group.length,
          }, ...oldGroup]);
        });
      });
    };
  }, []);

  return (
    <>
      <CalendarDay data-testid='calendar-header'>
        {format(new Date(), 'cccc, do LLLL yyyy')} &#x2022; {Intl.DateTimeFormat().resolvedOptions().timeZone}
      </CalendarDay>
      <CalendarContainer>
        <CalendarHours data-testid='calendar-hours'>
          {/* Render hour labels */}
          {datesArr.map((date, index) => {
            return (
              <CalendarHourLabelWrapper key={index} labelWrapperHeight={100 / diffInHours}>
                <CalendarHourLabel>{format(date, 'h aa')}</CalendarHourLabel>
              </CalendarHourLabelWrapper>
            )
          })}
        </CalendarHours>
        <CalendarView data-testid='calendar-view'>
          <>
            {/* Render hour rows */}
            {datesArr.map((_date, index) => <CalendarHourRow key={index} calendarRowHeight={100 / diffInHours}></CalendarHourRow>)}
            {/* Render events */}
            <CalendarEventsWrapper>
              {events.map((event, index) => {
                // Get the number of overlapping events and event order in group
                const group = groups.filter((el) => el.id === event.id)?.[0];

                return (
                  <CalendarEvent
                    key={index}
                    left={getCalendarEventLeft(group?.order, group?.count)}
                    top={getCalendarEventTop(event.start)}
                    eventHeight={getCalendarEventHeight(event.start, event.end)}
                    eventWidth={100 / getCalendarEventWidth(group?.count)}
                  />
                )
              })}
            </CalendarEventsWrapper>
          </>
        </CalendarView>
      </CalendarContainer>
    </>
  );
}

export default App;
