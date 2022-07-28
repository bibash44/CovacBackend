const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const BookingSchema = new Schema({
  bookingDateAndTime: {
    type: String,
    required: true,
  },
  appointment:{
    type: Schema.Types.ObjectId, 
    ref:'Appointment'
  },
  vaccination:{
    type: Schema.Types.ObjectId, 
    ref:'Vaccination'
  } ,
  user:{
    type: Schema.Types.ObjectId,
     ref:'User'
  },

  
});

const booking = mongoose.model("Booking", BookingSchema);
module.exports = booking;
