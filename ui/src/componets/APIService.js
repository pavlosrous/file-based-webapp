export default class APIService {
  static UpdateStudent(id, first, last, ssn, major, dob, address, gpa) {
    return fetch(`http://127.0.0.1:5000/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FirstName: first,
        LastName: last,
        SSN: ssn,
        Major: major,
        DOB: dob,
        Address: address,
        GPA: gpa,
      }),
    }).then((response) => response.json());
  }
  //   static AddStudent(student) {
  //     return fetch("http://127.0.0.1:5000/add", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },

  //       FirstName: JSON.stringify(student.firstName),
  //       LastName: JSON.stringify(student.lastName),
  //       SSN: JSON.stringify(student.ssn),
  //       Major: JSON.stringify(student.major),
  //       DOB: JSON.stringify(student.dob),
  //       Address: JSON.stringify(student.address),
  //       GPA: JSON.stringify(student.gpa),
  //     }).then((response) => response.json);
  //   }
}
