from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from helperFunctions import HelperFunctions
from service import svc
from models.port import Port
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json
from ..crud import BaseCrud
api = Namespace('admin/proforma',description = 'proforma Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostProforma(Resource):
    @cross_origin()
    def get(self):
        return BaseCrud.read('Proforma')

    @cross_origin()
    def post(self):
        return BaseCrud.create('Proforma',request.get_json())

@api.route("/<int:page>/<int:size>", methods=['GET','POST'])
@api.route("/<int:page>/<int:size>/<string:sort>/<string:sortColumn>", methods=['GET','POST'])
class PaginatedProforma(Resource):
    @cross_origin()
    def get(self,page,size,sort=None,sortColumn=None):
        return BaseCrud.paginated('Proforma',page,size,sort,sortColumn)

    @cross_origin()
    def post(self,page,size,sort=None,sortColumn=None):
        pass
    
@api.route("/<string:id>", methods=['GET','PUT','DELETE'])
class PutDeleteProforma(Resource):

    @cross_origin()
    def get(self, id):
        return BaseCrud.record('Proforma',id)

    @cross_origin()
    def put(self, id):
        return BaseCrud.update('Proforma', id, request.get_json())


    @cross_origin()
    def delete(self, id):
        return BaseCrud.delete('Proforma',id)