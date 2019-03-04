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

export default tiktok;
