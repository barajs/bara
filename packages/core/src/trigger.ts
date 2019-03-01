import {Event} from './event';

export interface Trigger {
  name: string;
  activate: (triggerId: number) => void;
}

let useEventIndex = 0;
const useEventHooks = [];
const events = [];

interface EventAction {
  (eventName: string, payload: unknown): void;
}

interface EventHook<T> extends Array<Event<T>|EventAction> {
  0: Event<T>;
  1: EventAction;
}

function registerEventHook<T>(index: number, event: Event<T>) {
  if (!useEventHooks[index]) {
    console.log(`Registering event: ${event.name}`);
    (events as Array<Event<T>>).push(event);
    (useEventHooks as Array<EventHook<T>>).push([
      event,
      (eventName, payload) => {
        event.name = eventName;
      },
    ]);
  }

  return useEventHooks[index];
}

export function useEvent<T>(event: Event<T>) {
  const hookEvent = registerEventHook(useEventIndex, event);
  useEventIndex++;
  return [events, () => {}];
}

export function createTrigger(
    name: string, triggerFunc: (triggerId: number) => void): Trigger {
  const trigger: Trigger = {
    name,
    activate: triggerFunc,
  };
  return trigger;
}
