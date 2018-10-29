import de from '@bara/core';
// import {createStream, StreamEventPayload} from '@bara/core'
// import * as chokidar from 'chokidar'
//
console.log(de);

/**
 * Create filesystem stream at specific directory path.
 * @param {string} dir Which directory to observe the events.
 * @return {BaraStream}
 */
/* export const streamFs = (dir: string, onEvent?: (payload: any) => void) => */
  // createStream({
    // id: 'org.barajs.stream.fs',
    // name: 'Stream File System',
    // methods: {
      // init: (emit, {dir}) => {
        // const watcher = chokidar.watch(dir);
        // watcher.on('add', (path: string) => emit('add', path));
      // },
      // onEvent: (payload: StreamEventPayload) => {
        // console.log(payload);
        // if (onEvent !== undefined) {
          // onEvent(payload);
        // }
      // },
    // },
    // config: {dir},
  /* }); */

export const streamFs2 = (dir: string, onEvent?: (payload: any) => void) => {
  console.log('Meo', dir, onEvent);
};

export default streamFs2;
