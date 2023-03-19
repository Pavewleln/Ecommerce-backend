import express from 'express'
import { create, getAll } from '../controllers/comment.controller.js'

const router = express.Router()

router.get('/:id', getAll)
router.post('/', create)
// It will be realized in the soon future :D
/* 
router.patch('/update', haveAccess, update)
router.delete('/remove', haveAccess, remove) */


export default router