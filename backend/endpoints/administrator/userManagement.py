from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from service import svc
from models.user import User
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json
from ..crud import BaseCrud
api = Namespace('admin/userManagement',description = 'User Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostUserManagement(Resource):
    @cross_origin()
    def get(self):
        return BaseCrud.read('User')

@api.route("/<int:page>/<int:size>", methods=['GET','POST'])
@api.route("/<int:page>/<int:size>/<string:sort>/<string:sortColumn>", methods=['GET','POST'])
class PaginatedUserManagement(Resource):
    @cross_origin()
    def get(self,page,size,sort=None,sortColumn=None):
        return BaseCrud.paginated('User',page,size,sort,sortColumn)

    @cross_origin()
    def post(self,page,size,sort=None,sortColumn=None):
       pass
    
@api.route("/<string:id>", methods=['GET','PUT','DELETE'])
class PutDeleteUserManagement(Resource):

    @cross_origin()
    def get(self, id):
        return BaseCrud.record('User',id)

    @cross_origin()
    def put(self, id):
        data = request.form.to_dict()#request.get_json()
        try:
            
            item = User.objects(pk = id).first()
            item.role = data['role']
            item.validate()
        except svc.db.ValidationError as e:
            return {
                'updated' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200
        try:
            item = User.objects(pk = id).first()
            item.role = data['role']
            item.save()
            return {
                'updated' : True,
                'message' : f'User role successfully updated'
            },200
        except Exception as e:
            print('EXCEPTION',str(e))
            return {
                'updated' : False,
                'message' : 'An error occured: ' + str(e)
            },200


    @cross_origin()
    def delete(self, id):
        return BaseCrud.delete('User',id)