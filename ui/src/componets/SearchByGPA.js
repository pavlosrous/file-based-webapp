import React, { useState } from "react";
import APIService from "./APIService";
import GPAUsageToggle from "./GPAUsageToggle";

function SearchByGPA(props) {
  const [fromGPA, setFromGPA] = useState("");
  const [toGPA, setToGPA] = useState("");

  const getStudentByGPA = () => {
    if (fromGPA === "") {
      var from_gpa = "all";
    } else {
      var from_gpa = fromGPA;
    }
    if (toGPA === "") {
      var to_gpa = "all";
    } else {
      var to_gpa = toGPA;
    }
    APIService.GetStudentByGPA(from_gpa, to_gpa)

      .then((response) => {
        if (JSON.stringify(response).includes("BAD REQUEST")) {
          throw new Error(response.split(":")[1]);
        } else {
          if (Array.isArray(response)) {
            props.showStudentByGPA(response);
          } else {
            props.showStudentByGPA([response]);
          }

          props.showError(null);
        }
      })
      .catch((error) => {
        props.showError(error.message);
        props.showStudentByGPA(null);
      });
  };

  return (
    <div>
      <hr class="solid"></hr>

      <h3>Search By GPA</h3>
      <GPAUsageToggle />

      <div
        style={{
          display: "inline-flex",
          marginTop: "10px",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <div
          className="form-group"
          style={{ marginRight: "5px", width: "160px" }}
        >
          <label className="sr-only" htmlFor="exampleInputDOB3">
            Lower Bound
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
            onChange={(student) => setFromGPA(student.target.value)}
          />
        </div>
        <div
          className="form-group"
          style={{ marginRight: "5px", width: "160px" }}
        >
          <label className="sr-only" htmlFor="exampleInputDOB3">
            Upper Bound
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
            onChange={(student) => setToGPA(student.target.value)}
          />
        </div>
        <button
          className="btn btn-default"
          style={{
            marginTop: "22px",
            height: "40px",
            marginLeft: "20px",
          }}
          onClick={getStudentByGPA}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchByGPA;
