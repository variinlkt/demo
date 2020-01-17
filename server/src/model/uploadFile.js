import fs from 'fs';
import { mergeHandler, uploadPath, getNewPath } from './mergeFile';

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
    const fileArr = chunksPath.get(token)
    if(!fileArr){
      let arr = new Array(chunksCnt);
      arr[+index] = nextPath;
      chunksPath.set(token, arr);
    } else {
      fileArr[+index] = nextPath;
      chunksPath.set(token, fileArr);
    }
    console.log(+chunksCnt, chunksPath)

    if (+chunksCnt > 1) {
      return ctx.body = {
        success: true,
        index,
        token
      }
    } else { // 只有一个chunk
      const suffix = fileName.match(/\.\w+/)[0];
      const nPath = getNewPath(uploadPath, suffix);
      mergeHandler({uploadPath: nPath, token, suffix, chunksPath, idx, chunksCnt});
      return ctx.body = {
        success: true,
        type: 'merge',
        token,
        location: `${nPath}/${token}${suffix}`
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