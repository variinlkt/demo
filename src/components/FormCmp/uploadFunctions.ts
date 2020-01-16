/* eslint-disable */
import FileLoader from '../../baseCmp/File';
import Worker from 'worker-loader!../../webWorker/index.worker';
import PromiseWorker from "../../baseCmp/PromiseWorker";


export function upload({
  onProgress,
  onError,
  onSuccess,
  // data,
  // filename,
  file,
  // action,
  // headers
} : any) {
  if(!file)
    return;
  const w = new Worker();
  const worker = new PromiseWorker(w);
  const fl = new FileLoader(file);
  fl.upload(worker, (percent: number) => onProgress({ percent }))
  .then(({success}) => {
    if(success){
      worker.terminate();
      onSuccess();
    } else {
      onError();
    }
  });
}
