import {createTrigger, useState, useEvent} from '@bara/core';

export default createTrigger('First Trigger', (triggerId: number) => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Bara');
  const hasSecondsEvent = useEvent('APP_SECONDS', triggerId, [count, name]);
  if (hasSecondsEvent !== null) {
    setCount(count + 1);
    setName(`Bara-${count}`);
    console.log(
      `Event data: ${hasSecondsEvent} - Current ${name} count: ${count}`,
    );
  } else {
    console.log('No event emitted!');
  }
});
