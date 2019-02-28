import {useState, createTrigger} from '@bara/core';

export const firstTrigger = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Bara');
  setCount(count + 1);
  setName(`Bara-${count}`);
  console.log(`Current ${name} count: ${count}`);
};

export default createTrigger('First Trigger', () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Bara');
  setCount(count + 1);
  setName(`Bara-${count}`);
  console.log(`Current ${name} count: ${count}`);
});
