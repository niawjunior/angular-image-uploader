const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const app = express();

const Upload = require("./upload.models");
const uri = `mongodb+srv://mongo:mongo@cluster0-dntln.mongodb.net/test?retryWrites=true`;
const client = new MongoClient(uri, {
  useNewUrlParser: true
});

var collection;
client.connect(err => {
  if (!err) {
    console.log('Connected...');
    collection = client.db("Database").collection("Upload");
  } else {
    console.log(err);
    console.log('error connection...');
    client.close();
  }
});

app.use(cors({
  origin: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../src/assets');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

app.post('/upload', upload.array('uploads[]'), (req, res) => {
  var upload = [];
  req.files.forEach(files => {
    upload.push(new Upload({
      _id: new mongoose.Types.ObjectId(),
      fieldname: files.fieldname,
      originalname: files.originalname,
      encoding: files.encoding,
      mimetype: files.mimetype,
      destination: files.destination,
      filename: files.filename,
      path: files.path,
      size: files.size
    }))
  })

  collection.insertMany(upload, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({
      status: 200,
      message: 'success'
    }));
  })
})


app.get('/images', (req, res) => {
  collection.find({}).toArray((error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(JSON.stringify({
      status: 200,
      message: 'success',
      data: result
    }));
  });
})

app.listen(3000, () => {
  console.log('listening...')
})
