const express=require('express');
const uuid=require('uuid');
const db=require('../models/dbconnection');

const{insertDepartment,fetchDepartment,updateDepartment,deleteDepartment}=require('../services/data')


async function dinsert(req, res) {
    try {
        res.json(await insertDepartment(req));
    } catch (err) {
        console.error(err.message);
    }
  }

//Get  Values
const dlist=(req,res)=>{
  let sql='SELECT * FROM department ';
  db.query(sql,(err,results)=>{
    if(err)throw err;
    res.json(results)
  })
}



async function dupdate(req,res){
  try {
    res.json(await updateDepartment(req));
  } 
  catch (err) {
    console.error(err.message);
  }
}
  
  
async function ddelete(req,res){
    try {
      res.json(await deleteDepartment(req));
    } catch (err) {
      console.error(err.message);
  }
}
  

module.exports={dinsert,dlist,dupdate,ddelete};

