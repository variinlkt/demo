import { List } from '../config/db';
export default async function addSong(ctx) {
  try{
    const { id, song, singer, image, file, lyric } = ctx.request.body;
    const r = await List.create({
      id,
      song,
      singer,
      image,
      file,
      lyric,
    });
    return ctx.body = {
      success: true
    }
  } catch (err){
    console.log(err);
    return ctx.body = {
      success: false
    }
  }

}