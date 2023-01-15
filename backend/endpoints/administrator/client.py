from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace
from flask_cors import cross_origin
from service import svc
from ..crud import BaseCrud
from models.client import Client
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json

api = Namespace('client',description = 'Client Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostClient(Resource):
    @cross_origin()
    def get(self):
        return BaseCrud.read('Client')

    @cross_origin()
    def post(self):
        return BaseCrud.create('Client',request.get_json())

@api.route("/<int:page>/<int:size>", methods=['GET','POST'])
@api.route("/<int:page>/<int:size>/<string:sort>/<string:sortColumn>", methods=['GET','POST'])
class PaginatedClient(Resource):
    @cross_origin()
    def get(self,page,size,sort=None,sortColumn=None):
        return BaseCrud.paginated('Client',page,size,sort,sortColumn)

    @cross_origin()
    def post(self,page,size,sort=None,sortColumn=None):
        pass
    
@api.route("/<string:id>", methods=['GET','PUT','DELETE'])
class PutDeleteClient(Resource):

    @cross_origin()
    def get(self, id):
        return BaseCrud.record('Client',id)

    @cross_origin()
    def put(self, id):
        return BaseCrud.update('Client', id, request.get_json())


    @cross_origin()
    def delete(self, id):
        return BaseCrud.delete('Client',id)