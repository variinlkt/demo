export interface IProgressEventParams {
  loaded: number,
  total: number
}
export type IUploadFileDataParams = {
  chunk?: Blob;
  i?: number;
  type?: string;
  fileName?: string;
  token: string;
  chunksCnt?: number;
}

export interface IUploadFileParams {
  data: FormData;
  onUploadProgress?: Function;
}