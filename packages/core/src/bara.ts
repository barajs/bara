import * as R from 'ramda';
import xs from 'xstream';

import {Event} from './event';
import {Trigger} from './trigger';

export interface BaraApp {
  (): {triggers: any[]};
}

function Bara() {
  const hooks: any[] = [];
  const triggers: Trigger[][] = [];
  let currentHook = 0;

  function init() {}

  function registerTriggers(triggers) {
    triggers[currentHook] = triggers;
    console.log('All Triggers Has Been Registered!');
  }

  return {
    run: (app: BaraApp) => {
      const {triggers} = app();
      registerTriggers(triggers);
      currentHook = 0;
    },
    useEvent: () => {
      const eventData = null;
      return [eventData];
    },
    useState: (initValue: any) => {
      hooks[currentHook] = hooks[currentHook] || initValue;
      const setStateHookIndex = currentHook;
      const setState = (newState: any) => (hooks[setStateHookIndex] = newState);
      return [hooks[currentHook++], setState];
    },
  };
}

const {run, useState} = Bara();
export {run, useState};
