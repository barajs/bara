import {join} from 'path';
import {tmpdir} from 'os';
import streamFs from '../stream-fs';

let tempdir: string = tmpdir();
describe('index', () => {
  beforeAll(() => {
    tempdir= join(tempdir, `org.barajs.stream.fs.${Math.random() * 100}`);
  })
  it('stream file system at provided path', () => {
    const mockEventHandler = jest.fn();
    console.log(tempdir);
    const stream = streamFs(tempdir, mockEventHandler);
    console.log(stream);
    // stream.init();
  })
})
