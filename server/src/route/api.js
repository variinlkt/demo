import Router from 'koa-router'
import resource from '../model/resource'

const router = Router();

router.post('/upload',resource.uploadImage)

export default router;