import React, { useState } from "react";
import APIService from "./APIService";
import DBFormatToggle from "./DBFormatToggle";

function InsertForm(props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [ssn, setSsn] = useState("");
  const [major, setMajor] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [gpa, setGpa] = useState("");

  const insertStudent = () => {
    APIService.InsertStudent(fname, lname, ssn, major, dob, address, gpa)
      .then((response) => {
        if (response.includes("BAD REQUEST")) {
          throw new Error(response.split(":")[1]);
        } else {
          props.insertStudent(response);
          props.showError(null);
        }
      })
      .catch((error) => props.showError(error.message));
  };

  return (
    <div
      style={{
        display: "inline-flex",
        marginTop: "20px",
        marginBottom: "20px",
        width: "100%",
      }}
    >
      <div className="form-group" style={{ marginRight: "5px" }}>
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
          onChange={(student) => setFname(student.target.value)}
        />
      </div>
      <div className="form-group" style={{ marginRight: "5px" }}>
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
          onChange={(student) => setLname(student.target.value)}
        />
      </div>
      <div className="form-group" style={{ marginRight: "5px" }}>
        <label className="sr-only" htmlFor="exampleInputSSN3">
          SSN
        </label>
        <input
          type="text"
          className="form-control"
          id="ssn"
          name="ssn"
          placeholder="xxx-xx-xxxx"
          onChange={(student) => setSsn(student.target.value)}
          maxlength="11"
        />
      </div>
      <div className="form-group" style={{ marginRight: "5px" }}>
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
          onChange={(student) => setMajor(student.target.value)}
        />
      </div>
      <div className="form-group" style={{ marginRight: "5px" }}>
        <label className="sr-only" htmlFor="exampleInputDOB3">
          Date of birth
        </label>
        <input
          type="date"
          className="form-control"
          max={new Date().toJSON().slice(0, 10).toString()}
          min={new Date(new Date().setFullYear(new Date().getFullYear() - 100))
            .toJSON()
            .slice(0, 10)}
          id="dob"
          name="dob"
          placeholder="Date of birth"
          onChange={(student) => setDob(student.target.value)}
        />
      </div>
      <div className="form-group" style={{ marginRight: "5px" }}>
        <label className="sr-only" htmlFor="exampleInputAddress3">
          Address
        </label>
        <input
          type="address"
          className="form-control"
          id="addr"
          name="address"
          placeholder="Address"
          onChange={(student) => setAddress(student.target.value)}
        />
      </div>
      <div className="form-group" style={{ marginRight: "5px" }}>
        <label className="sr-only" htmlFor="exampleInputGPA3">
          GPA
        </label>
        <input
          type="number"
          className="form-control"
          step="0.01"
          min="0"
          max="4.0"
          id="gpa"
          name="gpa"
          placeholder="GPA"
          onChange={(student) => setGpa(student.target.value)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-default"
        style={{
          width: "70px",
          height: "38px",
          marginTop: "23px",
        }}
        onClick={insertStudent}
      >
        Add
      </button>
      {/* {error && <h3>{error}</h3>} */}
    </div>
  );
}

export default InsertForm;
