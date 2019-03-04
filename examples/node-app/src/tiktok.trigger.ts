import {useEvent, BaraTrigger} from '@bara/core';
import {EventTypes as TikTokEventTypes} from './tiktok.stream';

// TODO Import Event Source From Here Before Registering A Trigger

const sampleTrigger: BaraTrigger = {
  name: 'TikTok Trigger',
  event: useEvent(TikTokEventTypes.ON_TIME_ESLAPSED),
  action: (triggeringEvent: any) => {
    console.log(`Action executed with: ${JSON.stringify(triggeringEvent)}`);
  },
};

export default sampleTrigger;
