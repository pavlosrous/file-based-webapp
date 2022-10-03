import React, { useEffect, useReducer, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import APIService from "./APIService";

function UpdateForm(props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [ssn, setSsn] = useState("");
  const [major, setMajor] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [gpa, setGpa] = useState("");

  //this makes Update display the info of the student we want to update. Without it, we would be able to click Update multiple times
  useEffect(() => {
    setFname(props.student.FirstName);
    setLname(props.student.LastName);
    setSsn(props.student.SSN);
    setMajor(props.student.Major);
    setDob(props.student.DOB);
    setAddress(props.student.Address);
    setGpa(props.student.GPA);
  }, [props.student]); //specify props here to be according to these

  const submitStudent = (student) => {
    APIService.UpdateStudent(
      props.student.Student_ID,
      fname,
      lname,
      ssn,
      major,
      dob,
      address,
      gpa
    )
      .then((response) => {
        if (response.includes("BAD REQUEST")) {
          throw new Error(response.split(":")[1]);
        } else {
          props.submitStudent(response);
          props.showError(null); //make error banner go away
          hideUpdateForm();
        }
      })
      .catch((error) => props.showError(error.message));
  };

  const hideUpdateForm = () => {
    props.editStudent(null); //make update form go away
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
      {props.student ? (
        <div className="mb-3">
          <h3 style={{ marginBottom: "28px" }}>Update Student</h3>

          <div
            className="form-group"
            style={{ display: "inline-block", marginRight: "5px" }}
          >
            <label htmlFor="fname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              value={fname}
              placeholder="First Name"
              onChange={(student) => setFname(student.target.value)}
            />
          </div>
          <div
            className="form-group"
            style={{ display: "inline-block", marginRight: "5px" }}
          >
            <label htmlFor="lname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              value={lname}
              placeholder="Last Name"
              onChange={(student) => setLname(student.target.value)}
            />
          </div>
          <div
            className="form-group"
            style={{ display: "inline-block", marginRight: "5px" }}
          >
            <label htmlFor="ssn" className="form-label">
              SSN
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="SSN"
              value={ssn}
              onChange={(student) => setSsn(student.target.value)}
            />
          </div>
          <div
            className="form-group"
            style={{ display: "inline-block", marginRight: "5px" }}
          >
            <label htmlFor="major" className="form-label">
              Major
            </label>
            <input
              type="text"
              className="form-control"
              value={major}
              placeholder="Major"
              onChange={(student) => setMajor(student.target.value)}
            />
          </div>
          <div
            className="form-group"
            style={{ display: "inline-block", marginRight: "5px" }}
          >
            <label htmlFor="dob" className="form-label">
              Date of birth
            </label>
            <input
              type="date"
              className="form-control"
              value={dob}
              placeholder="Date of birth"
              max={new Date().toJSON().slice(0, 10).toString()}
              min={new Date(
                new Date().setFullYear(new Date().getFullYear() - 100)
              )
                .toJSON()
                .slice(0, 10)}
              onChange={(student) => setDob(student.target.value)}
            />
          </div>
          <div
            className="form-group"
            style={{ display: "inline-block", marginRight: "5px" }}
          >
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              value={address}
              placeholder="Address"
              onChange={(student) => setAddress(student.target.value)}
            />
          </div>
          <div
            className="form-group"
            style={{ display: "inline-block", marginRight: "5px" }}
          >
            <label htmlFor="gpa" className="form-label">
              GPA
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4.0"
              className="form-control"
              value={gpa}
              placeholder="GPA"
              onChange={(student) => setGpa(student.target.value)}
            />
          </div>
          <div className="button" style={{ display: "inline-block" }}>
            <button
              className="btn btn-default"
              style={{
                marginBottom: "15px",
              }}
              onClick={submitStudent}
            >
              Submit
            </button>
            <button
              className="btn btn-default"
              style={{
                marginBottom: "15px",
              }}
              onClick={hideUpdateForm}
            >
              Cancel
            </button>
          </div>
          <hr class="solid"></hr>
        </div>
      ) : null}
    </div>
  );
}

export default UpdateForm;
