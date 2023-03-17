import express from 'express'
import { registration, login, refresh, logout } from './../controllers/user.controller.js'
import { registerValidator, loginValidator } from '../validations.js'
import handleErrors from './../utils/handleErrors.js'
import isAuth from '../utils/isAuth.js'
const router = express.Router()



router.post('/refresh', refresh)
router.post('/register', registerValidator, handleErrors, registration)
router.get('/logout', isAuth, logout)
router.post('/login', loginValidator, handleErrors, login)


export default router