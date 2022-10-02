import json
from os import abort
from flask import Blueprint, request, abort, jsonify, make_response
from website import create_db, add_student, delete_student_by_id, find_student_by_all, find_student_by_any, get_student_by_id, get_students, get_students_drange, update_student_by_id

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

# This is a fake post, in reality it is a get. We are using post because GET cannot have a payload
@views.route('/get/and', methods=['POST'])
def get_by_and():
    entry = {'FirstName':request.json['FirstName'],'LastName': request.json['LastName'],'SSN': request.json['SSN'],'Major':request.json['Major'],'DOB':request.json['DOB'], 'Address':request.json['Address'],'GPA': request.json['GPA']}
    return find_student_by_all(entry)

@views.route('/get/or', methods=['POST'])
def get_by_or():
    print(request)
    entry = {'FirstName':request.json['FirstName'],'LastName': request.json['LastName'],'SSN': request.json['SSN'],'Major':request.json['Major'],'DOB':request.json['DOB'], 'Address':request.json['Address'],'GPA': request.json['GPA']}
    print(entry)
    return find_student_by_any(entry)

@views.route('/get/drange/<from_d>/<to>', methods=['GET'])
def get_student_between_drange(from_d, to):
    print('hello')
    return get_students_drange(from_d, to)
    

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
    print(id)
    return delete_student_by_id(id)

# @views.errorhandler(400)
# def custom400(error):
#     make_response(jsonify(error), 400)


    




