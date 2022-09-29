from flask import Blueprint, request
from website import create_db, add_student, delete_student_by_id, get_student_by_id, get_students, update_student_by_id

views = Blueprint('views', __name__)

# ------------------------------------------------ CREATE DB ------------------------------------------------ #
@views.route('/', methods = ['GET'])
def landing_page():
    create_db()
    return "pavlos rousoglou"


# ------------------------------------------------ GET ------------------------------------------------ #
@views.route('/get', methods = ['GET'])
def get_all():
    df = get_students()
    return df

@views.route('/get/<id>/', methods = ['GET'])
def get_by_id(id):
    try:
        int_id = int(id)
    except ValueError:
        return "<h1> ERROR: Student ID is an integer <h1>"

    return get_student_by_id(int_id)

# ------------------------------------------------ POST ------------------------------------------------ #
@views.route('/add', methods = ['POST'])
def post_one():
    entry = [request.json['FirstName'], request.json['LastName'], request.json['SSN'], request.json['Major'], request.json['DOB'], request.json['Address'], request.json['GPA']]
    return add_student(entry)



# ------------------------------------------------ UPDATE ------------------------------------------------ #
@views.route('/update/<id>/', methods = ['PUT'])
def update_by_id(id):
    try:
        int_id = int(id)
    except ValueError:
        return "<h1> ERROR: Student ID is an integer <h1>"
    entry = [request.json['FirstName'], request.json['LastName'], request.json['SSN'], request.json['Major'], request.json['DOB'], request.json['Address'], request.json['GPA']]
    return update_student_by_id(int_id, entry)


@views.route('/delete/<id>/', methods = ['DELETE'])
def delete_by_id(id):
    try:
        int_id = int(id)
    except ValueError:
        return "<h1> ERROR: Student ID is an integer <h1>"
    return delete_student_by_id(int_id)
    




