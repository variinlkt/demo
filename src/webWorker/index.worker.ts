import { register } from "./lib";
import { uploadHandler, getFileSpark } from './model';

const worker = register();
worker.on('UPLOAD', uploadHandler);
worker.on('SPARK', getFileSpark);
// worker.on('WEBSOCKET', connect);

function connect(){
  
}
