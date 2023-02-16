const express=require('express');
const cors =require("cors");
const PORT=5000;
const router=require('./routes')



const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api',router);

app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})