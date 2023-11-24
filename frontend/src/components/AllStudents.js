import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function AllStudents() {
  const [students, setStudents] = useState([]);

  const getStudents = () => {
    axios.get("http://localhost:8070/student/")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");

    if (confirmDelete) {
      axios.delete(`http://localhost:8070/student/delete/${id}`)
        .then(() => {
          alert("Student deleted");
          // Refresh the list of students after deletion
          getStudents();
        })
        .catch((err) => {
          console.error(err);
          alert(`Error: ${err.message}`);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">All Students</h1>
      <ul className="list-group">
        {students && students.length > 0 ? (
          students.map((student) => (
            <li key={student._id} className="list-group-item">
              <p className="mb-1">Name: {student.name}</p>
              <p className="mb-1">Age: {student.age}</p>
              <p className="mb-1">Gender: {student.gender}</p>

              <Link to={`/update/${student._id}`} className="btn btn-primary">
                Update
              </Link>

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(student._id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </ul>
    </div>
  );
}
