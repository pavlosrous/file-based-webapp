import re
from datetime import datetime
import json

import jsonpickle as jsonpickle
from dateutil.relativedelta import relativedelta
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
# from website import error_checking

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:mysecretpassword@localhost:5432/postgres'
db = SQLAlchemy(app)
CORS(app)


class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(100))
    lname = db.Column(db.String(100))
    ssn = db.Column(db.String(100), unique=True)
    major = db.Column(db.String(100))
    dob = db.Column(db.Date)
    address = db.Column(db.String(100))
    gpa = db.Column(db.Float)

    def __init__(self, fname, lname, ssn, major, dob, address, gpa):
        self.fname = fname
        self.lname = lname
        self.ssn = ssn
        self.major = major
        self.dob = dob
        self.address = address
        self.gpa = gpa

    def __repr__(self):
        return f"Student: {self.id}, {self.fname}"

    def toJSON(self):
        return {
            "id": self.id,
            "fname": self.fname,
            "lname": self.lname,
            "ssn": self.ssn,
            "major": self.major,
            "dob": self.dob.strftime(r'%Y-%m-%d'),
            "address": self.address,
            "gpa": self.gpa
        }


with app.app_context():
    db.create_all()
    student1 = Student("Pavlos", "Rousoglou", "777-181-1291", "CS", "1998-07-09", "22 Irving St", "3.9")
    student2 = Student("Aaron", "Apples", "412-412-4121", "ENG", "2000-11-05", "109 Charles St", "3.3")
    db.session.commit()



@app.route('/add', methods=['POST'])
def add_one():
    entry = [request.json['fname'], request.json['lname'], request.json['ssn'], request.json['major'],
             request.json['dob'], request.json['address'], request.json['gpa']]
    return add_student(entry)


def add_student(entry):
    status = error_checking(entry)
    if (status != True):
        return make_response(jsonify(status), 400)

    if (len(entry[2]) == 0):
        entry[2] = None
    elif (len(db.session.query(Student).filter(Student.ssn==entry[2]).all()) > 0):
        return make_response(jsonify('BAD REQUEST: SSN is already exists'), 400)

    student = Student(entry[0], entry[1], entry[2], entry[3], entry[4], entry[5], entry[6])
    db.session.add(student)
    db.session.commit()
    return get_all()


@app.route('/get', methods=['GET'])
def get_students():
    return get_all()


def get_all():
    students = Student.query.order_by(Student.id.asc()).all()
    student_list = []
    for student in students:
        student_list.append(student.toJSON())
    return json.dumps(student_list)


@app.route('/get/<id>/', methods=['GET'])
def get_by_id(id):
    return get_student_by_id(id)


def get_student_by_id(id):
    student = Student.query.filter_by(id=id).one()
    return json.dumps(student.toJSON())


@app.route('/delete/<id>/', methods=['DELETE'])
def delete_by_id(id):
    return delete_student_by_id(id)


def delete_student_by_id(id):
    student = Student.query.filter_by(id = id).one()
    db.session.delete(student)
    db.session.commit()
    return get_all()


@app.route('/update/<id>/', methods=['PUT'])
def update_by_id(id):
    return update_student(id)


def update_student(id):
    student = Student.query.filter_by(id=id)
    new_entry = [request.json['fname'], request.json['lname'], request.json['ssn'], request.json['major'],
                 request.json['dob'], request.json['address'], request.json['gpa']]
    status = error_checking(new_entry)
    if (status != True):
        return make_response(jsonify(status), 400)

    if (len(new_entry[2]) == 0):
        new_entry[2] = None

    student.update(dict(fname=new_entry[0], lname=new_entry[1], ssn=new_entry[2], major=new_entry[3], dob=new_entry[4],
                        address=new_entry[5], gpa=new_entry[6]))
    db.session.commit()

    return get_all()

@app.route('/get/drange/<from_d>/<to>', methods=['GET'])
def get_student_between_drange(from_d, to):

    if from_d == 'all' or to == 'all':
        return get_students_date_single(from_d, to)

    return get_students_drange(from_d, to)


def get_students_date_single(from_d, to):

    if from_d == 'all' and to == 'all':
        return get_students()

    if from_d == 'all':
        return get_student_date_to(to)

    if to == 'all':
        return get_student_date_from(from_d)


def get_student_date_to(to):
    if (len(to.split("-")) == 2): #it's only month and year
        to_date = datetime.strptime(to, r'%Y-%m').date()
    else:
        to_date = datetime.strptime(to, r'%Y-%m-%d').date()

    to_date = to_date + relativedelta(day=31)

    students = db.session.query(Student).filter(Student.dob<=to_date).all()

    if len(students) == 0:
        return make_response(jsonify("BAD REQUEST: No birthdates in this interval"), 400)

    return convert_students_to_json(students)



