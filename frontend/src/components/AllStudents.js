import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    function getStudents() {
      axios.get("http://localhost:8070/student/")
        .then((res) => {
          setStudents(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getStudents();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">All Students</h1>
      <ul className="list-group">
        {students.map((student) => (
          <li key={student.id} className="list-group-item">
            <p className="mb-1">Name: {student.name}</p>
            <p className="mb-1">Age: {student.age}</p>
            <p className="mb-1">Gender: {student.gender}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}
