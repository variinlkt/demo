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
    timeout: 60000,
    onUploadProgress
  });
  const { data } = ret;
  return data;
}

export async function mergeFile(params: FormData | IUploadFileDataParams) {
  const ret = await axios.post('http://localhost:3008/api/merge', params, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const { data } = ret;
  return data;
}