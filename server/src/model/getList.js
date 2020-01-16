import sequelize from '../config/db';
const List = sequelize.import('../schema/list');

export default async function getList(ctx) {
  try{
    const list = await List.findAll();
    
    return ctx.body = {
      success: true,
      data: list
    }
  } catch (err){
    console.log(err);
    return ctx.body = {
      success: false
    }
  }

}