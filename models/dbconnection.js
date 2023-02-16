const mysql=require('mysql');

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"department_employee"
});

//connect to MySQL
db.connect((err)=>{
    if(err) throw err;
    console.log("MySQL Connected")
});



module.exports=db;