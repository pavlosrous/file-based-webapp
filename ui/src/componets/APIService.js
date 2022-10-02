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

  static InsertStudent(first, last, ssn, major, dob, address, gpa) {
    return fetch("http://127.0.0.1:5000/add", {
      method: "POST",
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

  static DeleteStudent(id) {
    return fetch(`http://127.0.0.1:5000/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  static GetStudent(id, first, last, ssn, major, dob, address, gpa) {
    return fetch(`http://127.0.0.1:5000/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  static GetStudentByAll(first, last, ssn, major, dob, address, gpa) {
    // console.log(first, last, ssn, major, dob, address, gpa, "----------ALL");
    return fetch("http://127.0.0.1:5000/get/and", {
      method: "POST",
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

  static GetStudentByAny(first, last, ssn, major, dob, address, gpa) {
    // console.log(first, last, ssn, major, dob, address, gpa, "----------ANY");
    return fetch("http://127.0.0.1:5000/get/or", {
      method: "POST",
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
  static GetStudentByDateRange(from_date, to_date) {
    // console.log(first, last, ssn, major, dob, address, gpa, "----------ANY");
    return fetch(`http://127.0.0.1:5000/get/drange/${from_date}/${to_date}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }
}
