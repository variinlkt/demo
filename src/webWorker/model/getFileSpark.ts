import SparkMD5 from 'spark-md5';

interface IFileList {
  fileList: Blob[]
}

export default function getFileSpark({ fileList }: IFileList){ 
  return new Promise((resolve) => {
    const reader = new FileReader();
    let count = 0;
    const spark = new SparkMD5.ArrayBuffer();
    const loadNext = (cnt: number) => {
      reader.readAsArrayBuffer(fileList[cnt]);
      reader.onload = (e: any) => {
        cnt++;
        spark.append(e.target.result);
  
        if(cnt === fileList.length){
          return resolve({
            success: true,
            hash: spark.end()
          });
        } else {
          return loadNext(cnt);
        }
      }
    };
    return loadNext(count);
  })
}