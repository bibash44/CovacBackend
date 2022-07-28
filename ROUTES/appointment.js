const app = (module.exports = require("express")());
const appointmentController = require("../CONTROLLER/appointment");

app.post("/register", appointmentController.registerAppointment);
app.post("/loggedinuser", appointmentController.getLoggedInUserAppointment);
app.post(
  "/getAppointmentByCenter",
  appointmentController.getAppointmentByCenter
);

app.delete('/removeappointment', appointmentController.removeAppointment)
