export interface messageData {
  id: string;
  type: string;
  msg?: any;

}
export interface data {
  chunks: Blob[];
  token: string;
  fileName: string;
}