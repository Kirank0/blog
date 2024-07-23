import express from "express"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cookieParser from "cookie-parser"
import multer from "multer"

const app=express() //create our app

app.use(express.json()) // we should use this function otherwise we wont be able send data to our db
app.use(cookieParser())

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now()+file.originalname )
    }
  })

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file=req.file;
    res.status(200).json(file.filename)
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)


app.listen(8800,()=>{ // i am going to listen this port number
    console.log("connected") //when we connect to our db it is logged
})