import fs from 'fs';
import path from 'path';

const imagePath = path.join(__dirname, '../../upload/images');

const uploadImage = async (args, ctx) => {
  let { chunksPath, idx } = args;
  console.log(args)
  // return ctx.body = {
  //   status: 200,
  //   ok: true
  // }

  // ctx.request.files: get the uploaded files
  const file = ctx.request.files.data;
  // ctx.request.body: get request body
  const data = ctx.request.body;
  console.log(data)
  const { index, token, type, chunkCnt } = data;
  if (type === 'merge'){
    // const reader = fs.createReadStream(file.path);
    // const resolvePath = `${imagePath}\\${fileName}-${token}`;
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
      status: 200,
      ok: true
    };
    // if(!fs.existsSync(imagePath)) {
    //   await fs.mkdir(imagePath, (err) => {
    //     if(err) {
    //       return {
    //         code: -1,
    //         data: 'error'
    //       };
    //     };
    //     // reader.pipe(upStream);
    //     // chunksPath.push(resolvePath);
    //     // return {
    //     //   code: 200,
    //     //   data: 'success'
    //     // };
    //   });
    // }

  } else {
    const path = file.path,
          nextPath = `${path.slice(0, path.lastIndexOf('/') + 1)}${token}-${index}`;
    fs.renameSync(path, nextPath);
    chunksPath.push(nextPath);
  }

};

export default {
  uploadImage
}