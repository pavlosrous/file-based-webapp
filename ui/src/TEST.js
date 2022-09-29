import "./App.css";
import { useState, useEffect } from "react";

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
    <div className="App">
      <h1>Hello Flask</h1>

      {students.map((student) => {
        //iterate over students and post each one on landing page
        return (
          <div key={student.Student_ID}>
            <h2>
              <u>
                {student.FirstName} {student.LastName}
              </u>
            </h2>
            <p>Student ID: {student.Student_ID}</p>
            <p>Date Of Birth: {student.DOB}</p>
            <p>SSN: {student.SSN}</p>
            <p>Major: {student.Major}</p>
            <p>Address: {student.Address}</p>
            <p>GPA: {student.GPA}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
