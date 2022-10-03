import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class DateUsageToggle extends Component {
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
          {this.state.on ? "Hide" : "Usage"}
        </button>
        <br></br>
        {this.state.on && (
          <p>
            <b>Usage:</b> <br />
            Get students with birthdates in the specified range (the range is
            inclusive) <br />
            1. You can query both by month/day/year and by month/year
            <br />
            2. Including only a <b>From</b> date will give you all students
            after the specified date <br />
            3. Including only a <b>To</b> date will give you all students before
            the specified date <br />
            4. Including neither a <b>From</b> nor a <b>To</b> date will give
            you all students
          </p>
        )}
      </div>
    );
  }
}
