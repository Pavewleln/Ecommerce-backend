import express from 'express'
import { create, getAll, remove } from '../controllers/comment.controller.js'

const router = express.Router()

router.get('/:id', getAll)
router.post('/', create)
router.delete('/:id', remove)
// It will be realized in the soon future :D
/* 
router.patch('/update', haveAccess, update)
*/

export default router