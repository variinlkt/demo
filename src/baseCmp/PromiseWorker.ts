import { encode, decode } from "../lib";
import { messageData } from '../interfaces/webWorker';

export default class PromiseWorker {
  private msgHandlerBank: Map<string, { 
    [id: string]: Function
  }> = new Map();
  private id: string = Math.random() + '';
  private worker: Worker;

  constructor(worker: Worker) {
    this.worker = worker;

    this.worker.onmessage = (e: MessageEvent) => {
      const { data } = e;
      if (!data) return;
      const msgData: messageData = decode(data);
      const { id, msg, type }  = msgData,
          ret = this.msgHandlerBank.get(type),
          handler = ret![id];
      console.log(msgData,ret,handler)
      if (handler && typeof handler === 'function') {
        if (type !== 'PROGRESS' || (type === 'PROGRESS' && msg && msg.progress === 1)){
          handler(msg);
          this.msgHandlerBank.delete(id);
        } else { // progress
          handler(msg);
        }
      } else {
        throw new Error('handler is undefined!')
      }
    }
  }

  emit<T, U>(type: string, msg: T, cb?: Function): Promise<U> {
    return new Promise(resolve => {
      this.msgHandlerBank.set(type, {
        [this.id]: (x: U) => resolve(x)
      });
      if(type === 'UPLOAD'){
        this.msgHandlerBank.set('PROGRESS', {
          [this.id]: (x: U) => cb && cb(x)
        });
      }
      this.worker.postMessage({ 
        type,
        id: this.id,
        msg 
      });
    });
  }
  
  terminate() {
    this.worker.terminate();
  }
}