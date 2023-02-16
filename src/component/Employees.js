import React, { useState,useEffect} from "react";
import axios from "axios";
const intialDetails = {
  name: "",
  mobile: "",
  address: "",
};
function Employees({
  setOpen,
  open,
  did,
  setMessage,
  message,
 counter,setEmp,resetTimer
}) {
  const[employees,setEmployees]=useState()
  const [esubmit, setEsubmit] = useState(true);
  const [eid, setEid] = useState();
  const [details, setDetails] = useState(intialDetails);
  
  useEffect(() => {
    getEmployees();
  });
  const getEmployees= async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employee/list");

      setEmployees(response.data);
    } catch (err) {}
  };
  const submitEinfo = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,

    });
    setEmp(e.target.value)
    resetTimer();
 
   
  };
 
  const employeeData = async(e) => {
    e.preventDefault();
     
    if (
      details.name === "" ||
      details.mobile === "" ||
      details.address === ""
    )
    {
      setMessage("employee");
      setEsubmit(true);
    }
      setOpen("table");
      setMessage("");
      setDetails(intialDetails);
    try{
      await axios.post(`http://localhost:5000/api/employee/insertvalue`,{Employee_Name:details.name.toUpperCase(),Address:details.address.toUpperCase(),Phone:details.mobile.toUpperCase(),deptid:did,});
     }catch(err){
       console.log(err);
     
     }
     getEmployees();
     console.log(employees);

  };
  const employeeEdit = (v) => {
    setDetails(details);
    resetTimer();
    setEsubmit(false);
    setOpen("employee");
    setEid(v.Id);
  };
 
  const employeeUpdate = () => {
    axios.put(`http://localhost:5000/api/employee/update/${eid}`,{Employee_Name:details.name.toUpperCase(),Address:details.address.toUpperCase(),Phone:details.mobile.toUpperCase(),Department_Id:did,});
    setEsubmit(true);
    setOpen("table");
    getEmployees();
    
  };

  const employeeDelete = (eeid) => {
    axios.delete(`http://localhost:5000/api/employee/delete/${eeid}`);
    getEmployees();
  };

  return (
    <>
      {/* Employee Details */}
  
      {open === "employee" && (
        <form className="emp-form">
           <button id="eclose" onClick={()=>setOpen("")}>X</button>
          <div className="timer1">
            <label className="timer">{counter}</label>
          </div>
           
          <label className="elbl">Name</label>
          <input autoFocus
            type="text"
            name="name" 
            className="etxt"
            placeholder="ex:John"
            onChange={(event) => submitEinfo(event)}
            value={details?.name}
          /> 
          <br />
          <label className="elbl">Mobile</label>
          <input
            type="text"
            name="mobile"
            className="etxt"
            placeholder="ex:1234567890"
            onChange={(event) => submitEinfo(event)}
            value={details?.mobile}
          />
          <br />
          <label className="elbl">Address</label>
          <input
            type="text"
            className="etxt"
            name="address"
            placeholder="ex:California"
            onChange={(event) => submitEinfo(event)}
            value={details?.address}
          />
          <br />
          <button
            className="ebtn"
            type="submit"
            onClick={esubmit ? employeeData : employeeUpdate}
          >
            {esubmit ? "Submit" : "Update"}
          </button>
          {message === "employee" && <h5>Please Enter the value!</h5>}
        </form>
      )}

      {open === "table" && (
        <div className="emp-data">
          <table className="etable">
            <thead>
              <tr>
                <th>EmpId</th>
                <th>DeptId</th>
                <th>EmpName</th>
                <th>MobNo</th>
                <th>Address</th>
                <th>
                  <button onClick={() =>{setOpen("employee"); resetTimer();} }>Add</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {employees &&employees
                .filter((d) => d.Department_Id===did)
                .map((p) =>
                      <tr key={p.Id}>
                      <td>{p.Id}</td>
                      <td>{p.Department_Id}</td>
                      <td>{p.Employee_Name}</td>
                      <td>{p.Phone}</td>
                      <td>{p.Address}</td>
                      <td>
                        <button onClick={() => employeeEdit(p)}>Edit</button>
                        <button onClick={() => {
                          if (window.confirm("Do you want to delete ?")) {
                            employeeDelete(p.Id)
                          }}}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )}
      
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Employees;
