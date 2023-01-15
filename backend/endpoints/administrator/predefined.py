from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from service import svc
from models.port import Port
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json
from ..crud import BaseCrud
api = Namespace('predefined',description = 'Predefined Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostPredefined(Resource):
    @cross_origin()
    def get(self):
        return BaseCrud.read('Predefined')

    @cross_origin()
    def post(self):
        return BaseCrud.create('Predefined',request.get_json())

@api.route("/<int:page>/<int:size>", methods=['GET','POST'])
@api.route("/<int:page>/<int:size>/<string:sort>/<string:sortColumn>", methods=['GET','POST'])
class PaginatedPredefined(Resource):
    @cross_origin()
    def get(self,page,size,sort=None,sortColumn=None):
        return BaseCrud.paginated('Predefined',page,size,sort,sortColumn)

    @cross_origin()
    def post(self,page,size,sort=None,sortColumn=None):
        pass
    
@api.route("/<string:id>", methods=['GET','PUT','DELETE'])
class PutDeletePredefined(Resource):

    @cross_origin()
    def get(self, id):
        return BaseCrud.record('Predefined',id)

    @cross_origin()
    def put(self, id):
        return BaseCrud.update('Predefined', id, request.get_json())


    @cross_origin()
    def delete(self, id):
        return BaseCrud.delete('Predefined',id)