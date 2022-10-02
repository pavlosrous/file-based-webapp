import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Toggle extends Component {
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
            <b>Usage:</b> <br></br>1. Select <b>OR</b> from the drop down menu
            to find the student(s) with at least one of those attribute (i.e.
            the union) <br></br>2. Select <b>AND</b> from the drop down menu to
            find the student(s) with all of these attributes(i.e the
            intersection)
            <br></br> If you specify only one attribute (with either option from
            the drop down menu), you will receive all the entries with that
            attribute
          </p>
        )}
      </div>
    );
  }
}
