const express = require("express")
const Department=require('./department_route')
const Employee=require('./employee_route')


const service = express()

service.use('/department',Department);
service.use('/employee',Employee);



module.exports = service;