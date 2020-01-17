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

export interface IFormSubmitParams {
  id: string;
  song: string;
  singer: string;
  img: string;
  file: string;
  lrc: string;
}

export interface IDeleteSongParams {
  id: string;
  img: string;
  lrc: string;
  file: string;
}