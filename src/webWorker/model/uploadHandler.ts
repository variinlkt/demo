import { concurrency, post } from "../lib";
import { IUploadFileDataParams, IProgressEventParams } from "../../interfaces/request";
import { data } from "../../interfaces/webWorker";
import { uploadFile, mergeFile } from "../../service";


export default async function uploadHandler(data: data){
  try{ 
    const { chunks, token, fileName, type, id } = data
    console.log(data)
    const chunksArr = chunks.map((chunk: Blob, i: number) => {
      return {
        chunk, 
        i, 
        token, 
        fileName,
        chunksCnt: chunks.length,
      };
    })
    console.log(chunksArr)
    // 请求并发控制
    const r = await concurrency(chunksArr, 4, (item: IUploadFileDataParams) => 
      uploadFile(
        formatFormData(item),
        (progressEvent: IProgressEventParams) => {
          console.log(`${item.i}:${Math.round( (progressEvent.loaded * 100) / progressEvent.total )}`)
          post({ 
            id, 
            type: 'PROGRESS', 
            msg: {
              percent: Math.round( (progressEvent.loaded * 100) / progressEvent.total )
            } 
          })
        }
      )
    );

    // 文件块都成功上传， 通知服务端进行合并
    // 对于没有分块的文件没必要再发次请求， 服务器端应直接写入
    if (Array.isArray(r) && chunks.length > 1) {
      const ret = await mergeFile(formatFormData({
        type: 'merge',
        token,
        chunksCnt: chunks.length,
        fileName
      }));
      console.log(ret)
      return ret
    } else {
      return Array.isArray(r) && r[0] || r;
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
  const { chunk, i, type, token, chunksCnt, fileName } = params;

  if (type === 'merge') {
    return params;
  } else {
    fd.append('data', chunk!);
    fd.append('index', i + '');
    fd.append('token', token);
    fd.append('chunksCnt', chunksCnt + '');
    (chunksCnt === 1) && fd.append('fileName', fileName + '')
    return fd;
  }
}