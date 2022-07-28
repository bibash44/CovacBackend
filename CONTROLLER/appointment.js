const appointmentModel = require("../MODELS/appointment");
const vaccinationModel = require("../MODELS/vaccination");
// const appointmentModel = require("../MODELS/appointment");
var ObjectId = require("mongodb").ObjectId;
module.exports = {
  async registerAppointment(req, res) {
    const { appointDateAndTime, vaccination, user } = req.body;

    appointmentModel
      .findOne({ appointDateAndTime: appointDateAndTime })
      .then((result) => {
        if (result == null) {
          const newAppointment = new appointmentModel({
            appointDateAndTime: appointDateAndTime,
            vaccination: vaccination,
            user: user,
          });

          newAppointment
            .save()
            .then(() => {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify(
                  {
                    success: true,
                    msg: "Appointment registered successfully",
                  },
                  null,
                  3
                )
              );
            })
            .catch((e) => {
              console.log(e);
              res.end(
                JSON.stringify(
                  {
                    success: false,
                    msg: "Failed to register Appointment ",
                  },
                  null,
                  3
                )
              );
            });
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify(
              {
                success: false,
                msg: "Appointment  Already Exist",
              },
              null,
              3
            )
          );
        }
      });
  },

  async getLoggedInUserAppointment(req, res) {
    var { user } = req.body;
    appointmentModel
      .find({ user: new ObjectId(user) })
      .populate("vaccination")
      .then((result) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(
            {
              success: true,
              data: result,
            },
            null,
            3
          )
        );
      })
      .catch((e) => {
        console.log(e);
        res.end(
          JSON.stringify(
            {
              success: false,
              msg: e,
            },
            null,
            3
          )
        );
      });
  },

  async getAppointmentByCenter(req, res) {
    var { vaccination } = req.body;
    await appointmentModel
      .find({ vaccination: new ObjectId(vaccination) })
      .then((result) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify(
            {
              success: true,
              data: result,
            },
            null,
            3
          )
        );
        // return result;
      })
      .catch((e) => {
        console.log(e);
        res.end(
          JSON.stringify(
            {
              success: false,
              msg: e,
            },
            null,
            3
          )
        );
      });

    // var vaccinationCenterDetails = await vaccinationModel
    //   .find({ _id: new ObjectId(vaccination) })
    //   .then((result) => {
    //     return result;
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     res.end(
    //       JSON.stringify(
    //         {
    //           success: false,
    //           msg: e,
    //         },
    //         null,
    //         3
    //       )
    //     );
    //   });
    // var data = {
    //   appointment: appointmentDetails,
    //   vaccinationCenter: vaccinationCenterDetails,
    // };
  },

  removeAppointment(req, res){
    var { appointment } = req.body;
    appointmentModel
      .deleteOne({ _id: new ObjectId(appointment) })
      .then((result) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(
            {
              success: true,
              msg: 'Appointment removed successfully',
            },
            null,
            3
          )
        );
      })
      .catch((e) => {
        console.log(e);
        res.end(
          JSON.stringify(
            {
              success: false,
              msg: e,
            },
            null,
            3
          )
        );
      });
  }
};
