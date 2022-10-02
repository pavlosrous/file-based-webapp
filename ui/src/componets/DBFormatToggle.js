import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class DBFormatToggle extends Component {
  state = {
    on: false,
  };

  toggle = () => {
    this.setState({ on: !this.state.on });
  };

  render() {
    return (
      <div>
        <button className="btn btn-default" onClick={this.toggle}>
          {this.state.on ? "Hide" : "DB Format"}
        </button>
        <br></br>
        {this.state.on && (
          <p>
            <b>Database Rules:</b> <br />
            The student ID is an auto generated <b>unique</b> attribute
            <br />
            1. First name cannot include digits and cannot be empty <br />
            2. Last name cannot include digits and cannot be empty <br />
            3. SSN must contain 9 digits and include dashes in the correct
            position (e.g. 000-00-0000). It <b>can</b> be empty in case the
            student is international
            <br />
            4. Major cannot contain digits and cannot be empty
            <br />
            5. Date cannot be empty
            <br />
            6. GPA <b>can</b> be empty if it is the student's first semester
          </p>
        )}
      </div>
    );
  }
}
