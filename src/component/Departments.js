import React, { useEffect,useState} from "react";
import Employees from './Employees.js'
import axios from "axios";

function Departments() {
  const[dresult,setResult]=useState()
  const [emp,setEmp]=useState()
  const [open, setOpen] = useState("");
  const [message, setMessage] = useState("");
  const [dsubmit, setSubmit] = useState(true);
  const [dName,setDname]=useState("");
  const[did,setDid]=useState()
  const[t,setT]=useState()
  const [counter, setCounter] = useState(30);
    useEffect(()=>{
      if(counter>0){
          setT(setTimeout(() => setCounter(counter - 1), 1000));
      }
      else {
        setOpen("")
      }
    },[emp,dName,counter])
  const resetTimer=()=>{
    clearTimeout(t);
    setCounter(30);
  };
  useEffect(() => {
    getDepartments();
  });
  const getDepartments= async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/department/list");
      setResult(response.data);
    } catch (err) {}
  };
   
  const submitInfo = (event) => {
    setDname(event.target.value);
    resetTimer();
  };   

  const handleDepartment =async (event) => {

    event.preventDefault();
    try{
      await axios.post('http://localhost:5000/api/department/insertvalue',{Department_Name:dName.toUpperCase()});
      }catch(err){
        console.log(err);
      }
      getDepartments();
    setDname("")
  };

  const departmentEdit = (dep) => {

    setDname(dName)
    resetTimer();
    setDid(dep.Id);
    setSubmit(false);
    setOpen("department"); 
  };

  const departmentUpdate=()=>{
    axios.put(`http://localhost:5000/api/department/update/${did}`,{Department_Name:dName.toUpperCase()});
    getDepartments();
  }
  
  const departmentDelete = (dep) => {
    axios.delete(`http://localhost:5000/api/department/delete/${dep.Id}`);
    axios.delete(`http://localhost:5000/api/employee/delete/${dep.Id}`);
    getDepartments();
  };

  const handleEmployee=(d)=>{
    resetTimer();
    setDid(d.Id);
    setOpen("table");  
  }
  
  return (
    <>
       {/* Department Details */}
      <div className="first-div">
        <label>
          <h1>Department List</h1>
        </label>
        <button className="btadd" onClick={()=>{resetTimer();setOpen("department")}}>ADD</button>
        <div className="div-3">
          <ol >
            {dresult&&dresult.map((d) => (
                <li key={d.Id}>
                  <button className="dlink" onClick={()=>handleEmployee(d)}>{d.Department_Name}</button>
                  <button onClick={() => departmentEdit(d)}>Edit</button>
                  <button onClick={()  => {
                    if (window.confirm("Do you want to delete ?")) {
                      departmentDelete(d)
                    }}}>Delete</button>
                </li>
               
            ))}
          </ol>
          
        </div>
      </div>

      <div className="second-div">
      
      {(open==="department") &&<form  className="form1">
        <div className="timer2">
        <button id="close" onClick={()=>setOpen("")}>X</button>
          <label className="timer">{counter}</label>
        </div>
        <label>Enter the Department to be added</label>
       
        <input autoFocus type="text" className="txt1" placeholder="e.x:IT" onChange={(event)=>submitInfo(event)} value={dName}/>
        {(message==="department") && <h5>Please Enter the value!</h5>}
        <button className="btsbmt"onClick={dsubmit ? handleDepartment : departmentUpdate}>{dsubmit ? "Submit" : "Update"}</button>
      </form>}
    </div>
    <Employees resetTimer={resetTimer}setEmp={setEmp} counter={counter} setOpen={setOpen} open={open}  did={did} setMessage={setMessage} message={message}/>
  </>
  );
}

export default Departments;
