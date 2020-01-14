import fs from 'fs';

export default async function uploadFile(args, ctx){
  let { chunksPath } = args;
  // console.log(args)
  const file = ctx.request.files && ctx.request.files.data;
  const data = ctx.request.body;
  // console.log(file)
  // console.log(data)
  const { index, token } = data;
  try{
    const path = file.path,
    nextPath = `${path.slice(0, path.lastIndexOf('/') + 1)}${token}-${index}`;
    fs.renameSync(path, nextPath);
    // 保存目录
    chunksPath.set(+index, nextPath);
    return ctx.body = {
      success: true,
      index,
      token
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