const app = module.exports= require('express')()
const userController= require('../CONTROLLER/user')

app.post('/login', userController.loginUser)
app.post('/', userController.registerUser)