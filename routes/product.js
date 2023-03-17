import express from 'express'
import isAuth from '../utils/isAuth.js'
import {getAll, createProduct} from './../controllers/product.controller.js'

const router = express.Router()

router.get('/', getAll)
router.post('/create', isAuth, createProduct)
// It will be realized in the soon future :D
/* 
router.patch('/update', haveAccess, update)
router.delete('/remove', haveAccess, remove) */


export default router