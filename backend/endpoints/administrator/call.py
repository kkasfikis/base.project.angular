from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from ..crud import BaseCrud
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json

api = Namespace('admin/call',description = 'Call Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostCall(Resource):
    @cross_origin()
    def get(self):
        return BaseCrud.read('Call')

    @cross_origin()
    def post(self):
        return BaseCrud.create('Call',json.loads(request.form.to_dict()['data']), request.files.to_dict())

@api.route("/<int:page>/<int:size>", methods=['GET','POST'])
@api.route("/<int:page>/<int:size>/<string:sort>/<string:sortColumn>", methods=['GET','POST'])
class PaginatedCall(Resource):
    @cross_origin()
    def get(self,page,size,sort=None,sortColumn=None):
        return BaseCrud.paginated('Call',page,size,sort,sortColumn)

    @cross_origin()
    def post(self,page,size,sort=None,sortColumn=None):
        pass
    
@api.route("/<string:id>", methods=['GET','PUT','DELETE'])
class PutDeleteCall(Resource):

    @cross_origin()
    def get(self, id):
        return BaseCrud.record('Call',id)

    @cross_origin()
    def put(self, id):
        print('call create', json.loads(request.form.to_dict()['data']))
        print('call update', request.files.to_dict())
        return BaseCrud.update('Call', id,json.loads(request.form.to_dict()['data']), request.files.to_dict())
    
    @cross_origin()
    def delete(self, id):
        return BaseCrud.delete('Call',id)