const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const AppointmentSchema = new Schema({
  appointDateAndTime: {
    type: String,
    required: true,
  },
  vaccination:{
    type: Schema.Types.ObjectId, 
    ref:'Vaccination'
  } ,
  user:{
    type: Schema.Types.ObjectId,
     ref:'User'
  },
  booked:{
    type: Boolean,
    default: false
  }
  
});

const appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = appointment;
