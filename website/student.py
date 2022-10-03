import json
from uuid import uuid1, uuid4
import pandas as pd
import csv
import uuid 


def create_db():
        with open('studentdb.csv', mode='a') as csv_file:
                column_names = ['Student_ID','FirstName', 'LastName', 'SSN', 'Major', 'DOB', 'Address', 'GPA']
                csv_writer = csv.DictWriter(csv_file, fieldnames=column_names)
                csv_writer.writeheader()
                id_1 = str(uuid.uuid4()).split('-')[0]
                id_2 = str(uuid.uuid4()).split('-')[0]

                # confirm they are not the same
                while (id_1 == id_2 ):
                        id_1 = str(uuid.uuid4()).split('-')[0]
                        id_2 = str(uuid.uuid4()).split('-')[0]
                
                
                intial_data = [{'Student_ID': id_1, 'FirstName':'Pavlos', 'LastName':'Rousoglou', 'SSN':'121-139-912', 'Major':'CS', 'DOB':'1998-07-09',
                 'Address':'22 Irving St, MA, 02812', 'GPA':'3.95'},{'Student_ID': id_2,'FirstName':'Stelios', 'LastName':'Rousoglou', 'SSN':'109-091-6212', 'Major':'CS', 'DOB':'2000-07-16',
                 'Address':'127 Saint Clemens Rd', 'GPA':'3.4'}]

                csv_writer.writerows(intial_data)

def unique_id():
        with open('studentdb.csv', mode='r+') as csv_file:
                reader = csv.DictReader(csv_file)
                field_names = reader.fieldnames
                
                new_id = str(uuid.uuid4()).split('-')[0]

                id_set = set()

                
                for row in reader:
                        for header, col_value in row.items():
                                id_set.add(col_value)
                                break
                        
                while(new_id in id_set):
                        new_id = str(uuid.uuid4()).split('-')[0]

                return new_id

#     df = pd.DataFrame() 
#     names = [['Pavlos', 'Rousoglou', '121-139-912', 'CS', '1998-07-09', '22 Irving St, MA, 02812', '3.95'],
#             ['Stelios', 'Rousoglou', '109-091-621', 'CS', '2000-07-16', '127 Saint Clemens Rd, MA, 02123', '3.6']]

#     df = pd.DataFrame(names, columns=['FirstName', 'LastName', 'SSN', 'Major', 'DOB', 'Address', 'GPA'])
#     df.index.name = "Student_ID"
#     df.to_csv('file_name.csv', index=False)
#     print(df)
create_db()

with open('studentdb.csv', mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        print(f'\t{row["FirstName"]} works in the {row["LastName"]} department, and was born in {row["SSN"]}.')
        line_count += 1
    print(f'Processed {line_count} lines.')

jsonArray = []
with open('studentdb.csv', encoding='utf-8') as csvf: 
        #load csv file data using csv library's dictionary reader
        csvReader = csv.DictReader(csvf) 

        #convert each csv row into python dict
        for row in csvReader: 
                #add this python dict to json array
                jsonArray.append(row)
print(jsonArray)