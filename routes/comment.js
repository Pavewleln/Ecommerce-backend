import express from 'express'
import { create, getAll, remove } from '../controllers/comment.controller.js'
import isAuth from '../utils/isAuth.js'

const router = express.Router()

router.get('/:id', isAuth, getAll)
router.post('/', isAuth, create)
router.delete('/:id',isAuth, remove)
// It will be realized in the soon future :D
/* 
router.patch('/update', haveAccess, update)
*/

export default router