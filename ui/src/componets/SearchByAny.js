import React, { useState } from "react";
import APIService from "./APIService";
import Toggle from "./Toggle";

function SearchByAny(props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [ssn, setSsn] = useState("");
  const [major, setMajor] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [gpa, setGpa] = useState("");

  const getStudentByAny = () => {
    var select = document.getElementById("queryOption");
    var value = select.options[select.selectedIndex].value; //get the query option selected from the dropdown menu. useState was not working...

    if (value === "AND") {
      APIService.GetStudentByAll(fname, lname, ssn, major, dob, address, gpa)
        .then((response) => {
          console.log(Array.isArray(response));
          console.log(JSON.stringify([response]));
          if (JSON.stringify(response).includes("BAD REQUEST")) {
            throw new Error(response.split(":")[1]);
          } else {
            if (Array.isArray(response)) {
              props.showStudentByAny(response);
            } else {
              props.showStudentByAny([response]);
            }

            props.showError(null);
          }
        })
        .catch((error) => {
          props.showError(error.message); //catches the error thrown above
          props.showStudentByAny(null);
        });
    } else {
      APIService.GetStudentByAny(fname, lname, ssn, major, dob, address, gpa)
        .then((response) => {
          console.log(Array.isArray(response));
          console.log(JSON.stringify([response]));
          if (JSON.stringify(response).includes("BAD REQUEST")) {
            throw new Error(response.split(":")[1]);
          } else {
            if (Array.isArray(response)) {
              props.showStudentByAny(response);
            } else {
              props.showStudentByAny([response]);
            }

            props.showError(null);
          }
        })
        .catch((error) => {
          props.showError(error.message); //catches the error thrown above
          props.showStudentByAny(null);
        });
    }
  };

  return (
    <div>
      <hr class="solid"></hr>

      <h3>Search By All/Any</h3>
      <Toggle />

      <div
        style={{
          display: "inline-flex",
          marginTop: "10px",
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
            min={new Date(
              new Date().setFullYear(new Date().getFullYear() - 100)
            )
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
        <div
          className="form-group"
          style={{ marginRight: "5px", width: "150px" }}
        >
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
          className="btn btn-default"
          style={{
            marginTop: "22px",
            height: "40px",
            marginLeft: "20px",
          }}
          onClick={getStudentByAny}
        >
          Search
        </button>
        <div style={{ width: "50%", marginLeft: "20px", marginTop: "25px" }}>
          <label for="queryOption" style={{ marginRight: "20px" }}>
            Choose a search option:
          </label>
          <select id="queryOption" name="queryOption">
            <option value="OR">OR</option>
            <option value="AND">AND</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchByAny;
