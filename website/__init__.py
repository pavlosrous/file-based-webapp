from csv import DictReader, DictWriter
import csv
from hashlib import new
import json
import os
import shutil
from socket import fromfd
from tempfile import NamedTemporaryFile
from tkinter import E
from flask import Flask, abort, jsonify, make_response
import pandas as pd
from datetime import datetime
from flask_cors import CORS
import uuid
from os.path import exists
from werkzeug.exceptions import HTTPException, NotFound
import string
import re
from dateutil.relativedelta import relativedelta

# TODO: add json.dumps to error messages and returned strings

column_names = ['Student_ID','FirstName', 'LastName', 'SSN', 'Major', 'DOB', 'Address', 'GPA']

def create_app():
    app = Flask(__name__)
    # app.config['SECRET_KEY'] = 'aka@Very100Complex'
    CORS(app)

    if (exists('studentdb.csv') == False):
        create_db()

    # import blueprints 
    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix = '/')
    app.register_blueprint(auth, url_prefix = '/')

    return app

# Initialize DB with some sample entries
def create_db():
    with open('studentdb.csv', mode='w') as csv_file:
        csv_writer = csv.DictWriter(csv_file, fieldnames=column_names)
        csv_writer.writeheader()
        id_1 = str(uuid.uuid4()).split('-')[0]
        id_2 = str(uuid.uuid4()).split('-')[0]

        # confirm they ids not the same
        while (id_1 == id_2 ):
            id_1 = str(uuid.uuid4()).split('-')[0]
            id_2 = str(uuid.uuid4()).split('-')[0]
                
                
        intial_data = [{'Student_ID': id_1, 'FirstName':'Pavlos', 'LastName':'Rousoglou', 'SSN':'121-13-9121', 'Major':'CS', 'DOB':'1998-07-09',
            'Address':'22 Irving St, MA, 02812', 'GPA':'3.95'},{'Student_ID': id_2,'FirstName':'Stelios', 'LastName':'Rousoglou', 'SSN':'109-09-6212', 'Major':'CS', 'DOB':'2000-07-16',
            'Address':'127 Saint Clemens Rd', 'GPA':'3.4'}]

        csv_writer.writerows(intial_data)

# Get all students
def get_students():
    return csv_to_json()

# Get student by ID
def get_student_by_id(id):
    with open('studentdb.csv', mode='r') as csv_file:
        reader = csv.DictReader(csv_file)

        for row in reader:
            for header, col_value in row.items():
                if header == 'Student_ID' and col_value == id:
                    return json.dumps(row)
    return jsonify(f"BAD REQUEST: Student with {id} doesn't exist")

# Add student
def add_student(entry):
    status = error_checking(entry)
    if (status != True):
        return make_response(jsonify(status), 400)

    new_id = unique_id()

    if (check_ssn(entry[2])):
        with open('studentdb.csv', mode='a') as csv_file:
            db_entry = {'Student_ID': new_id, 'FirstName': string.capwords(entry[0]), 'LastName': string.capwords(entry[1]), 'SSN': entry[2], 'Major': entry[3], 'DOB': entry[4], 'Address': entry[5], 'GPA': entry[6]}
            
            writer = DictWriter(csv_file, fieldnames=column_names)
            writer.writerow(db_entry)
        return csv_to_json()
    else:
        return make_response(jsonify("BAD REQUEST: SSN exists in the database"), 400)

