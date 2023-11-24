import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateStudent() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8070/student/get/${id}`)
      .then((res) => {
        const student = res.data.user; // Assuming the user details are nested in the response
        setName(student.name);
        setAge(student.age);
        setGender(student.gender);
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  }, [id]);
  

  function sendData(e) {
    e.preventDefault();

    const updatedStudent = {
      name,
      age,
      gender,
    };

    console.log("Updating student with ID:", id);

    axios.put(`http://localhost:8070/student/update/${id}`, updatedStudent)
      .then(() => {
        alert("Student updated");
      })
      .catch((err) => {
        console.error(err);
        alert(`Error: ${err.message}`);
      });
  }

  return (
    <div className="container">
      <form onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="name">Student name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Student age</label>
          <input
            type="text"
            className="form-control"
            id="age"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Student gender</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            placeholder="Enter gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}
