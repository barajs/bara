import {useEvent} from '@bara/core';
import {EventTypes as TikTokEventTypes} from './tiktok.stream';

// TODO Import Event Source From Here Before Registering A Trigger

const sampleTrigger = {
  name: 'TikTok Trigger',
  event: useEvent(TikTokEventTypes.ON_TIME_ESLAPSED),
  action: (triggerId: number, triggeringEvent: any) => {
    if (triggeringEvent !== null) {
      console.log(triggeringEvent);
    } else {
      console.log('No event emitted!');
    }
  },
};

export default sampleTrigger;
