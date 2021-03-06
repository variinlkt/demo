import { messageData } from '../interfaces/webWorker';
import { decode, encode } from "../lib";

type WorkerInstance = {
  on(type: string, handler: Function): void;
};

export const post = (message: messageData): void => {
  const data = encode(message);
  // @ts-ignore
  self.postMessage(data.buffer, [data.buffer]);
};

export function register(): WorkerInstance {
  const mapping: Map<string, Function> = new Map();
  self.onmessage = async (e: MessageEvent) => {
    let { data } = e;
    if (!data) return;
    if (Object.prototype.toString.call(data) === '[object ArrayBuffer]'){
      data = decode(data);
    }

    const { type, id, msg } = data;
    const result = (await mapping.get(type)!({...msg, type, id}));
    post({ id, type, msg: result });
  };

  return {
    on: (type, handler) => {
      mapping.set(type, handler);
    }
  };
}

export function concurrency(jobList: any[], limit = 4, handler: Function){
  const fn = (arr: any[]) => {
    const job = arr.shift();
    return handler(job).then((res: any) => {
      if(arr.length) 
        return fn(arr);
      else 
        return res;
    });
  };
  let copy = [...jobList];
  let currentList = [];
  while(limit-- && copy.length){
    currentList.push(fn(copy));
  }
  // 设置超时时间
  return Promise.race([Promise.all([...currentList]), timeoutFn(60000)]);
}

function timeoutFn(timeout: number){
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      reject({
        msg: '60s timeout',
        success: false
      });
    }, timeout)
  )
}
