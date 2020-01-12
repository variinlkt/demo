import Router from 'koa-router'
import resource from '../model/resource'
import koaBody from 'koa-body';

const router = new Router();
let chunksPath = [];
let idx = 0;

router.post('/upload', koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 500*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}), resource.uploadImage.bind(this, {chunksPath, idx}))

export default router;