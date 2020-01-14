import { concurrency } from "../lib";
import { IUploadFileDataParams, IProgressEventParams } from "../../interfaces/request";
import { data } from "../../interfaces/webWorker";
import { uploadFile } from "../../service";


export default async function uploadHandler(data: data){
  try{ 
    const { chunks, token, fileName } = data
    console.log(data)
    const chunksArr = chunks.map((chunk: Blob, i: number) => {
      return {
        chunk, 
        i, 
        token, 
        fileName
      };
    })
    console.log(chunksArr)
    // 请求并发控制
    const r = await concurrency(chunksArr, 4, (item: IUploadFileDataParams) => 
      uploadFile(
        formatFormData(item),
        (progressEvent: IProgressEventParams
      ) => {
        console.log(`${item.i}:${Math.round( (progressEvent.loaded * 100) / progressEvent.total )}`)
      },)
    );
    // 文件块都成功上传， 通知服务端进行合并
    if (Array.isArray(r)) {
      const ret = await uploadFile(formatFormData({
        type: 'merge',
        token,
        chunksCnt: chunks.length,
        fileName
      }));
      console.log(ret)
      return ret
    }
  } catch (err) {// todo: error code
    console.error(err)
    return {
      status: 'error',
      errCode: -1
    }
  }
  
}

function formatFormData(params: IUploadFileDataParams){
  let fd = new FormData();
  const { chunk, i, type, fileName, token, chunksCnt } = params;

  if (type === 'merge') {
    fd.append('type', type);
    fd.append('fileName', fileName || token);
    fd.append('chunkCnt', chunksCnt + '')
  } else {
    fd.append('data', chunk!);
    fd.append('index', i + '');
  }
  fd.append('token', token);
  return fd;
}