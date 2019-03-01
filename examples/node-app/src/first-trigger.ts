import {createTrigger, useVar, useEvent} from '@bara/core';

const firstTrigger = {
  name: 'First Trigger',
  event: (triggerId: number) => {
    return useEvent('APP_SECONDS', triggerId, []);
  },
  action: (triggerId: number, triggeringEvent: any) => {
    const [count, setCount] = useVar(0);
    const [name, setName] = useVar('Bara');
    if (triggeringEvent !== null) {
      setName(`Bara-${count}`);
      setCount(count + 1);
      console.log(
        `Event data: ${triggeringEvent} - Current ${name} count: ${count}`,
      );
    } else {
      console.log('No event emitted!');
    }
  },
};

export default createTrigger(firstTrigger);