def get_students_drange(from_d, to):
    new_db = []

    if (len(from_d.split("-")) == 2): #it's only month and year
        from_date = datetime.strptime(from_d, r'%Y-%m').date()
        to_date = datetime.strptime(to, r'%Y-%m').date()
        to_date = to_date + relativedelta(day=31)
    else:
        from_date = datetime.strptime(from_d, r'%Y-%m-%d').date()
        to_date = datetime.strptime(to, r'%Y-%m-%d').date()

    if to_date < from_date:
        return make_response(jsonify("BAD REQUEST: To date cannot be smaller than From date"), 400)

    students = db.session.query(Student).filter(from_date<=Student.dob)\
        .filter(Student.dob<=to_date).all()

    if len(students) == 0:
        return make_response(jsonify("BAD REQUEST: No birthdates in this interval"), 400)
    return convert_students_to_json(students)



def get_student_date_from(from_d):
    if (len(from_d.split("-")) == 2): #it's only month and year
        from_date = datetime.strptime(from_d, r'%Y-%m').date()
    else:
        from_date = datetime.strptime(from_d, r'%Y-%m-%d').date()

    students = db.session.query(Student).filter(Student.dob>=from_date).all()

    if len(students) == 0:
        return make_response(jsonify("BAD REQUEST: No birthdates in this interval"), 400)

    return convert_students_to_json(students)

def convert_students_to_json(students):
    json_students = []

    for student in students:
        json_students.append(student.toJSON())
    return json_students

@app.route('/get/gpa/<lower>/<upper>', methods=['GET'])
def get_student_by_gpa(lower, upper):

    if lower == 'all' or upper == 'all':
        return get_students_by_gpa_single(lower, upper)

    return get_students_by_gpa(float(lower), float(upper))

def get_students_by_gpa_single(lower, upper):
    if lower == 'all' and upper == 'all':
        return get_students()

    if lower == 'all':
        return get_students_by_gpa_lower(float(upper))

    if upper == 'all':
        return get_students_by_gpa_upper(float(lower))

def get_students_by_gpa_lower(upper):
    students = db.session.query(Student).filter(Student.gpa<=upper).all()

    if len(students) == 0:
        return make_response(jsonify("BAD REQUEST: No GPAs in this interval"), 400)
    return convert_students_to_json(students)

def get_students_by_gpa_upper(lower):
    students = db.session.query(Student).filter(Student.gpa>=lower).all()

    if len(students) == 0:
        return make_response(jsonify("BAD REQUEST: No GPAs in this interval"), 400)

    return convert_students_to_json(students)

def get_students_by_gpa(lower, upper):
    students = db.session.query(Student).filter(Student.gpa>=lower).filter(Student.gpa<=upper).all()

    if len(students) == 0:
        return make_response(jsonify("BAD REQUEST: No GPAs in this interval"), 400)
    return convert_students_to_json(students)

def error_checking(entry):
    ssn_format = r'[0-9]{3}-[0-9]{2}-[0-9]{4}'

    # Name cannot be empty of contain numbers
    if len(entry[0]) == 0:
        return 'BAD REQUEST: First name cannot be empty'
    if any(char.isdigit() for char in entry[0]):
        return 'BAD REQUEST: Name cannot contain digits'
    if len(entry[1]) == 0:
        return 'BAD REQUEST: Last name cannot be empty'
    if any(char.isdigit() for char in entry[1]):
        return 'BAD REQUEST: Name cannot contain digits'

    # SSN must be in the correct format of xxx-xx-xxxx but it can be empty (international students don't have a ssn)
    if bool(re.match(ssn_format, entry[2])) == False and len(entry[2]) != 0:
        return 'BAD REQUEST: SSN is in the wrong format (e.g. 000-00-0000)'



    # A major cannot container numbers and cannot be empty
    if len(entry[3]) == 0:
        return 'BAD REQUEST: Major cannot be empty'

    if any(char.isdigit() for char in entry[3]):
        return 'BAD REQUEST: Major cannot contain numbers'

    # Address cannot container numbers and cannot be empty
    if len(entry[5]) < 4:
        return 'BAD REQUEST: Address cannot be empty'

    # Format restrictions for GPA and DOB are handled by frontend. GPA can be empty if the it is the students first semester
    if len(entry[4]) == 0:
        return 'BAD REQUEST: Date of birth name cannot be empty'

    return True

if __name__ == '__main__':
    app.run(debug=True)
