const mongoose = require("mongoose");
const VisitorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  visitortype: {
    type: String,
    required: true,
    trim: true,
  },
  uid: {
    type: Number,
    min: 0,
    max: 10,
  },
  myDate: {
    type: Date,
    default: Date.now,
  },
});

const MyModel = mongoose.model("Visitor", VisitorSchema);
module.exports = MyModel;