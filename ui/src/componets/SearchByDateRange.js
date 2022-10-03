import React, { useState } from "react";
import APIService from "./APIService";
import DateUsageToggle from "../DateUsageToggle";

function SearchByDateRange(props) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getStudentByDateRange = () => {
    if (fromDate === "") {
      var from_date = "all";
    } else {
      var from_date = fromDate;
    }
    if (toDate === "") {
      var to_date = "all";
    } else {
      var to_date = toDate;
    }
    console.log(fromDate, toDate);
    console.log("in date");
    APIService.GetStudentByDateRange(from_date, to_date)

      .then((response) => {
        if (JSON.stringify(response).includes("BAD REQUEST")) {
          throw new Error(response.split(":")[1]);
        } else {
          if (Array.isArray(response)) {
            props.showStudentByDateRange(response);
          } else {
            props.showStudentByDateRange([response]);
          }

          props.showError(null);
        }
      })
      .catch((error) => {
        props.showError(error.message);
        props.showStudentByDateRange(null);
      });
  };

  return (
    <div>
      <hr class="solid"></hr>

      <h3>Search By Date Of Birth (Range)</h3>
      <DateUsageToggle />
      <div
        style={{
          display: "inline-flex",
          marginTop: "10px",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <div className="form-group" style={{ marginRight: "5px" }}>
          <label className="sr-only" htmlFor="exampleInputDOB3">
            From
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
            onChange={(student) => setFromDate(student.target.value)}
          />
        </div>
        <div className="form-group" style={{ marginRight: "5px" }}>
          <label className="sr-only" htmlFor="exampleInputDOB3">
            To
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
            onChange={(student) => setToDate(student.target.value)}
          />
        </div>

        <button
          className="btn btn-default"
          style={{
            marginTop: "22px",
            height: "40px",
            marginLeft: "20px",
          }}
          onClick={getStudentByDateRange}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchByDateRange;
