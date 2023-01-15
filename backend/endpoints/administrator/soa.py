from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from service import svc
from models.port import Port
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json
from ..crud import BaseCrud
api = Namespace('soa',description = 'SOA Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostBankSOA(Resource):
    @cross_origin()
    def get(self):
        return BaseCrud.read('StatementOfAccount')

    @cross_origin()
    def post(self):
        return BaseCrud.create('StatementOfAccount',request.get_json())

@api.route("/<int:page>/<int:size>", methods=['GET','POST'])
@api.route("/<int:page>/<int:size>/<string:sort>/<string:sortColumn>", methods=['GET','POST'])
class PaginatedSOA(Resource):
    @cross_origin()
    def get(self,page,size,sort=None,sortColumn=None):
        return BaseCrud.paginated('StatementOfAccount',page,size,sort,sortColumn)

    @cross_origin()
    def post(self,page,size,sort=None,sortColumn=None):
        pass
    
@api.route("/<string:id>", methods=['GET','PUT','DELETE'])
class PutDeleteSOA(Resource):

    @cross_origin()
    def get(self, id):
        return BaseCrud.record('StatementOfAccount',id)

    @cross_origin()
    def put(self, id):
        return BaseCrud.update('StatementOfAccount', id, request.get_json())


    @cross_origin()
    def delete(self, id):
        return BaseCrud.delete('BankAccount',id)