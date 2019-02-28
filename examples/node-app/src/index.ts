import {run} from '@bara/core';
import first from './first-trigger';

const app = () => {
  console.log('Hello Bara application!');
  return {
    triggers: [first],
  };
};

run(app);
