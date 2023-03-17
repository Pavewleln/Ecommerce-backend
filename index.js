import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import isAuth from './utils/isAuth.js'
import multer from 'multer'
import cookieParser from 'cookie-parser'

// Routes import
import AuthRoute from './routes/auth.js'
import ProductRoute from './routes/product.js'
import UserRoute from './routes/user.js'


const app = express()
const port = process.env.PORT || 4000

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

app.use('/auth', AuthRoute)
app.use('/users', UserRoute)
app.use('/products', ProductRoute)


app.post('/upload', isAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log("\nDB ok")
        app.listen(port, (err) => {
            if (err) console.log(err)
            console.log(`\nServer has been started!\nURL: http://localhost:${port}`)
        })
    })
    .catch((err) => { console.log("DB error", err) })
