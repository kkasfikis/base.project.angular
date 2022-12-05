from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from backend import svc
from models.user import User
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity

api = Namespace('vessel',description = 'Vessel Crud Endpoints')

@svc.api.route("/", methods=['GET','POST'])
class GetPostVessel(Resource):
    def get(self):
        pass

    def post(self):
        pass

    
@svc.api.route("/<id:string>", methods=['PUT','DELETE'])
class PutDeleteVessel(Resource):
    def put(self, id):
        pass

    def delete(self, id):
        pass