import React, { useReducer, useState } from "react";
import APIService from "./APIService";
import Toggle from "./Toggle";

function SearchById(props) {
  const [id, setId] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [ssn, setSsn] = useState("");
  const [major, setMajor] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [gpa, setGpa] = useState("");

  const getStudent = () => {
    APIService.GetStudent(id, fname, lname, ssn, major, dob, address, gpa)

      .then((response) => {
        console.log(Array.isArray([response]));
        console.log(JSON.stringify([response]));
        if (JSON.stringify(response).includes("BAD REQUEST")) {
          throw new Error(response.split(":")[1]);
        } else {
          if (Array.isArray(response)) {
            props.showStudent(response);
          } else {
            props.showStudent([response]);
          }

          props.showError(null);
        }
      })
      .catch((error) => {
        props.showError(error.message);
        props.showStudent(null);
      });
  };

  return (
    <div>
      <hr class="solid"></hr>
      <h3>Search By ID</h3>
      <div className="search-by-id" style={{ width: "10%" }}>
        <label htmlFor="id" className="form-label"></label>
        <input
          type="text"
          className="form-control"
          placeholder="Student ID"
          onChange={(student) => setId(student.target.value)}
        />
      </div>
      <button
        className="btn btn-default"
        style={{
          marginBottom: "15px",
        }}
        onClick={getStudent}
      >
        Search
      </button>
    </div>
  );
}

export default SearchById;
