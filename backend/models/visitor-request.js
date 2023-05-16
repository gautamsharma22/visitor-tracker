const mongoose = require("mongoose");
const VisitorRequestSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
    },
    reason: {
      type: String,
    },
    visitortype: {
      type: String,
    },
    checkInTime: {
      type: Date,
    },
    checkOutTime: {
      type: Date,
      default:null,
    },
    phoneNumber: {
      type: String,
      maxlength: 10,
      required:true,
    },
    aadharNumber: {
      type: String,
      maxlength: 12,
      required:true,
    },
  }
);
const VisitorRequest = mongoose.model("VisitorRequest", VisitorRequestSchema);
module.exports = VisitorRequest;
