import React from "react";
import "../App.css";
import APIService from "./APIService";

function StudentList(props) {
  const editStudent = (student) => {
    props.editStudent(student); //call the editStudent() of the parent
  };

  const deleteStudent = (student) => {
    console.log(student.id);
    APIService.DeleteStudent(student.id)
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
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.fname}</td>
              <td>{student.lname}</td>
              <td>{student.ssn}</td>
              <td>{student.major}</td>
              <td>{student.dob}</td>
              <td>{student.address}</td>
              <td>{student.gpa}</td>
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
