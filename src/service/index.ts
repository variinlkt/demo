import { IUploadFileDataParams, IProgressEventParams, IFormSubmitParams } from '../interfaces/request';
import axios from 'axios';

// 文件上传
export function uploadFile(
  params: FormData | IUploadFileDataParams,
  onUploadProgress = (params: IProgressEventParams
) => {}) {
  return fetchFn('upload', params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 60000,
    onUploadProgress
  });
}
// 合并文件
export function mergeFile(params: FormData | IUploadFileDataParams) {
  return fetchFn('merge', params);
}
// 添加
export function addSong(params: IFormSubmitParams) {
  return fetchFn('addSong', params);
}
// 获取列表
export function getList() {
  return fetchFn('list', null, {
    method: 'get'
  });
}

// 公用函数
async function fetchFn(url: string, params?: any, config?: any) {
  const method = config && config.method || 'post';
  let ret;
  if(method == 'post')
    ret = await axios.post('http://localhost:3008/api/' + url, params, config);
  else
    ret = await axios.get('http://localhost:3008/api/' + url, config);
  const { data } = ret;
  return data;
}