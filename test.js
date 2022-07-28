const expect = require('chai').expect;
const request = require('supertest');
const app= require('./ROUTES/index')
const conn = require('./DATABASE/dbcon');
const axios= require('axios');

describe('USER APIS', ()=>{

   it('ADD A NEW USER', (done)=>{

    axios.post('http://localhost:45467/user', {
        fullname: "Covac",
        email: "seeker@gmail.com",
        phonenumber: "+44452302156",
        dob: "1996/12/12",
        password: "password",
        usertype: "Seeker", 
    }).then((res)=>{
        expect(res.data).to.have.property('success')
        expect(res.data).to.have.property('msg')
        expect(res.data.success).to.equal(true)
        expect(res.data.msg).to.equal('New User registered successfully')


        expect(res.data.msg).to.have.lengthOf(32)
      


        done()

    }).catch((err)=>{
        done(err)
    })
   
   })
})