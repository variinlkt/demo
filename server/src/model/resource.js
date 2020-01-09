import fs from 'fs';
import path from 'path';

const imagePath = path.join(__dirname, '../../upload/images');

const uploadImage = async (ctx) => {
  console.log('ok')
  //todo: why 404
  return 'ok'
  const file = ctx.request.files.file;
  const reader = fs.createReadStream(file.path);
  const upStream = fs.createWriteStream(`${imagePath}\\${file.name}`);
  if(!fs.existsSync(imagePath)) {
    fs.mkdir(imagePath, (err) => {
      if(err) throw err;
      reader.pipe(upStream);
      return {
        code: 0,
        data: 'success'
      };
    });
  } else {
    reader.pipe(upStream);
    return {
      code: 0,
      data: 'success'
    };
  }

};

export default {
  uploadImage
}