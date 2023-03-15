import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { registerValidator, loginValidator } from './validations.js'
import isAuth from './utils/isAuth.js'
import { registration, login, refresh, logout } from './controllers/user.controller.js'
import multer from 'multer'
import handleErrors from './utils/handleErrors.js'
import cookieParser from 'cookie-parser'
const app = express()
mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => { console.log("DB ok") })
    .catch((err) => { console.log("DB error", err) })

app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage })

app.post('/auth/refresh', refresh)
app.post('/auth/login', loginValidator, handleErrors, login)
app.post('/auth/register', registerValidator, handleErrors, registration)
app.get('/auth/logout', isAuth, logout)
app.post('/upload', isAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.listen(process.env.PORT || 4000, (err) => {
    if (err) console.log(err)
    console.log("Server ok")
})