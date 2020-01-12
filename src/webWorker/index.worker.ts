import { register } from "./lib";
import { params, data } from "../interfaces/webWorker";

const worker = register();
worker.on('UPLOAD', dataHandler);
// worker.on('WEBSOCKET', connect);

function connect(){
  
}

async function dataHandler(data: data){
  // todo: concurrency control
  // todo: fetch
  try{ 
    const { chunks, token, fileName } = data
    // todo: request error
    console.log(data)
    await Promise.all(chunks.map((chunk: Blob, i: number) => req({chunk, i, token, fileName})))
    const ret = await (await req({
      type: 'merge',
      token,
      chunksCnt: chunks.length
    })).json();
    return ret
  } catch (err) {// todo: error code
    console.log(err)
    return {
      status: 'error',
      errCode: -1
    }
  }
  
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
  console.log('-------')

  //@ts-ignore
  for(let [item,key] of fd.entries()){
    console.log(item,key)
  }
  console.log('-------')
  return fetch('http://localhost:3008/api/upload', {// todo: server
    method: 'POST',
    body: fd
  });
}