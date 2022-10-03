import React, { useState } from "react";
import APIService from "./APIService";
import DateUsageToggle from "../DateUsageToggle";

function SearchByDateMonthRange(props) {
  const [fromMonthDate, setFromMonthDate] = useState("");
  const [toMonthDate, setToMonthDate] = useState("");

  const getStudentByDateMonthRange = () => {
    if (fromMonthDate === "") {
      var from_date = "all";
    } else {
      var from_date = fromMonthDate;
    }
    if (toMonthDate === "") {
      var to_date = "all";
    } else {
      var to_date = toMonthDate;
    }
    console.log(fromMonthDate, toMonthDate);
    console.log("in month date");
    APIService.GetStudentByDateRange(from_date, to_date)

      .then((response) => {
        if (JSON.stringify(response).includes("BAD REQUEST")) {
          throw new Error(response.split(":")[1]);
        } else {
          if (Array.isArray(response)) {
            props.showStudentByDateMonthRange(response);
          } else {
            props.showStudentByDateMonthRange([response]);
          }

          props.showError(null);
        }
      })
      .catch((error) => {
        props.showError(error.message);
        props.showStudentByDateMonthRange(null);
      });
  };

  return (
    <div>
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
            From
          </label>
          <input
            type="month"
            className="form-control"
            max={new Date().toJSON().slice(0, 7).toString()}
            min={new Date(
              new Date().setFullYear(new Date().getFullYear() - 100)
            )
              .toJSON()
              .slice(0, 7)}
            id="dob"
            name="dob"
            placeholder="Date of birth"
            onChange={(student) => setFromMonthDate(student.target.value)}
          />
        </div>
        <div
          className="form-group"
          style={{ marginRight: "5px", width: "160px" }}
        >
          <label className="sr-only" htmlFor="exampleInputDOB3">
            To
          </label>
          <input
            type="month"
            className="form-control"
            max={new Date().toJSON().slice(0, 7).toString()}
            min={new Date(
              new Date().setFullYear(new Date().getFullYear() - 100)
            )
              .toJSON()
              .slice(0, 7)}
            id="dob"
            name="dob"
            placeholder="Date of birth"
            onChange={(student) => setToMonthDate(student.target.value)}
          />
        </div>
        <button
          className="btn btn-default"
          style={{
            marginTop: "22px",
            height: "40px",
            marginLeft: "20px",
          }}
          onClick={getStudentByDateMonthRange}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchByDateMonthRange;