# Update row by id. Create a temporary file to store changes and move it to the original
def update_student_by_id(id, entry):

    status = error_checking(entry)
    if (status != True):
        return make_response(jsonify(status), 400)

    temp_file = open('tempfile.csv', mode='w')
    absent_flag = True

    with open('studentdb.csv', mode='r') as csv_file:
        reader = csv.DictReader(csv_file, fieldnames=column_names)
        writer = csv.DictWriter(temp_file, fieldnames=column_names)

        for row in reader:
            if row['Student_ID'] != id and row['SSN'] == entry[2]:
                temp_file.close()
                os.remove('tempfile.csv')
                return make_response(jsonify("BAD REQUEST: SSN exists in the database"), 400)

            elif row['Student_ID'] == id:
                row['FirstName'], row['LastName'], row['SSN'], row['Major'], row['DOB'], row['Address'], row['GPA'] = entry[0], entry[1], entry[2], entry[3], entry[4], entry[5], entry[6]
                row  = {'Student_ID': id,"FirstName": row['FirstName'],'LastName' : row['LastName'],'SSN': row['SSN'],'Major': row['Major'],'DOB': row['DOB'],'Address': row['Address'], 'GPA':row['GPA']}
                absent_flag = False
            writer.writerow(row)    
    temp_file.close()
    shutil.move('tempfile.csv', 'studentdb.csv')
    if (absent_flag):
        return make_response(jsonify("BAD REQUEST: Student doesn't exist"), 400)
    return csv_to_json()
    
# Delete student
def delete_student_by_id(id):
    new_db = []
    with open('studentdb.csv', mode='r') as csv_file:
        reader = csv.DictReader(csv_file)

        for row in reader:
            for header, col_value in row.items():
                if header == 'Student_ID' and col_value != id:
                    new_db.append(row)
    return updatedb(new_db)




# ----------------------------- Helper Functions -----------------------------

# Get a unique id
def unique_id():
    id_set = set()

    with open('studentdb.csv', mode='r+') as csv_file:
        reader = csv.DictReader(csv_file)
        new_id = str(uuid.uuid4()).split('-')[0]

        for row in reader:
            for header, col_value in row.items():
                id_set.add(col_value)
                break
                
        while(new_id in id_set):
            new_id = str(uuid.uuid4()).split('-')[0]

    return new_id

# Check whether ssn is unique
def check_ssn(ssn):
    ssn_set = set()

    with open('studentdb.csv', mode='r+') as csv_file:
        reader = DictReader(csv_file)
        field_names = reader.fieldnames

        for row in reader:
            for header, col_value in row.items():
                if header == 'SSN' and len(col_value) > 0:
                    ssn_set.add(col_value)
            
    if ssn in ssn_set:
        return False 

    return True

def csv_to_json():
    with open('studentdb.csv', mode='r') as csv_file:
        reader = DictReader(csv_file)
        db_to_list = []

        for row in reader:
            db_to_list.append(row)

        return json.dumps(db_to_list)

def updatedb(db):
    with open('studentdb.csv', mode='w') as csv_file:
        csv_writer = csv.DictWriter(csv_file, fieldnames=column_names)
        csv_writer.writeheader()
        csv_writer.writerows(db)
    return csv_to_json()


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

    

# -------------------------------- Find By -------------------------------- 


# find row with all entry values
def find_student_by_all(entry):

    return_students = []
    new_db = dict()

    for key, value in entry.items():
        if len(value) > 0:
            new_db[key] = value
    print(entry)
    if len(new_db) > 0:
        with open('studentdb.csv', mode='r') as csv_file:
            reader = csv.DictReader(csv_file)

            for row in reader:
                if len(row.items() & new_db.items()) == len(new_db): # if the intersection of the row is the same length as the fiels we are looking for, add the row to return list
                    return_students.append(row)
        if len(return_students) == 0:
            return jsonify("BAD REQUEST: Student doesn't exist")

    elif len(new_db) == 0: 
        return jsonify("BAD REQUEST: All entries are empty")

    return jsonify(return_students)

def find_student_by_any(entry):
    return_students = []
    new_db = dict()
    print(new_db)

    for key, value in entry.items():
        if len(value) > 0:
            new_db[key] = value

    if len(new_db) > 0:
        with open('studentdb.csv', mode='r') as csv_file:
            reader = csv.DictReader(csv_file)

            for row in reader:
                if len(row.items() & new_db.items()) > 0: # if the intersection of the row is the same length as the fiels we are looking for, add the row to return list
                    return_students.append(row)
        if len(return_students) == 0:
            return jsonify("BAD REQUEST: Student doesn't exist")

    elif len(new_db) == 0: 
        return jsonify("BAD REQUEST: All entries are empty")

    return jsonify(return_students)

