import fs from 'fs';
import path from 'path';

const imagePath = path.join(__dirname, '../../upload/images');

const uploadImage = async (args, ctx) => {
  let { chunksPath, idx } = args;
  console.log(args)
  const file = ctx.request.files && ctx.request.files.data;
  const data = ctx.request.body;
  console.log(file)
  console.log(data)
  const { index, token, type, chunkCnt } = data;
  if (type === 'merge'){
    try{
      if (idx < chunkCnt){
        function mergeFile() {
          const writeStream = fs.createWriteStream(`${imagePath}/${token}-${idx}`);
          const readStream = fs.createReadStream(chunksPath[idx]);
          readStream.pipe(writeStream, { end: false });
          readStream.on("end", () => {
            fs.unlink(chunksPath[idx], err => {
              if (err) {
                  throw err;
              }
              if (idx+1 < chunkCnt){
                idx += 1;
                mergeFile();
              }
            });
          });
        }
        mergeFile();
      } else {
        chunksPath = [];
        idx = 0;
      }
      return ctx.body = {
        success: true,
        type,
        token
      }
    }catch {
      return ctx.body = {
        success: false,
        type,
        token
      }
    }
  } else {
    try{
      const path = file.path,
      nextPath = `${path.slice(0, path.lastIndexOf('/') + 1)}${token}-${index}`;
      fs.renameSync(path, nextPath);
      chunksPath.push(nextPath);
      return ctx.body = {
        success: true,
        index,
        token
      }
    }catch {
      return ctx.body = {
        success: false,
        index,
        token
      }
    }
  }

};

export default {
  uploadImage
}