import sequelize from '../config/db';
import path from 'path';
import fs from 'fs-extra';
import { uploadPath } from './mergeFile';

const List = sequelize.import('../schema/list');

export default async function deleteSong(ctx) {
  try{
    
    const { img, file, lrc, id } = ctx.request.body;
    const arr = [img, file, lrc];

    await List.destroy({
      where: {
        id
      }
    });
    for(let path of arr){
      await deleteFile(path);
    }
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

function deleteFile(path){
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if(err){
        reject(err);
        return;
      }
      resolve();
    })
  })
}