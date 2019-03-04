import {register, useStream} from '@bara/core';
import TitTokStream from './tiktok.stream';

const app = () => {
  const [tiktok$] = useStream(TitTokStream);
  tiktok$.addListener({
    next: payload => {
      console.log(payload);
    },
  });
  console.log('Hello Bara application!');
};

register(app);
