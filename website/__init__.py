from csv import DictReader, DictWriter
import csv
import json
import os
import pathlib
import shutil
from tempfile import NamedTemporaryFile
from flask import Flask
import pandas as pd
from datetime import datetime
from flask_cors import CORS
import uuid
from os.path import exists

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
                
                
        intial_data = [{'Student_ID': id_1, 'FirstName':'Pavlos', 'LastName':'Rousoglou', 'SSN':'121-139-912', 'Major':'CS', 'DOB':'1998-07-09',
            'Address':'22 Irving St, MA, 02812', 'GPA':'3.95'},{'Student_ID': id_2,'FirstName':'Stelios', 'LastName':'Rousoglou', 'SSN':'109-091-6212', 'Major':'CS', 'DOB':'2000-07-16',
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
    return f"<h1>Student with {id} doesn't exist.<h1>"

# Add student
def add_student(entry):
    new_id = unique_id()

    if (check_ssn(entry[2])):
        with open('studentdb.csv', mode='a') as csv_file:
            db_entry = {'Student_ID': new_id, 'FirstName': entry[0], 'LastName': entry[1], 'SSN': entry[2], 'Major': entry[3], 'DOB': entry[4], 'Address': entry[5], 'GPA': entry[6]}
            
            writer = DictWriter(csv_file, fieldnames=column_names)
            writer.writerow(db_entry)
        return csv_to_json()
    else:
        return json.dumps("<h1> ERROR: SSN exists in the database <h1>")

# Update row by id. Create a temporary file to store changes and move it to the original
def update_student_by_id(id, entry):
    temp_file = open('tempfile.csv', mode='w')
    absent_flag = True
    with open('studentdb.csv', mode='r') as csv_file:
        reader = csv.DictReader(csv_file, fieldnames=column_names)
        writer = csv.DictWriter(temp_file, fieldnames=column_names)

        for row in reader:
            if row['Student_ID'] != id and row['SSN'] == entry[2]:
                temp_file.close()
                os.remove('tempfile.csv')
                return json.dumps('ERROR: SSN exists in the database')

            elif row['Student_ID'] == id:
                row['FirstName'], row['LastName'], row['SSN'], row['Major'], row['DOB'], row['Address'], row['GPA'] = entry[0], entry[1], entry[2], entry[3], entry[4], entry[5], entry[6]
                row  = {'Student_ID': id,"FirstName": row['FirstName'],'LastName' : row['LastName'],'SSN': row['SSN'],'Major': row['Major'],'DOB': row['DOB'],'Address': row['Address'], 'GPA':row['GPA']}
                absent_flag = False
            writer.writerow(row)    
    temp_file.close()
    shutil.move('tempfile.csv', 'studentdb.csv')
    if (absent_flag):
        return json.dumps("Student doesn't exist")
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
                if header == 'SSN':
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