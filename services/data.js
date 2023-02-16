const express=require('express')
const db=require('../models/dbconnection');

async function insertDepartment(req){
    const name=req.body.Department_Name;

    const rows = await db.query(`INSERT INTO department  (Department_Name) VALUES('${name}')`);
  
    return {
        rows 
    }
  }

  async function fetchDepartment(req){
    let rows;
    
    if(req.params.id){
         rows = await db.query(`SELECT * FROM department where Id=${req.params.id}`);
   }
   else{
     rows = await db.query('SELECT * FROM department');
   }
  
    return {
        rows 
    }
  }
  async function updateDepartment(req){
    Name=req.body.Department_Name;
    const rows = await db.query(`UPDATE department SET Department_Name='${Name}' where Id=${req.params.id}`);
  
    return {
        rows 
    }
  }
  async function deleteDepartment(req){
   
    const rows = await db.query(`DELETE FROM department where id=${req.params.id}`);
  
    return {
        rows 
    }
  }

  async function insertEmployee(req){
    const did=req.body.deptid;
    const name=req.body.Employee_Name;
    const address=req.body.Address;
    const phone=req.body.Phone;


    const rows = await db.query(`INSERT INTO employee (Employee_name,Address,Phone,Department_Id) VALUES('${name}','${address}',${phone},${did})`);
  
    return {
        rows 
    }
  }

  async function fetchEmployee(req){
 let rows;
    if(req.params.id){
        rows = await db.query(`SELECT * FROM employee where Id=${req.params.id}`);
   }
   else{
     rows = await db.query('SELECT * FROM employee');
   }
  
    return {
        rows 
    }
  }
  async function updateEmployee(req){
    Name=req.body.Employee_Name;
    address=req.body.Address;
    phone=req.body.Phone;
    did=req.body.Department_Id;

    const rows = await db.query(`UPDATE employee SET Employee_Name='${Name}',Address='${address}',Phone='${phone}',Department_Id=${did} where Id=${req.params.id}`);
  
    return {
        rows 
    }
  }
  async function deleteEmployee(req){

    const rows = await db.query(`DELETE FROM employee where Id='${req.params.id}' OR Department_Id=${req.params.id}`);
  
    return {
        rows 
    }
  }
  module.exports={insertDepartment,fetchDepartment,updateDepartment,deleteDepartment,insertEmployee,fetchEmployee,updateEmployee,deleteEmployee};