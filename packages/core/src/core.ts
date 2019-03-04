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

export interface BaraTrigger {}

export interface BaraEvent {}

export interface BaraCondition {}

export interface BaraAction {}

export interface BaraApp {
  (): void;
}

enum BUILTIN_EVENT {
  ON_BOOTSTRAP,
  ON_INITIALIZED,
  ON_TIME_ESLAPSED,
  ON_EXIT,
}

function Bara() {
  const streams: Array<BaraStream<number|string|boolean|null|object>> = [];
  const triggers: BaraTrigger[] = [];

  let currentStreamIndex = 0;

  /**
   * Bootstrap Bara application.
   */
  function bootstrap(app: BaraApp) {
    app();
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
        ): [Stream<StreamAction<T>>, string[]] => {
      // Construct a stream object for consumer
      const stream$: Stream<StreamAction<T>> = xs.create({
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
      streams[currentStreamIndex] = streams[currentStreamIndex] || stream$;

      // Get list of event type will be emitted from BaraStream
      const eventTypes = streams[currentStreamIndex].eventTypes;
      // Map the stream event with app source stream!
      currentStreamIndex++;
      return [stream$, eventTypes];
    },
    useTrigger: () => {},

    // Below hooks must be used in a Bara Trigger
    useEvent: (eventType: string, config?: any) => {},
    useCondition: () => {},
    useAction: () => {},
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
