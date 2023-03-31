import express from 'express'
import isAuth from '../utils/isAuth.js'
import {getAll, create, getById, myProducts, remove, update} from '../controllers/product_controller.js'

const router = express.Router()

router.get('/', getAll)
router.post('/', isAuth, create)
router.get('/:id', getById)
router.get('/all/my', isAuth, myProducts)
router.delete('/:id', isAuth, remove)
router.patch('/:id', isAuth, update)

export default router