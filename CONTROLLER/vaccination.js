const vaccinationModel = require("../MODELS/vaccination");
var ObjectId = require('mongodb').ObjectId; 

module.exports = {
  async registerVaccinationCenter(req, res) {
    const {
      name,
      postCode,
      streetAddress,
      description,
      latitude,
      longitude,
      user,
    } = req.body;
    console.log(req.body);

    vaccinationModel.findOne({ name: name }).then((result) => {
      if (result == null) {
        const newVaccinationCenter = new vaccinationModel({
          name: name,
          postCode: postCode,
          streetAddress: streetAddress,
          description: description,
          latitude: latitude,
          longitude: longitude,
          user: user,
        });

        newVaccinationCenter
          .save()
          .then(() => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify(
                {
                  success: true,
                  msg: "Vaccination Center registered successfully",
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
                  msg: "Failed to register Vaccination Center",
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
              msg: "Vaccination Center Already Exist",
            },
            null,
            3
          )
        );
      }
    });
  },

  async getAllVaccinationCenter(req, res) {
    vaccinationModel
      .find()
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
  

  async getSingleVaccinationCenter(request,response){
    var {name}=request.body;
      vaccinationModel.find({name:name}).then((result)=>{
        console.log(result);
      }).catch(error=>{
        console.log(error);
      });
  },

  async getLoggedInUserVaccinationCenter(req, res) {
    var {user}= req.body;
    vaccinationModel
      .find({user: new ObjectId(user)})
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
};
