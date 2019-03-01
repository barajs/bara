import {run} from '@bara/core';
import firstTrigger from './first-trigger';

const app = () => {
  console.log('Hello Bara application!');
  return {
    triggers: [firstTrigger],
  };
};

run(app);
