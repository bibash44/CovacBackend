const bookingModel = require("../MODELS/booking");
const vaccinationModel = require("../MODELS/vaccination");
const appointModel = require("../MODELS/appointment");
var ObjectId = require("mongodb").ObjectId;
module.exports = {
  async registerBooking(req, res) {
    const { bookingDateAndTime,appointment, vaccination, user } = req.body;

    bookingModel
      .findOne({ appointment: appointment })
      .then((result) => {
        if (result == null) {
          const newBooking = new bookingModel(req.body);

          newBooking
            .save()
            .then((result) => {
              if(result!=null){
                appointModel.updateOne({_id: new ObjectId(appointment)}, {booked: true}).then((updatedStatus)=>{
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(
                    JSON.stringify(
                      {
                        success: true,
                        msg: "Booking made successfully",
                      },
                      null,
                      3
                    )
                  );
                }) .catch((e) => {
                  console.log(e);
                  res.end(
                    JSON.stringify(
                      {
                        success: false,
                        msg: "Error in updating your appointment Booking ",
                      },
                      null,
                      3
                    )
                  );
                });
              }
            
            
            })
            .catch((e) => {
              console.log(e);
              res.end(
                JSON.stringify(
                  {
                    success: false,
                    msg: "Failed to register Booking ",
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
                msg: "Booking  Already Exist",
              },
              null,
              3
            )
          );
        }
      });
  },

  async getLoggedInUserBooking(req, res) {
    var { user } = req.body;
    bookingModel
      .find({ user: new ObjectId(user) })
      .populate('vaccination')
      .populate('appointment')
      .then((result) => {
    
       
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(
            {
              success: true,
              data: result
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

  async getBookingByCenter(req, res) {
    var { vaccination } = req.body;
    await bookingModel
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
    //   booking: bookingDetails,
    //   vaccinationCenter: vaccinationCenterDetails,
    // };
  },
};
