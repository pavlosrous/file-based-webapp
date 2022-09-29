from uuid import uuid1, uuid4
import pandas as pd
import uuid 


def create_db():
    df = pd.DataFrame()
    names = [['Pavlos', 'Rousoglou', '121-139-912', 'CS', '1998-07-09', '22 Irving St, MA, 02812', '3.95'],
            ['Stelios', 'Rousoglou', '109-091-621', 'CS', '2000-07-16', '127 Saint Clemens Rd, MA, 02123', '3.6']]

    df = pd.DataFrame(names, columns=['FirstName', 'LastName', 'SSN', 'Major', 'DOB', 'Address', 'GPA'])
    df.index.name = "Student_ID"
    df.to_csv('file_name.csv', index=False)
    print(df)