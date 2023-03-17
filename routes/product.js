import express from 'express'
import isAuth from '../utils/isAuth.js'
import {getAll, create, getById} from './../controllers/product.controller.js'

const router = express.Router()

router.get('/', getAll)
router.post('/create', create)
router.get('/:id', getById)
// It will be realized in the soon future :D
/* 
router.patch('/update', haveAccess, update)
router.delete('/remove', haveAccess, remove) */


export default router