# ----------------------------------------------- GET BY DATE -----------------------------------------------
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

    with open('studentdb.csv', mode='r') as csv_file:
        reader = csv.DictReader(csv_file)

        for row in reader:
            for header, col_value in row.items():
                if header == 'DOB' and (from_date <= datetime.strptime(col_value, r'%Y-%m-%d').date() <= to_date):
                    new_db.append(row)

    if len(new_db) == 0:
        return make_response(jsonify("BAD REQUEST: No birthdates in this interval"), 400)
    return make_response(jsonify(new_db), 200)

def get_students_date_single(from_d, to):

    if from_d == 'all' and to == 'all':
        return get_students()

    if from_d == 'all':
        return get_student_date_to(to)

    if to == 'all':
        return get_student_date_from(from_d)


def get_student_date_from(from_d):
    new_db = []
    if (len(from_d.split("-")) == 2): #it's only month and year
        from_date = datetime.strptime(from_d, r'%Y-%m').date()
    else:
        from_date = datetime.strptime(from_d, r'%Y-%m-%d').date()
        

    with open('studentdb.csv', mode='r') as csv_file:
        reader = csv.DictReader(csv_file)

        for row in reader:
            for header, col_value in row.items():
                if header == 'DOB' and (from_date <= datetime.strptime(col_value, r'%Y-%m-%d').date()):
                    new_db.append(row)

    if len(new_db) == 0:
        return make_response(jsonify("BAD REQUEST: No birthdates in this interval"), 400)
    return make_response(jsonify(new_db), 200)

def get_student_date_to(to):
    new_db = []

    if (len(to.split("-")) == 2): #it's only month and year
        to_date = datetime.strptime(to, r'%Y-%m').date()
    else:
        to_date = datetime.strptime(to, r'%Y-%m-%d').date()

    to_date = to_date + relativedelta(day=31)
    print(to_date)

    with open('studentdb.csv', mode='r') as csv_file:
        reader = csv.DictReader(csv_file)

        for row in reader:
            for header, col_value in row.items():
                if header == 'DOB' and (datetime.strptime(col_value, r'%Y-%m-%d').date() <= to_date):
                    new_db.append(row)

    if len(new_db) == 0:
        return make_response(jsonify("BAD REQUEST: No birthdates in this interval"), 400)
    return make_response(jsonify(new_db), 200)


# --------------------------------------- GET BY GPA --------------------------------------- 

def get_students_by_gpa(lower, upper):
    new_db = []

    with open('studentdb.csv', mode='r') as csv_file:
        reader = csv.DictReader(csv_file)

        for row in reader:
            for header, col_value in row.items():
                if header == 'GPA' and len(col_value) > 0 and (lower <= float(col_value) <= upper):
                    new_db.append(row)

    if len(new_db) == 0:
        return make_response(jsonify("BAD REQUEST: No GPAs in this interval"), 400)
    return make_response(jsonify(new_db), 200)

def get_students_by_gpa_single(lower, upper):
    if lower == 'all' and upper == 'all':
        return get_students()

    if lower == 'all':
        return get_students_by_gpa_lower(float(upper))

    if upper == 'all':
        return get_students_by_gpa_upper(float(lower))

def get_students_by_gpa_lower(upper):
    new_db = []

    with open('studentdb.csv', mode='r') as csv_file:
        reader = csv.DictReader(csv_file)

        for row in reader:
            for header, col_value in row.items():
                if header == 'GPA' and len(col_value) > 0 and (float(col_value) <= upper):
                    new_db.append(row)

    if len(new_db) == 0:
        return make_response(jsonify("BAD REQUEST: No GPAs in this interval"), 400)
    return make_response(jsonify(new_db), 200)

def get_students_by_gpa_upper(lower):
    new_db = []

    with open('studentdb.csv', mode='r') as csv_file:
        reader = csv.DictReader(csv_file)

        for row in reader:
            for header, col_value in row.items():
                if header == 'GPA' and len(col_value) > 0 and (lower <= float(col_value)):
                    new_db.append(row)

    if len(new_db) == 0:
        return make_response(jsonify("BAD REQUEST: No GPAs in this interval"), 400)
    return make_response(jsonify(new_db), 200)