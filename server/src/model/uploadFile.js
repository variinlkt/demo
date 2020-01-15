import fs from 'fs';
import { mergeHandler, uploadPath } from './mergeFile';

export default async function uploadFile(args, ctx){
  let { chunksPath, idx } = args;
  // console.log(args)
  const file = ctx.request.files && ctx.request.files.data;
  const data = ctx.request.body;
  // console.log(file)
  // console.log(data)
  const { index, token, chunksCnt, fileName } = data;
  try{
    const path = file.path,
    nextPath = `${path.slice(0, path.lastIndexOf('/') + 1)}${token}-${index}`;
    fs.renameSync(path, nextPath);
    // 保存目录
    chunksPath.set(+index, nextPath);
    console.log(+chunksCnt)
    if (+chunksCnt > 1) {
      return ctx.body = {
        success: true,
        index,
        token
      }
    } else { // 只有一个chunk
      mergeHandler({uploadPath, token, fileName, chunksPath, idx, chunksCnt});
      return ctx.body = {
        success: true,
        type: 'merge',
        token
      };
    }
  }catch(e) {
    console.error(e)
    return ctx.body = {
      success: false,
      index,
      token
    }
  }

};