import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class GPAUsageToggle extends Component {
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
            Get students with GPAs in the specified range (range is inclusive){" "}
            <br />
            1. Including only a <b>Lower Bound</b> number will give you all
            students with GPAs larger or equal to this <br />
            2. Including only a <b>Upper Bound</b> number will give you all
            students smaller or equal to this <br />
            3. Including neither a <b>Lower Bound</b> nor a <b>Upper Bound</b>{" "}
            date will give you all students
          </p>
        )}
      </div>
    );
  }
}
