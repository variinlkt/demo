import { messageData } from '../interfaces/webWorker';
import { decode, encode } from "../lib";

type WorkerInstance = {
  on(type: string, handler: Function): void;
};
export function register(): WorkerInstance {
    const mapping: Record<string, Function> = {};
    const post = (message: messageData): void => {
      const data = encode(message);
      // @ts-ignore
      self.postMessage(data.buffer, [data.buffer]);
    };
    self.onmessage = async (e: MessageEvent) => {
      let { data } = e;
      if (!data) return;
      if (Object.prototype.toString.call(data) === '[object ArrayBuffer]'){
        data = decode(data);
      }
  
      const { type, id, msg } = data;
      const result = (await mapping[type](msg)) || "done";
      post({ id, type, msg: result });
    };
  
    return {
      on: (type, handler) => {
        mapping[type] = handler;
      }
    };
  }
