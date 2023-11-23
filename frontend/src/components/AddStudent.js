import React, { useState } from "react";
import axios from "axios";

export default function AddStudent() {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    function sendData(e){
        e.preventDefault();
        
        const newStudent = {
            name,
            age,
            gender
        }

        axios.post("http://localhost:8070/student/add", newStudent)
        .then(() => {
            alert("Student added");
            setName("");
            setAge("");
            setGender("");
        })
        .catch((err) => {
            alert(err);
        });

    }

  return (
    <div className = "container">
      <form onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput">Student name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            onChange={(e)=>{
                setName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput2">Student age</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter age"
            onChange={(e)=>{
                setAge(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput3">Student gender</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter age"
            onChange={(e)=>{
                setGender(e.target.value);
            }}
          />
        </div>

        <button type = "submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
