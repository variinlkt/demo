import sequelize from '../config/db';
const List = sequelize.import('../schema/list');

export default async function deleteSong(ctx) {
  try{
    await List.destroy({
      where: {
        id: ctx.params.id
      }
    })
    return ctx.body = {
      success: true
    }
  } catch (e){
    console.error(e);
    return ctx.body = {
      success: false
    }
  }
}