import path from 'path';
import fs from 'fs-extra';

export const uploadPath = path.join(__dirname, '../../upload/');

export default async function mergeFile(args, ctx) {
  let { chunksPath, idx } = args;
  const data = ctx.request.body;
  const { token, type, fileName, chunksCnt } = data;
  if (type === 'merge'){ // 收到合并请求
    try{
      mergeHandler({uploadPath, token, fileName, chunksPath, idx, chunksCnt})
      return ctx.body = {
        success: true,
        type,
        token
      };
    } catch(e) {
      console.error(e)
      return ctx.body = {
        success: false,
        type,
        token
      }
    }
  }
}

function merge({writeStream, chunksPath, idx, chunksCnt}, resolve, reject){
  const readStream = fs.createReadStream(chunksPath.get(idx));
  readStream.pipe(writeStream, { end: false }); // 写入数据
  readStream.on("end", () => {
    fs.unlink(chunksPath.get(idx), err => {
      if (err) {
        reject(err)
      }
      if(idx < chunksCnt - 1){
        chunksPath.delete(idx);
        return merge({writeStream, chunksPath, idx: ++idx, chunksCnt}, resolve, reject);
      } else {
        idx = 0;
        resolve();
      }
    });
  });
  readStream.on('error', (err) => {
    reject(err)
  });
}

export async function mergeHandler({uploadPath, token, fileName, chunksPath, idx, chunksCnt}) {
  await fs.ensureDir(uploadPath);
  const writeFilePath = `${uploadPath}/${token}${fileName.match(/\.\w+/)[0]}`;
  const writeStream = fs.createWriteStream(writeFilePath);
  await new Promise((resolve, reject) => merge({writeStream, chunksPath, idx, chunksCnt}, resolve, reject));
}