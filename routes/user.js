import express from 'express'
import { edit } from '../controllers/user.controller'
import isAuth from '../utils/isAuth'

const router = express.Router()


router.patch('/:userId?/edit', isAuth, edit)


export default router