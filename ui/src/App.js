import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentList from "./componets/StudentList";
import "./App.css";
import UpdateForm from "./componets/UpdateForm";
import APIService from "./componets/APIService";
import InsertForm from "./componets/InsertForm";
import SearchById from "./componets/SearchById";
import SearchByAny from "./componets/SearchByAny";
import DBFormatToggle from "./componets/DBFormatToggle";
import SearchByDateRange from "./componets/SearchByDateRange";
import SearchByDateMonthRange from "./componets/SearchByDateMonthRange";
import SearchByGPA from "./componets/SearchByGPA";

function App() {
  const [students, setStudents] = useState([]);
  const [editedStudent, setEditedStudent] = useState();
  const [error, setError] = useState(null);
  const [getResponseById, setGetResponseById] = useState();
  const [getResponseByAny, setGetResponseByAny] = useState();
  const [getResponseByDateRange, setGetResponseByDateRange] = useState();
  const [getResponseByDateMonthRange, setGetResponseByDateMonthRange] =
    useState();
  const [getResponseByGPA, setGetResponseByGPA] = useState();

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
  // notifies App.js that an update happened so we can update the UI

  const submitStudent = (student) => {
    setStudents(student);
  };

  // notifies App.js that an insert happened so we can update the UI
  const insertStudent = (student) => {
    if (JSON.stringify(student).split(":")[0].includes("ERROR")) {
      console.log(JSON.stringify(student));
      console.log("ERROR");
    } else {
      setStudents(student);
    }
  };

  const deleteStudent = (student) => {
    if (JSON.stringify(student).split(":")[0].includes("ERROR")) {
      console.log(JSON.stringify(student));
      console.log("ERROR");
    } else {
      setStudents(student);
    }
  };

  const showError = (error) => {
    setError(error);
  };

  const showStudentById = (student) => {
    setGetResponseById(student);
  };

  const showStudentByAny = (student) => {
    setGetResponseByAny(student);
  };

  const showStudentByDateRange = (student) => {
    setGetResponseByDateRange(student);
  };
  const showStudentByDateMonthRange = (student) => {
    setGetResponseByDateMonthRange(student);
  };

  const showStudentByGPA = (student) => {
    setGetResponseByGPA(student);
  };

  return (
    <div className="app-container">
      <h1>WELCOME TO CMPSC-363</h1>
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
        <StudentList
          students={students}
          editStudent={editStudent}
          deleteStudent={deleteStudent}
        />
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {editedStudent ? (
        <UpdateForm
          student={editedStudent}
          submitStudent={submitStudent}
          showError={showError}
          editStudent={editStudent}
        />
      ) : null}
      {/*If editedStudent is not null, we render the form */}

      <br />
      <h3>Add Student</h3>
      <DBFormatToggle />

      <InsertForm insertStudent={insertStudent} showError={showError} />
      <div>
        <SearchById showStudent={showStudentById} showError={showError} />
      </div>
      {getResponseById ? (
        <div>
          <h3 style={{ fontSize: "20px", width: "200px" }}>Search Result</h3>
          <table className="table table-striped">
            <tbody>
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
              {getResponseById.map((response) => {
                return (
                  <tr key={response.Student_ID}>
                    <td>{response.Student_ID}</td>
                    <td>{response.FirstName}</td>
                    <td>{response.LastName}</td>
                    <td>{response.SSN}</td>
                    <td>{response.Major}</td>
                    <td>{response.DOB}</td>
                    <td>{response.Address}</td>
                    <td>{response.GPA}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            className="btn btn-default"
            style={{
              marginBottom: "15px",
            }}
            onClick={() => showStudentById(null)}
          >
            Close
          </button>
        </div>
      ) : null}
      <SearchByAny showStudentByAny={showStudentByAny} showError={showError} />
      {getResponseByAny ? (
        <div>
          <h3 style={{ fontSize: "20px", width: "200px" }}>Search Result</h3>
          <table className="table table-striped">
            <tbody>
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
              {getResponseByAny.map((response) => {
                return (
                  <tr key={response.Student_ID}>
                    <td>{response.Student_ID}</td>
                    <td>{response.FirstName}</td>
                    <td>{response.LastName}</td>
                    <td>{response.SSN}</td>
                    <td>{response.Major}</td>
                    <td>{response.DOB}</td>
                    <td>{response.Address}</td>
                    <td>{response.GPA}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            className="btn btn-default"
            style={{
              marginBottom: "15px",
            }}
            onClick={() => showStudentByAny(null)}
          >
            Close
          </button>
        </div>
      ) : null}
      <SearchByDateRange
        showStudentByDateRange={showStudentByDateRange}
        showError={showError}
      />
      {getResponseByDateRange ? (
        <div>
          <h3 style={{ fontSize: "20px", width: "200px" }}>Search Result</h3>
          <table className="table table-striped">
            <tbody>
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
              {getResponseByDateRange.map((response) => {
                return (
                  <tr key={response.Student_ID}>
                    <td>{response.Student_ID}</td>
                    <td>{response.FirstName}</td>
                    <td>{response.LastName}</td>
                    <td>{response.SSN}</td>
                    <td>{response.Major}</td>
                    <td>{response.DOB}</td>
                    <td>{response.Address}</td>
                    <td>{response.GPA}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            className="btn btn-default"
            style={{
              marginBottom: "15px",
            }}
            onClick={() => showStudentByDateRange(null)}
          >
            Close
          </button>
        </div>
      ) : null}
      <SearchByDateMonthRange
        showStudentByDateMonthRange={showStudentByDateMonthRange}
        showError={showError}
      />
      {getResponseByDateMonthRange ? (
        <div>
          <h3 style={{ fontSize: "20px", width: "200px" }}>Search Result</h3>
          <table className="table table-striped">
            <tbody>
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
              {getResponseByDateMonthRange.map((response) => {
                return (
                  <tr key={response.Student_ID}>
                    <td>{response.Student_ID}</td>
                    <td>{response.FirstName}</td>
                    <td>{response.LastName}</td>
                    <td>{response.SSN}</td>
                    <td>{response.Major}</td>
                    <td>{response.DOB}</td>
                    <td>{response.Address}</td>
                    <td>{response.GPA}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            className="btn btn-default"
            style={{
              marginBottom: "15px",
            }}
            onClick={() => showStudentByDateMonthRange(null)}
          >
            Close
          </button>
        </div>
      ) : null}
      <SearchByGPA showStudentByGPA={showStudentByGPA} showError={showError} />
      {getResponseByGPA ? (
        <div>
          <h3 style={{ fontSize: "20px", width: "200px" }}>Search Result</h3>
          <table className="table table-striped">
            <tbody>
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
              {getResponseByGPA.map((response) => {
                return (
                  <tr key={response.Student_ID}>
                    <td>{response.Student_ID}</td>
                    <td>{response.FirstName}</td>
                    <td>{response.LastName}</td>
                    <td>{response.SSN}</td>
                    <td>{response.Major}</td>
                    <td>{response.DOB}</td>
                    <td>{response.Address}</td>
                    <td>{response.GPA}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            className="btn btn-default"
            style={{
              marginBottom: "15px",
            }}
            onClick={() => showStudentByGPA(null)}
          >
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
