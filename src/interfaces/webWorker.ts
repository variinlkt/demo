export interface messageData {
  id: string;
  type: string;
  msg?: any;

}
export interface params {
  chunk?: Blob;
  i?: number;
  type?: string;
  fileName?: string;
  token: string;
  chunksCnt?: number;
}

export interface data {
  chunks: Blob[];
  token: string;
  fileName: string;
}