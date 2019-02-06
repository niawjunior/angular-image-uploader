const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fieldname: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  },
  encoding: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Upload', uploadSchema);
