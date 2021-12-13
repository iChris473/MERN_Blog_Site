const express = require("express");
const cors = require('cors');
require("dotenv").config();
require('./models/db')
const multer = require("multer");
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/images", express.static(path.join(__dirname, "/images")))

const port = process.env.PORT || 2000;

const router = require('./routers/blogRoutes');
app.use('/', router);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
});

const upload = multer({storage})
app.use('/upload', upload.single("file"), (req, res) => {
    res.status(200).json('File has been uploaded')
})


app.listen(port, () => console.log('Backend Started'));