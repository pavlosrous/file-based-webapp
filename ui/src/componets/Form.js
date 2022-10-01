import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import APIService from "./APIService";

function Form(props) {
  const [fname, setFname] = useState(props.student.FirstName);
  const [lname, setLname] = useState(props.student.LastName);
  const [ssn, setSsn] = useState(props.student.SSN);
  const [major, setMajor] = useState(props.student.Major);
  const [dob, setDob] = useState(props.student.DOB);
  const [address, setAddress] = useState(props.student.Address);
  const [gpa, setGpa] = useState(props.student.GPA);

  const submitStudent = (student) => {
    console.log(student);
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
      .then((response) => props.submitStudent(response))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {props.student ? (
        <div className="mb-3">
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
          <button
            className="btn btn-default"
            style={{
              width: "70px",
              height: "38px",
              marginTop: "30px",
            }}
            onClick={submitStudent}
          >
            Submit
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Form;

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../App.css";
// import APIService from "./APIService";

// function Form(props) {
//   const [fname, setFname] = useState(props.student.FirstName);
//   const [lname, setLname] = useState(props.student.LastName);
//   const [ssn, setSsn] = useState(props.student.SSN);
//   const [major, setMajor] = useState(props.student.Major);
//   const [dob, setDob] = useState(props.student.DOB);
//   const [address, setAddress] = useState(props.student.Address);
//   const [gpa, setGpa] = useState(props.student.GPA);

//   const updateStudent = (student) => {
//     console.log(student);
//     APIService.UpdateStudent(props.student.Student_ID, {
//       fname,
//       lname,
//       ssn,
//       major,
//       dob,
//       address,
//       gpa,
//     })
//       .then((response) => console.log)
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div
//       style={{
//         display: "inline-flex",
//         marginTop: "20px",
//         marginBottom: "20px",
//       }}
//     >
//       {props.student ? ( // if we have the student from props, render the form otherwise return null
//         <div className="mb-3">
//           <form className="form-inline">
//             <div className="form-group">
//               <label className="sr-only" htmlFor="exampleInputName3">
//                 First name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="fname"
//                 placeholder="First name"
//                 required="required"
//                 value={fname}
//                 onChange={(student) => setFname(student.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label className="sr-only" htmlFor="exampleInputName3">
//                 Last name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Last name"
//                 required="required"
//                 value={lname}
//                 onChange={(student) => setLname(student.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label className="sr-only" htmlFor="exampleInputSSN3">
//                 SSN
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="SSN"
//                 value={ssn}
//                 onChange={(student) => setSsn(student.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label className="sr-only" htmlFor="exampleInputMajord3">
//                 Major
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Major"
//                 required="required"
//                 value={major}
//                 onChange={(student) => setMajor(student.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label className="sr-only" htmlFor="exampleInputDOB3">
//                 Date of birth
//               </label>
//               <input
//                 type="date"
//                 className="form-control"
//                 placeholder="Date of birth"
//                 value={dob}
//                 onChange={(student) => setDob(student.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label className="sr-only" htmlFor="exampleInputAddress3">
//                 Address
//               </label>
//               <input
//                 type="address"
//                 className="form-control"
//                 placeholder="Address"
//                 value={address}
//                 onChange={(student) => setAddress(student.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label className="sr-only" htmlFor="exampleInputGPA3">
//                 GPA
//               </label>
//               <input
//                 type="float"
//                 className="form-control"
//                 placeholder="GPA"
//                 value={gpa}
//                 onChange={(student) => setGpa(student.target.value)}
//               />
//             </div>
//             <button
//               className="btn btn-default"
//               style={{
//                 width: "70px",
//                 height: "38px",
//                 marginTop: "30px",
//               }}
//               onClick={updateStudent}
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       ) : null}
//     </div>
//   );
// }

// export default Form;
