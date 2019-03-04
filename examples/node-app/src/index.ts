import {register, useStream, useTrigger} from '@bara/core';
import TikTokStream from './tiktok.stream';
import TikTokTrigger from './tiktok.trigger';

const app = () => {
  useStream(TikTokStream);
  //const [tiktok$] = useStream(TikTokStream);
  //tiktok$.addListener({
    //next: payload => {
      //console.log(payload);
    //},
  //});
  useTrigger(TikTokTrigger);
};

register(app);
