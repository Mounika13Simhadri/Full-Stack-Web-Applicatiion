const express=require('express');
const drouter=express();
const{dinsert,dlist,dupdate,ddelete}=require('../controllers/department_controller')


drouter.post('/insertvalue',dinsert);
drouter.get('/list',dlist);
drouter.get('/list/:id',dlist);
drouter.put('/update/:id',dupdate);
drouter.delete('/delete/:id',ddelete);
module.exports=drouter;