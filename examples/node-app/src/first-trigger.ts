import {useState, useEvent, createTrigger} from '@bara/core';

export default createTrigger('First Trigger', (triggerId: number) => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Bara');
  const hasSecondsEvent = useEvent('APP_SECONDS', triggerId);
  if (hasSecondsEvent) {
    setCount(count + 1);
    setName(`Bara-${count}`);
    console.log(`Event data: ${hasSecondsEvent} - Current ${name} count: ${count}`);
  } else {
    console.log('No event emitted!');
  }
});
