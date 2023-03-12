import styled from 'styled-components';

export const CalendarDay = styled.header`
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: center;
`;

export const CalendarContainer = styled.div`
  display: flex;
`;

export const CalendarHours = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CalendarHourLabelWrapper = styled.div<{ labelWrapperHeight: number }>`
  display: flex;
  height: ${props => `${props.labelWrapperHeight}%`};
  text-align: center;
`;

export const CalendarHourLabel = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  width: 50px;
`;

export const CalendarView = styled.div`
  background-color: #ffffff;
  height: calc(100vh - 60px);
  min-height: 600px;
  position: relative;
  width: 100%;
`;

export const CalendarHourRow = styled.div<{ calendarRowHeight: number }>`
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  border-top: 1px solid #d3d3d3;
  box-sizing: border-box;
  height: ${props => `${props.calendarRowHeight}%`};
  width: 100%;
`;

export const CalendarEventsWrapper = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const CalendarEvent = styled.div<{ eventHeight: number, left: number, top: number, eventWidth: number }>`
  background-color: #B3E1F7;
  border: 1px solid #808080;
  border-radius: 6px;
  box-sizing: border-box;
  height: ${props => `${props.eventHeight}%`};
  left: ${props => `${props.left}%`};
  position: absolute;
  top: ${props => `${props.top}%`};
  width: ${props => `${props.eventWidth}%`};
`;