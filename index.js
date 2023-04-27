import express  from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {handleValidatorErrors, checkAuth} from './utils/index.js'
import { registerValidator, loginValidator, postCreateValidation } from "./validation.js";
import {PostController, UserController} from './controllers/index.js'

mongoose.connect('mongodb+srv://ihor:123456n@jopaclaster.3hnmgju.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
  console.log("DB OK")
})
.catch((err) => {
  console.log('DB error', err)
}) 


const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'upload')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/upload', express.static('upload'))

app.get('/', (req, res) => {
  res.json("Шо ты делаешь пидор?")
})

app.post('/auth/login', loginValidator, handleValidatorErrors, UserController.login)
app.post('/auth/register', registerValidator, handleValidatorErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/upload/${req.file.originalname}` 
  })
})
app.get('/tags', PostController.getLastTags)

app.get('/posts', PostController.getAll)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidatorErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidatorErrors, PostController.update)

app.listen(4444, (err) => {
    
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
})


