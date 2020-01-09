/* eslint-disable */
import Worker from 'worker-loader!../webWorker/index.worker';
import PromiseWorker from "./PromiseWorker";
export default class FileLoader{
  private file: File;
  private start: number = 0;
  private end: number = 0;
  private chunks: Blob[] = [];
  private chunkSize: number;
  private token: string = Math.random() + '';
  constructor(file: File, chunkSize = 1*1024*1024){
    this.file = file;
    this.chunkSize = chunkSize;

    if(file){
      this.splitChunks()
      console.log(this.chunks)
    }
  }
  splitChunks(){
    if (this.file.size <= this.chunkSize) {
      this.chunks.push(this.file.slice(0));
    } else {
      let start = 0,
          end = 0;
      while(true) {
        end += this.chunkSize;
        const blob = this.file.slice(start, end);
        start += this.chunkSize;

        if (!blob.size) {
          break;
        }

        this.chunks.push(blob);
      }
    }
  }

  upload(){
    const w = new Worker();
    const worker = new PromiseWorker(w);
    // todo
    console.log(this.chunks)
    worker.emit('UPLOAD', {
      chunks: this.chunks,
      token: this.token
    })
    .then(res => console.log(res));
  }

  download(){

  }
}