import hashlib
from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from service import svc
from models.user import User
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity

#api = Namespace('auth',description = 'Authentication Endpoints')

@svc.app.route("/register", methods=["POST"])
def register():
    user : User
    try:
        user = User(**(request.get_json()))
    except svc.db.ValidationError as e:
        return {
            'register' : False,
            'message' : 'There are validation errors: ' + str(e) 
        }
    try:
        if User.objects(username=user.username).count() > 0:
            return {
                'register' : False,
                'message' : 'Username already exists'
            },200
        if User.objects(email=user.email).count() > 0:
            return {
                'register' : False,
                'message' : 'Email already exists'
            },200
        user.password = hashlib.sha256(user.password.encode("utf-8")).hexdigest()
        user.save()
        return {
            'register' : True,
            'message' : 'User was successfully registered'
        }
    except Exception as e:
        return {
            'register' : False,
            'message' : 'An error occured: ' + str(e)
        },200

@cross_origin
@svc.app.route("/login", methods=["POST"])
def login():
    login_details = request.get_json()
    print('LOGIN DETAILS',login_details)
    try:
        user = User.objects.get(username = login_details['username'], password = hashlib.sha256(login_details['password'].encode("utf-8")).hexdigest())
        print(user.username)
        if user:
            token = create_access_token(identity={ 
                'id' : str(user.pk),
                'username' : user.username, 
                'role' : user.role
            })
            return {
                'login' : True,
                'message' : "Successfully logged in",
                'token' : token 
            }, 200
    except Exception as e:
        return {
            'login' : False,
            'message' : 'An error occured: ' + str(e) 
        }, 200
    return {
        'login' : False,
        'message' : 'Wrong User Credentials'
    }, 200

@svc.app.route('/changePassword', methods=['POST'])
@jwt_required()
def changePassword():
    return get_jwt_identity(),200

@svc.app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    return get_jwt_identity(),200