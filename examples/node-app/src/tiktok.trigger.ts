import {useEvent, useCondition, useAction, BaraTrigger} from '@bara/core';
import {
  EventTypes as TikTokEventTypes,
  ONLY_EVEN_SECOND,
  EVERY_X_SECOND,
} from './tiktok.stream';

// TODO Import Event Source From Here Before Registering A Trigger

export const EveryTwoSecondsTrigger: BaraTrigger = {
  name: 'Console Every Two Seconds',
  event: useEvent(TikTokEventTypes.ON_TIME_ESLAPSED),
  condition: useCondition(ONLY_EVEN_SECOND),
  action: useAction(({payload}: any) => {
    console.log(`Console every two seconds: ${payload}`);
  }),
};

export const EveryXSecondsTrigger: BaraTrigger = {
  name: 'Console Every 20 Seconds',
  event: useEvent(TikTokEventTypes.ON_TIME_ESLAPSED),
  condition: useCondition(EVERY_X_SECOND(5)),
  action: useAction(({payload}: any) => {
    console.log(`Console every 5 seconds: ${payload}`);
  }),
};
