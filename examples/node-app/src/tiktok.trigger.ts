import {useEvent, useCondition, useAction, BaraTrigger} from '@bara/core';
import {EventTypes as TikTokEventTypes} from './tiktok.stream';

// TODO Import Event Source From Here Before Registering A Trigger

const sampleTrigger: BaraTrigger = {
  name: 'TikTok Trigger',
  event: useEvent(TikTokEventTypes.ON_TIME_ESLAPSED),
  condition: useCondition((triggeringEvent: any) => {
    return triggeringEvent.payload % 2 === 0;
  }),
  action: (triggeringEvent: any) => {
    console.log(`Action executed with: ${JSON.stringify(triggeringEvent)}`);
  },
};

export default sampleTrigger;
