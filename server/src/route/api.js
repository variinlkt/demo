import Router from 'koa-router'
import { 
  uploadFile, 
  getUploadedChunks,
  mergeFile,
  handleSignin,
  handleSignup,
  getList,
  addSong
 } from '../model'
import koaBody from 'koa-body';

const router = new Router();
let chunksPath = new Map();
let idx = 0;

// 上传文件
router.post('/upload', koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 500*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}), uploadFile.bind(this, {chunksPath, idx}));

// 合并文件
router.post('/merge', koaBody(), mergeFile.bind(this, {chunksPath, idx}));

// todo：获取已上传文件分块
router.get('/uploadedChunks', getUploadedChunks);

// todo: sign in
router.post('/signin', koaBody(), handleSignin);

// todo: sign up
router.post('/signup', koaBody(), handleSignup);

// 获取列表
router.get('/list', getList);

// 添加
router.post('/addSong', koaBody(), addSong);

export default router;