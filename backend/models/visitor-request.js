const mongoose = require("mongoose");
const VisitorRequestSchema = new mongoose.Schema(
  {
    name: {
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
    visitingDate: {
      type: Date,
      default: Date.now(),
    },
    reqStatus: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);
const VisitorRequest = mongoose.model("VisitorRequest", VisitorRequestSchema);
module.exports = VisitorRequest;
