import express from 'express'
import { registration, login, refresh, logout, edit } from './../controllers/user.controller.js'
import { registerValidator, loginValidator } from '../validations.js'
import handleErrors from './../utils/handleErrors.js'
import isAuth from '../utils/isAuth.js'
const router = express.Router()



router.post('/login', loginValidator, handleErrors, login)
router.post('/register', registerValidator, handleErrors, registration)
router.patch('/edit', isAuth, edit)
router.get('/logout', isAuth, logout)
router.post('/refresh', refresh)


export default router