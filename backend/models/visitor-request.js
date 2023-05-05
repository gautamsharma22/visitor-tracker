const mongoose = require("mongoose");
const VisitorRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    reason: {
      type: String,
    },
    visitortype: {
      type: String,
    },
    visitingDate: {
      type: Date,
      default: Date.now(),
    },
    reqAccepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const VisitorRequest = mongoose.model("VisitorRequest", VisitorRequestSchema);
module.exports = VisitorRequest;
