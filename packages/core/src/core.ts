import xs, {Producer, Stream} from 'xstream';

export interface SetupCallbacks<T> {
  emit: (eventType: string, payload: T) => void;
  error?: (errorMessage: string) => void;
  done?: () => void;
}

export interface BaraStream<T> {
  name: string;
  eventTypes: string[];
  setup: (callback: SetupCallbacks<T>) => void;
}

export interface StreamAction<T> {
  eventType: string;
  payload: T;
}

export interface BaraTrigger {
  name: string;
  event: (triggerName: string) => void;
  condition?: (triggeringEvent: any) => boolean;
  action: (triggeringEvent: any) => void;
}

export interface BaraEvent {}

export interface BaraCondition {}

export interface BaraAction {}

export interface BaraApp {
  (): void;
}

interface StreamRegistry {
  stream: Stream<any>;
  config: BaraStream<any>;
  eventTypes: string[];
}

interface BaraStreamRegistry {
  0: string;
  1: StreamRegistry;
}

interface BaraTriggerRegistry {
  [key: string]: {config: BaraTrigger};
}

enum BUILTIN_EVENT {
  ON_BOOTSTRAP,
  ON_INITIALIZED,
  ON_TIME_ESLAPSED,
  ON_EXIT,
}

function Bara() {
  const streams: BaraStreamRegistry[] = [];
  const triggers: BaraTriggerRegistry = {};

  /**
   * Bootstrap Bara application.
   */
  function bootstrap(app: BaraApp) {
    app();
  }

  function isStreamRegistered<T>({name}: BaraStream<T>) {
    return streams.filter(s => s[0] === name).length > 0;
  }

  return {
    // Bara entrypoint
    register: (app: BaraApp) => {
      bootstrap(app);
    },
    // Below hooks must be called in main Bara Application
    useStream: <T>(
        streamConfig: BaraStream<T>,
        config?: any,
        ): [Stream<StreamAction<T>>] => {
      const slugName = streamConfig.name;  // TODO need to be slugified
      let stream$;
      if (!isStreamRegistered(streamConfig)) {
        // Construct a stream object for consumer
        stream$ = xs.create({
          start: listener => {
            const emit = (eventType: string, payload: T) => {
              listener.next({eventType, payload});
            };
            const error = listener.error;
            const done = listener.complete;
            streamConfig.setup({emit, error, done});
          },
          stop: () => {},
        });
        // Assign to public stream registry
        const eventTypes = streamConfig.eventTypes;
        streams.push([
          slugName,
          {
            eventTypes,
            config: streamConfig,
            stream: stream$,
          },
        ]);
        // Map the stream event with app source stream!
      } else {
        stream$ = streams[slugName];
        console.warn(
            `[Bara Stream] Warning: The stream ${
                slugName} has been duplicate registered, please remove redundant code!`,
        );
      }
      // This return allow multi forking for down stream
      return [stream$];
    },
    useTrigger: (triggerConfig: BaraTrigger) => {
      const slugName = triggerConfig.name;  // TODO need to be slugified
      if (!Boolean(slugName in triggers)) {
        triggers[slugName] = {
          config: triggerConfig,
        };
        triggers[slugName].config.event(slugName);
      } else {
        throw new Error(
            `[Bara Trigger] Error: Duplicate trigger name ${
                slugName} in the registry, please specify different name!`,
        );
      }
    },

    // Below hooks must be used in a Bara Trigger
    useEvent: (eventType: string, config?: any) => (triggerName: string) => {
      // Find existing stream based on event type
      const currentTrigger = triggers[triggerName];
      const upStreamRegistry = streams.find(
          s => s[1].eventTypes.indexOf(eventType) > -1,
      );
      if (upStreamRegistry) {
        console.debug(
            `[Bara Event] Found stream ${upStreamRegistry[0]} of event types ${
                eventType}`,
        );
        const newStream = upStreamRegistry[1].stream.filter(data => {
          if ('condition' in currentTrigger.config) {
            return currentTrigger.config.condition!(data);
          }
          return true;
        });
        const eventStream = newStream.subscribe({
          next: payload => {
            currentTrigger.config.action(payload);
          },
        });
      } else {
        console.warn(
            `[Bara Event] Not found any stream that will emit event type: ${
                eventType}`,
        );
      }
      console.debug(`[Bara Event] Registered ${eventType} from ${triggerName}`);
    },
    useCondition: (conditionFunc: (data: any) => boolean) => (
        triggeringEvent: any,
        ): boolean => conditionFunc(triggeringEvent),
    useAction: (actionFunc: (data: any) => void) => (triggeringEvent: any) => {
      actionFunc(triggeringEvent);
    },
  };
}

const {
  register,
  useStream,
  useTrigger,
  useEvent,
  useCondition,
  useAction,
} = Bara();

export {register, useStream, useTrigger, useEvent, useCondition, useAction};
