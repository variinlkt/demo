import path from 'path';
import fs from 'fs-extra';

let uploadPath = path.join(__dirname, '../../upload/');

export default async function mergeFile(args, ctx) {
  let { chunksPath, idx } = args;
  const data = ctx.request.body;
  const { token, type, fileName, chunksCnt } = data;
  if (type === 'merge'){ // 收到合并请求
    try{
      const suffix = fileName.match(/\.\w+/)[0];
      const nPath = getNewPath(uploadPath, suffix);
      mergeHandler({uploadPath: nPath, token, suffix, chunksPath, idx, chunksCnt})
      return ctx.body = {
        success: true,
        location: `${nPath}/${token}${suffix}`,
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
      readStream.unpipe(writeStream);
      if(idx < chunksCnt - 1){
        chunksPath.delete(idx);
        return merge({writeStream, chunksPath, idx: ++idx, chunksCnt}, resolve, reject);
      } else {
        resolve();
      }
    });
  });
  readStream.on('error', (err) => {
    readStream.unpipe(writeStream);
    reject(err);
  });
}

async function mergeHandler({uploadPath, token, suffix, chunksPath, idx, chunksCnt}) {
  try{
    await fs.ensureDir(uploadPath);
    const writeFilePath = `${uploadPath}/${token}${suffix}`;
    const writeStream = fs.createWriteStream(writeFilePath);
    await new Promise((resolve, reject) => merge({writeStream, chunksPath, idx, chunksCnt}, resolve, reject));
  } catch(e) {
    console.error(e)
    return ctx.body = {
      success: false,
      type,
      token
    }
  }
}

function getNewPath(path, suffix) {
  switch(suffix){
    case '.jpg':
    case '.png':
      return `${path}image`;
    case '.mp3':
      return `${path}file`;
    case '.lrc':
      return `${path}lyric`;
  }
}
export {
  uploadPath,
  mergeHandler,
  getNewPath
}