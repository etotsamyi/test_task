var express = require('express')
var app = express()
var cors = require('cors');
var fs = require('fs');
var getFileType = require('file-type')
var multer = require('multer')

app.listen(8800, () => {
    console.log('Example app listening on port 8800!')
})

app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null, 'files/')
    },
    filename: (req, file, cb) => {
        const { originalname } = file
        cb(null, originalname)
    }
})
const upload = multer({ storage: storage })

app.post(
    '/upload',
    upload.single('file'),
    (req, res) => {
        res.send("200");
    }
)
