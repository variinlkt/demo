import sequelize from '../config/db';
const List = sequelize.import('../schema/list');

export default async function addSong(ctx) {
  try{
    const { id, song, singer, img, file, lrc } = ctx.request.body;

    await List.create({
      id,
      song,
      singer,
      img,
      file,
      lrc,
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