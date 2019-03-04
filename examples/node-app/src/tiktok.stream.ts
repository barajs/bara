import {BaraStream} from '@bara/core';

export enum EventTypes {
  ON_TIME_ESLAPSED = 'ON_TIME_ESLAPSED',
}

const tiktok: BaraStream<number> = {
  name: 'Tik Tok',
  eventTypes: [EventTypes.ON_TIME_ESLAPSED],
  setup: ({emit}) => {
    let elapsed = 0;
    const timer = setInterval(() => {
      emit(EventTypes.ON_TIME_ESLAPSED, elapsed++);
    }, 1000);
  },
};

export const ONLY_EVEN_SECOND = (triggeringEvent: any) => triggeringEvent.payload % 2 === 0;

export const EVERY_X_SECOND = (x: number) => (triggeringEvent: any) => triggeringEvent.payload % x === 0;

export default tiktok;
