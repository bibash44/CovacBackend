const app = (module.exports = require("express")());
const vaccinationController = require("../CONTROLLER/vaccination");

app.post("/register", vaccinationController.registerVaccinationCenter);
app.get("/getall", vaccinationController.getAllVaccinationCenter);
app.post(
  "/loggedinuser",
  vaccinationController.getLoggedInUserVaccinationCenter
);
