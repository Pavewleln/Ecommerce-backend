import express from 'express'
import {getAll, newProduct} from './../controllers/product.controller.js'
import haveAccess from './../middlewares/HaveAccess.js'

const router = express.Router()

router.get('/', getAll)
router.post('/new', isAuth, newProduct)
// It will be realized in the soon future :D
/* 
router.patch('/edit', haveAccess, edit)
router.delete('/remove', haveAccess, remove) */


export default router