import express from 'express'
import {getAll} from './../controllers/product.controller.js'
import haveAccess from './../middlewares/HaveAccess.js'

const router = express.Router()

router.get('/', getAll)

// It will be realized in the soon future :D
/* router.post('/new', haveAccess, newProduct)
router.patch('/edit', haveAccess, edit)
router.delete('/remove', haveAccess, remove) */


export default router