import * as R from 'ramda';
import xs from 'xstream';

import {Trigger} from './trigger';

interface Event {
  name: string;
}

export interface BaraApp {
  (): {triggers: any[]};
}

// Bara Application Algorithm
// Step 1: Register Up Stream Events
// Step 2: Register Triggers Event With Up Stream
// Step 3: Stream Emitting Events
// Step 4: Trigger Run Conditions Filter
// Step 5: Trigger Execute Actions When The Conditions Is Passed

function Bara() {
  const hooks: any[] = [];
  const streamHooks: any[] = [];
  const eventHooks: any[] = [];
  const eventDatas: any[] = [];
  const triggerList: any[] = [];
  // NEW
  const triggerRegistry: any[] = [];

  let currentHook = 0;
  let currentStreamHook = 0;

  // Temporary streams
  const appSeconds = xs.periodic(3000);
  eventHooks.push(['APP_SECONDS', appSeconds]);

  function execTrigger(triggerId: number) {
    triggerList[triggerId].activate(triggerId);
    currentHook = 0;
  }

  function registerTrigger(triggerId, trigger) {
    triggerRegistry.push([{event: trigger.event()}]);
    console.log(`Trigger ${triggerId} "${trigger.name}" activated!`);
  }

  function registerTriggers(triggers: Trigger[]) {
    triggers.map((trigger, triggerId) => {
      if (!triggerList[triggerId]) {
        triggerList[triggerId] = trigger;
        registerTrigger(triggerId, trigger);
      }
    });
    console.log(`${triggers.length} trigger(s) has been registered!`);
  }

  function registerEvent(eventName: string, triggerId: number): any {
    if (!streamHooks[currentStreamHook]) {
      // Find source up stream of type `eventName`
      const eventSource = eventHooks.filter(([sourceName]) => {
        return sourceName === eventName;
      });
      // When there is an upstream event available, add a listener to it
      if (eventSource[0]) {
        console.log('Upstream available!');
        const [name, stream] = eventSource[0];
        const listener = {
          next: value => {
            eventDatas[currentStreamHook] = value;
            if (triggerList[triggerId] !== undefined) {
              execTrigger(triggerId);
            }
          },
          complete: () => console.log(`EVENT ${eventName} STOPPED LISTENING!`),
        };
        stream.addListener(listener);
        streamHooks[currentStreamHook++] = stream;
      } else {
        console.log('Upstream not available!');
      }
    }
    return eventDatas[currentStreamHook] ? eventDatas[currentStreamHook] : null;
  }

  return {
    run: (app: BaraApp) => {
      const {triggers} = app();
      registerTriggers(triggers);
      currentHook = 0;
      currentStreamHook = 0;
    },
    useEventSource: (eventName: string) => (triggerId: number) => {},
    useEvent: (eventName: string, triggerId: number, depsArray: any[]): any => {
      const hasNoDeps = !depsArray;
      let deps = hooks[currentHook];
      const hasChangedDeps =
          deps ? !depsArray.every((el, i) => el === deps[i]) : true;
      if (hasNoDeps || hasChangedDeps) {
        deps = depsArray;
      }
      currentHook++;
      return registerEvent(eventName, triggerId);
    },
    useVar: (initValue: any) => {
      hooks[currentHook] = hooks[currentHook] || initValue;
      const setStateHookIndex = currentHook;
      const setState = (newState: any) => {
        hooks[setStateHookIndex] = newState;
      };
      return [hooks[currentHook++], setState];
    },
  };
}

const {run, useVar, useEvent, useEventSource} = Bara();
export {run, useVar, useEvent, useEventSource};
