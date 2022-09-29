import "./App.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [students, setStudents] = useState([]);

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
        <tbody>
          {students.map((student) => {
            console.log(student.GPA);
            return (
              <tr key={student.Student_ID}>
                <td>{student.Student_ID}</td>
                <td>{student.FirstName}</td>
                <td>{student.LastName}</td>
                <td>{student.SSN}</td>
                <td>{student.Major}</td>
                <td>{student.DOB}</td>
                <td>{student.Address}</td>
                <td>{student.GPA}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <h3>Add a Student</h3>
      <form class="form-inline">
        <div class="form-group">
          <label class="sr-only" for="exampleInputEmail3">
            First name
          </label>
          <input
            type="email"
            class="form-control"
            id="fname"
            placeholder="First name"
            required="required"
          />
        </div>
        <div class="form-group">
          <label class="sr-only" for="exampleInputPassword3">
            Last name
          </label>
          <input
            type="text"
            class="form-control"
            id="lname"
            placeholder="Last name"
          />
        </div>
        <div class="form-group">
          <label class="sr-only" for="exampleInputPassword3">
            SSN
          </label>
          <input
            type="text"
            class="form-control"
            id="ssn"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <label class="sr-only" for="exampleInputPassword3">
            Major
          </label>
          <input
            type="text"
            class="form-control"
            id="major"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <label class="sr-only" for="exampleInputPassword3">
            Date of birth
          </label>
          <input
            type="date"
            class="form-control"
            id="dob"
            placeholder="Date of birth"
          />
        </div>
        <div class="form-group">
          <label class="sr-only" for="exampleInputPassword3">
            Address
          </label>
          <input
            type="text"
            class="form-control"
            id="addr"
            placeholder="Address"
          />
        </div>
        <div class="form-group">
          <label class="sr-only" for="exampleInputPassword3">
            GPA
          </label>
          <input type="float" class="form-control" id="gpa" placeholder="GPA" />
        </div>
        <button
          type="submit"
          class="btn btn-default"
          style={{
            borderColor: "black",
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
