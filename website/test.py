from csv import DictReader
import csv
from distutils.command.install_egg_info import to_filename
from sqlite3 import Date
import uuid
import json
import string
import re
from flask import jsonify

column_names = ['Student_ID','FirstName', 'LastName', 'SSN', 'Major', 'DOB', 'Address', 'GPA']


# with open('studentdb.csv', mode='r+') as csv_file:
#     reader = DictReader(csv_file)
#     field_names = reader.fieldnames
#     print(field_names)
#     new_id = str(uuid.uuid4()).split('-')[0]

#     id_set = set()

    
#     for row in reader:
#         for header, col_value in row.items():
#             id_set.add(col_value)
#             break
        
#     while(new_id in id_set):
#         new_id = str(uuid.uuid4()).split('-')[0]

#     print(new_id)


# def check_ssn(ssn):
#     with open('studentdb.csv', mode='r+') as csv_file:
#         reader = DictReader(csv_file)
#         field_names = reader.fieldnames
    
#         ssn_set = set()

        
#         for row in reader:
#             for header, col_value in row.items():
#                 if header == 'SSN':
#                     ssn_set.add(col_value)
            
#     if ssn in ssn_set:
#         return "<h1> ERROR: SSN exists in the database <h1>"

        

# def csv_to_json(db):
#     with open('studentdb.csv', mode='r') as csv_file:
#         reader = DictReader(csv_file)
#         db_to_list = []

#         for row in reader:
#             db_to_list.append(row)
        
#         return json.dumps(db_to_list)


            
# def check_ssn(ssn):
#     with open('studentdb.csv', mode='r+') as csv_file:
#         reader = DictReader(csv_file)
#         field_names = reader.fieldnames
    
#         ssn_set = set()

        
#         for row in reader:
#             for header, col_value in row.items():
#                 if header == 'SSN':
#                     ssn_set.add(col_value)
            
#     if ssn in ssn_set:
#         return "<h1> ERROR: SSN exists in the database <h1>"

my = [{'FirstName': 'Pavlos', 'LastName': 'Rousoglou', 'SSN': '1', 'Major': 'CS', 'DOB': '20', 'Address': 'IRV', 'GPA': '3.5'}, {'FirstName': 'Stelios', 'LastName': 'Telios', 'SSN': '1', 'Major': 'CS', 'DOB': '20', 'Address': 'IRV', 'GPA': '3.5'}]

entry = {'FirstName': 'Pavlos', 'LastName': 'Telios', 'SSN': '', 'Major': '', 'DOB': '', 'Address': '', 'GPA': '3.94'}

# for key, value in entry.items():
#     if len(value) > 0:
#         new_db[key] = value
# print(new_db)

# print(len(my.items() & entry.items()))
from datetime import date, datetime


from_date = '2022-09-27'

print(datetime)

date_time_obj = datetime.strptime(from_date, r'%Y-%m-%d').date()


print ("The type of the date is now",  type(date_time_obj))
print ("The date is", date_time_obj)


# with open('studentdb.csv', mode='r') as csv_file:
#     reader = csv.DictReader(csv_file)

#     for row in reader:
#         for key, value in row.items():
#             if key == 'DOB' and (value):
