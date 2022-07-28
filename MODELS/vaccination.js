const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const VaccationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  postCode: {
    type: String,
    required: true,
  },

  streetAddress: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const vaccination = mongoose.model("Vaccination", VaccationSchema);
module.exports = vaccination;
