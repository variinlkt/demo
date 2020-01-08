import { encode, decode } from "../lib";
import { messageData } from '../interfaces/webWorker';

export default class PromiseWorker {
  private msgHandlerBank: Map<string, { 
    callback: Function; 
    type: string | number; 
  }> = new Map();
  private id: string = Math.random() + '';
  private worker: Worker;
  constructor(worker: Worker) {
    this.worker = worker;
    this.worker.onmessage = (e: MessageEvent) => {
      const { data } = e;
      if (!data) return;
      const msgData: messageData = decode(data);
      const { id, msg }  = msgData,
          ret = this.msgHandlerBank.get(id),
          handler = ret!.callback;
      if (handler && typeof handler === 'function') {
        handler(msg);
        this.msgHandlerBank.delete(id);
      }
    }
  }
  emit<T, U>(type: string, msg: T): Promise<U> {
    return new Promise(resolve => {
      const encodedData = encode({
        id: this.id,
        type,
        msg
      });
      this.msgHandlerBank.set(this.id, {
        type,
        callback: (x: U) => resolve(x)
      });
      this.worker.postMessage(encodedData.buffer, [encodedData.buffer]);
    });
  }
  terminate() {
    this.worker.terminate();
  }
}