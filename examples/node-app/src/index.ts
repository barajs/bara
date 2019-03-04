import {register, useStream, useTrigger} from '@bara/core';
import TikTokStream from './tiktok.stream';
import {EveryTwoSecondsTrigger, EveryXSecondsTrigger} from './tiktok.trigger';

const app = () => {
  useStream(TikTokStream);
  useTrigger(EveryTwoSecondsTrigger);
  useTrigger(EveryXSecondsTrigger);
};

register(app);
