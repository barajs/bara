import * as R from 'ramda';
import xs from 'xstream';

import {Trigger} from './trigger';

interface Event {
  name: string;
}

export interface BaraApp {
  (): {triggers: any[]};
}

function Bara() {
  const hooks: any[] = [];
  const streamHooks: any[] = [];
  const eventHooks: any[] = [];
  const eventDatas: any[] = [];
  const triggerList: any[] = [];
  let currentHook = 0;
  let currentStreamHook = 0;

  // Temporary streams
  const appSeconds = xs.periodic(3000);
  eventHooks.push(['APP_SECONDS', appSeconds]);

  function registerStreams(streams) {}

  function registerTriggers(triggers: Trigger[]) {
    triggers.map((trigger, index) => {
      if (!triggerList[index]) {
        triggerList[index] = trigger;
        trigger.activate(
            index);  // Execute trigger function, this function should be called
                     // at the first time Bara application initialized.
        console.log(`Trigger ${index} "${trigger.name}" activated!`);
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
      console.log(`Found Event Source: ${eventSource}`);
      // When there is an upstream event available, add a listener to it
      if (eventSource[0]) {
        console.log('Upstream available!');
        const [name, stream] = eventSource[0];
        const listener = {
          next: value => {
            eventDatas[currentStreamHook] = value;
            if (triggerList[triggerId] !== undefined) {
              triggerList[triggerId].activate(triggerId);
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
    useEvent: (eventName: string, triggerId: number): any => {
      return registerEvent(eventName, triggerId);
    },
    useState: (initValue: any) => {
      hooks[currentHook] = hooks[currentHook] || initValue;
      const setStateHookIndex = currentHook;
      const setState = (newState: any) => (hooks[setStateHookIndex] = newState);
      return [hooks[currentHook++], setState];
    },
  };
}

const {run, useState, useEvent} = Bara();
export {run, useState, useEvent};
