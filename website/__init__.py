from importlib.metadata import entry_points
from nturl2path import url2pathname
from flask import Flask
import pandas as pd
from datetime import datetime
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    # app.config['SECRET_KEY'] = 'aka@Very100Complex'
    CORS(app)

# import blueprints
    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix = '/')
    app.register_blueprint(auth, url_prefix = '/')

    return app

# Initialize DB with some sample entries
def create_db():
    df = pd.DataFrame()
    names = [['Pavlos', 'Rousoglou', '121-139-912', 'CS', '1998-07-09', '22 Irving St, MA, 02812', '3.95'],
            ['Stelios', 'Rousoglou', '109-091-621', 'CS', '2000-07-16', '127 Saint Clemens Rd, MA, 02123', '3.6']]

    df = pd.DataFrame(names, columns=['FirstName', 'LastName', 'SSN', 'Major', 'DOB', 'Address', 'GPA'])
    df.index.name = "Student_ID"
    df.to_csv('file_name.csv', index=True)
    print('created a db')

# Get all students
def get_students():
    df = pd.read_csv ('file_name.csv', index_col='Student_ID')
    df.reset_index(inplace=True) 
    return df.to_json(orient = 'records', index = True)

# Get student by ID
def get_student_by_id(id):
    df = pd.read_csv ('file_name.csv', index_col='Student_ID')
    df.reset_index(inplace=True) # for index to show when returning the json
    return df.loc[ df.index == id ].to_json(orient='records', index = True)

# Add student
def add_student(entry):
    df = pd.read_csv ('file_name.csv', index_col='Student_ID')

    if entry[2] in df['SSN'].values:
        return "<h1> ERROR: SSN exists in the database <h1>"

    try:
        entry[4] = datetime.strptime(entry[4], '%Y-%m-%d').date()
    except Exception:
        raise Exception("Format of date is invalid. Please add the date of birth like this YYYY-MM-DD")

    df.loc[len(df.index)] = entry
    df.to_csv('file_name.csv', index=True)

    df.reset_index(inplace=True) # for index to show when returning the json
    return df.to_json(orient='records', index = True)

# Update student by id
def update_student_by_id(id, entry):
    df = pd.read_csv ('file_name.csv', index_col='Student_ID')

    if entry[2] in df['SSN'].values:
        return "<h1> ERROR: SSN exists in the database <h1>"
    try:
        entry[4] = datetime.strptime(entry[4], '%Y-%m-%d').date()
    except Exception:
        raise Exception("Format of date is invalid. Please add the date of birth like this YYYY-MM-DD")

    df.loc[ df.index == id ] = entry
    df.to_csv('file_name.csv', index=True)

    df.reset_index(inplace=True) # for index to show when returning the json
    return df.to_json(orient='records', index = True)
    

def delete_student_by_id(id):
    df = pd.read_csv ('file_name.csv', index_col='Student_ID')
    df = df.drop(id)
    df.to_csv('file_name.csv', index=True)
    
    df.reset_index(inplace=True) # for index to show when returning the json
    return df.to_json(orient='records', index = True)
