export interface Trigger {
  name: string;
  event?: (triggerId: number) => void;
  conditions?: (triggerId: number) => void;
  action: (triggerId: number, triggeringEvent: any) => void;
  activate?: (triggerId: number) => void;
}

export function createTrigger(trigger: Trigger): Trigger {
  // TODO Implement any pre-register in here
  return trigger;
}
