import { IUploadFileDataParams, IProgressEventParams } from '../interfaces/request';
import axios from 'axios';

// 文件上传
export async function uploadFile(
  params: FormData | IUploadFileDataParams,
  onUploadProgress = (params:IProgressEventParams
) => {}){
  const ret = await axios.post('http://localhost:3008/api/upload', params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 3000,
    onUploadProgress
  });
  const { data } = ret;
  return data;
}