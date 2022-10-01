import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentList from "./componets/StudentList";
import "./App.css";
import Form from "./componets/Form";
import APIService from "./componets/APIService";

function App() {
  const [students, setStudents] = useState([]);
  const [editedStudent, setEditedStudent] = useState();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get", {
      method: "GET",
      headers: {
        "Content-Type": "applications/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setStudents(response)) // save our response (which is students) inside the setArticles hook
      .catch((error) => console.log(error));
  }, []);

  const editStudent = (student) => {
    setEditedStudent(student);
  };
  // TODO: Handle error gracefully -%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-
  const submitStudent = (student) => {
    console.log(JSON.stringify(student).split(":"));
    if (JSON.stringify(student).split(":")[0].includes("ERROR")) {
      console.log(JSON.stringify(student));
      console.log("ERROR");
    } else {
      setStudents(student);
    }
  };

  return (
    <div className="app-container">
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>SSN</th>
            <th>Major</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>GPA</th>
          </tr>
        </thead>
        {/* pass students list and edisStudent function to child */}
        <StudentList students={students} editStudent={editStudent} />
      </table>
      {editedStudent ? (
        <Form student={editedStudent} submitStudent={submitStudent} />
      ) : null}
      {/*If editedStudent is not null, we render the form */}
      <br />
      <h3>Add a Student</h3>
      <form className="form-inline">
        <div className="form-group">
          <label className="sr-only" htmlFor="exampleInputName3">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="fname"
            name="firstName"
            placeholder="First name"
            required="required"
          />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="exampleInputName3">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="lname"
            name="lastName"
            placeholder="Last name"
            required="required"
          />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="exampleInputSSN3">
            SSN
          </label>
          <input
            type="text"
            className="form-control"
            id="ssn"
            name="ssn"
            placeholder="SSN"
          />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="exampleInputMajord3">
            Major
          </label>
          <input
            type="text"
            className="form-control"
            id="major"
            name="major"
            placeholder="Major"
            required="required"
          />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="exampleInputDOB3">
            Date of birth
          </label>
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            placeholder="Date of birth"
          />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="exampleInputAddress3">
            Address
          </label>
          <input
            type="address"
            className="form-control"
            id="addr"
            name="address"
            placeholder="Address"
          />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="exampleInputGPA3">
            GPA
          </label>
          <input
            type="float"
            className="form-control"
            id="gpa"
            name="gpa"
            placeholder="GPA"
          />
        </div>
        <button
          type="submit"
          className="btn btn-default"
          style={{
            width: "70px",
            height: "38px",
            marginTop: "30px",
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default App;
