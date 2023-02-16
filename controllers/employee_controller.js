const express=require('express');
const uuid=require('uuid');
const db=require('../models/dbconnection');
const{insertEmployee,fetchEmployee,updateEmployee,deleteEmployee}=require('../services/data')

async function einsert(req,res){
  try {
    res.json(await insertEmployee(req));
} catch (err) {
    console.error(err.message);
}
}
//Get  Values
const elist=(req,res)=>{
  let sql='SELECT * FROM employee';
  db.query(sql,(err,results)=>{
    if(err)throw err;
    res.json(results)
  })
}

async function eupdate(req,res){
  try {
    res.json(await updateEmployee(req));
} catch (err) {
    console.error(err.message);
}
}

async function edelete(req,res){
  try {
    res.json(await deleteEmployee(req));
} catch (err) {
    console.error(err.message);
}
}
module.exports={einsert,elist,eupdate,edelete};

