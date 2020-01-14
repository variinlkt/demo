/* eslint-disable */
import Worker from 'worker-loader!../webWorker/index.worker';
import PromiseWorker from "./PromiseWorker";
import { ISparkHashResp } from '../interfaces/response';
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
      console.log(this.chunks);
    }
  }

  async getFileSpark(worker: PromiseWorker) {
    const hashObj: ISparkHashResp = await worker.emit('SPARK', this.chunks);
    const { success, hash } = hashObj;
    if(success){
      this.token = hash;
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

  async upload(){
    try{
      const w = new Worker();
      const worker = new PromiseWorker(w);
      // 计算文件hash
      await this.getFileSpark(worker);
      const uploadRet = worker.emit('UPLOAD', {
        chunks: this.chunks,
        token: this.token,
        fileName: this.file.name
      })
      console.log(uploadRet)
    } catch(err){
      console.error(err)
    }
  }

  download(){

  }
}