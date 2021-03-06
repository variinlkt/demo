import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import json from 'koa-json';
import statics from 'koa-static';
import path from 'path';

import api from './src/route/api';
import cors from './src/utils/cors';

const app = new Koa();
const router = new Router();

app.use(cors);
app.use(json());
app.use(logger());

app.use(statics(path.join(__dirname, './upload/')));

router.use('/api', api.routes())

app.use(router.routes())


app.on('error',(err, ctx) => {
    console.log('server error', err)
})


app.listen(3008,()=>{
  console.log('服务启动成功,端口：3008,地址：http://localhost:3008')
})