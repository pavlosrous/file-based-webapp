import React from "react";
import "../App.css";
import APIService from "./APIService";

function StudentList(props) {
  const editStudent = (student) => {
    props.editStudent(student); //call the editStudent() of the parent
  };

  const deleteStudent = (student) => {
    console.log(student.Student_ID);
    APIService.DeleteStudent(student.Student_ID)
      .then((response) => props.deleteStudent(response))
      .catch((error) => console.log(error));
  };

  //add props to send the student data from the parent component to the child
  return (
    <tbody>
      {props.students &&
        // console.log(props.students) &&
        props.students.map((student) => {
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
              <div className="row">
                <div className="col-mid-1">
                  <button
                    className="btn btn-default"
                    onClick={() => editStudent(student)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-default"
                    onClick={() => deleteStudent(student)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </tr>
          );
        })}
    </tbody>
  );
}

export default StudentList;
