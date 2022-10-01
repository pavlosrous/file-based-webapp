from flask import Blueprint, request
from website import create_db, add_student, delete_student_by_id, get_student_by_id, get_students, update_student_by_id

views = Blueprint('views', __name__)

# ------------------------------------------------ CREATE DB ------------------------------------------------ #
@views.route('/', methods = ['GET'])
def landing_page():
    return get_students()


# ------------------------------------------------ GET ------------------------------------------------ #
@views.route('/get', methods = ['GET'])
def get_all():
    return get_students()

@views.route('/get/<id>/', methods = ['GET'])
def get_by_id(id):
    return get_student_by_id(id)

# ------------------------------------------------ POST ------------------------------------------------ #
@views.route('/add', methods = ['POST'])
def post_one():
    entry = [request.json['FirstName'], request.json['LastName'],request.json['SSN'],request.json['Major'],request.json['DOB'], request.json['Address'], request.json['GPA']]
    return add_student(entry)



# ------------------------------------------------ UPDATE ------------------------------------------------ #
@views.route('/update/<id>/', methods = ['PUT'])
def update_by_id(id):
    entry = [request.json['FirstName'], request.json['LastName'], request.json['SSN'], request.json['Major'], request.json['DOB'], request.json['Address'], request.json['GPA']]
    return update_student_by_id(id, entry)


@views.route('/delete/<id>/', methods = ['DELETE'])
def delete_by_id(id):
    return delete_student_by_id(id)
    




