from csv import DictReader
import csv
from distutils.command.install_egg_info import to_filename
import uuid
import json

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

from tempfile import NamedTemporaryFile
import shutil

my_student =  {"Student_ID": "686a1c4e","FirstName": "Test","LastName": "Rousoglou","SSN": "213-313-623","Major": "CS",
"DOB": "2000-04-14","Address": "22 Irving St, MA, 02912","GPA": "4.0"}
temp_file = NamedTemporaryFile(mode='a', delete=True)

with open('studentdb.csv', mode='r') as csv_file, temp_file:
    reader = csv.DictReader(csv_file, fieldnames=column_names)
    writer = csv.DictWriter(temp_file, fieldnames=column_names)
    writer.writeheader()
    for row in reader:
        if row['Student_ID'] != '686a1c4e' and row['SSN'] == '213-313-623':
            print('<h1>ERROR: SSN exists in the database</h1>')
        elif row['Student_ID'] == '686a1c4e':
            row['FirstName'], row['LastName'], row['SSN'], row['Major'], row['DOB'], row['Address'], row['GPA'] = "Test", "Test", "Test", "Test", "Test", "Test", "Test"
        row  = {'Student_ID':'686a1c4e' ,"FirstName": row['FirstName'],'LastName' : row['LastName'],'SSN': row['SSN'],'Major': row['Major'],'DOB': row['DOB'],'Address': row['Address'], 'GPA':row['GPA']}
        print(row)
        writer.writerow(row)    
        
shutil.move(temp_file.name, 'studentdb.csv')
            
