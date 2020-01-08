import { register } from "./lib";
import { params, data } from "../interfaces/webWorker";

const worker = register();
worker.on('UPLOAD', dataHandler);

async function dataHandler(data: data){
  console.log(data)
  return 'ok'
  // todo: concurrency control
  // todo: fetch
  // try{ 
  //   const { chunks, token } = data
  //   // todo: request error
  //   await Promise.all(chunks.map((chunk: Blob, i: number) => req({chunk, i, token})))
  //   await req({
  //       type: 'merge',
  //       token,
  //       chunksCnt: chunks.length
  //     });
  //   return {
  //     status: 'ok'
  //   }
  // } catch {// todo: error code
  //   return {
  //     status: 'error',
  //     errCode: -1
  //   }
  // }
  
}

function req(params: params){
  const { chunk, i, type, fileName, token, chunksCnt } = params;
  let fd = new FormData();
  if (type) {
    fd.append('type', type);
    fd.append('fileName', fileName || token);
    fd.append('chunkCnt', chunksCnt + '')
  } else {
    fd.append('data', chunk!);
    fd.append('index', i + '');
  }
  fd.append('token', token);
  return fetch('', {// todo: server
    method: 'POST',
    body: fd
  });
}