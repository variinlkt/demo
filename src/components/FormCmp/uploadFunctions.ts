/* eslint-disable */
import FileLoader from '../../baseCmp/File';
import Worker from 'worker-loader!../../webWorker/index.worker';
import PromiseWorker from "../../baseCmp/PromiseWorker";

const w = new Worker();
const worker = new PromiseWorker(w);

function uploadImage({
  // onProgress,
  // onError,
  // onSuccess,
  // data,
  // filename,
  file,
  // action,
  // headers
} : any) {
  if(!file)
    return;
  const fl = new FileLoader(file);
  fl.upload(worker);
}

function uploadFiles() {

}

function uploadLyric() {

}

export {
  uploadImage,
  uploadFiles,
  uploadLyric
}