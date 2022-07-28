const app = (module.exports = require("express")());
const bookingController = require("../CONTROLLER/booking");

app.post("/register", bookingController.registerBooking);
app.post("/loggedinuser", bookingController.getLoggedInUserBooking);
