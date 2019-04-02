import xs from 'xstream';
import {BaraStream, BaraStreamConfig, BaraStreamPayload, SetupCallbacks} from '../model/stream';

function validateStreamConfig<T>(config: BaraStreamConfig<T>) {
  if (!('setup' in config)) {
    throw new Error(`Please specify "setup" function in a Bara Stream`);
  }
}

export function useStreamHook<T>(
  config: BaraStreamConfig<T>,
): BaraStream<T> {
  validateStreamConfig(config);
  const _$ = xs.create<BaraStreamPayload<T>>({
    start: listener => {
      const emit = (eventType: string, payload: T) => {
        listener.next({eventType, payload});
      };
      config.setup({emit});
    },
    stop: () => {},
  });
  return {_$, config};
}
