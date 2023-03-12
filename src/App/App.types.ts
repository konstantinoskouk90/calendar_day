export type Event = {
  start: number;
  end: number;
};

export type MappedEvent = {
  id: number;
  start: number;
  end: number;
};

export type Group = {
  id: number;
  order: number;
  count: number;
};

export enum RenderError {
  NOT_OF_TYPE_ARRAY = 'Input should be of type array!',
  NO_OBJECT = 'Array should contain at least one object!',
  INCORRECT_PROPS = 'All of the array objects should consist of start and end fields!',
  MORE_THAN_TOTAL_MINUTES = 'The end time of an event can never exceed the end time of the calendar!',
  END_LESS_OR_EQUAL_TO_START = 'The end time of an event can never be less than or equal to the start time!',
}