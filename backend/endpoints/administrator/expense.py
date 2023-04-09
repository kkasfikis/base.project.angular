from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
from ..crud import BaseCrud
import json
api = Namespace('admin/expense',description = 'Expense Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostExpense(Resource):
    @cross_origin()
    def get(self):
        return BaseCrud.read('Expense')

    @cross_origin()
    def post(self):
        return BaseCrud.create('Expense',json.loads(request.form.to_dict()['data']), request.files.to_dict())

@api.route("/<int:page>/<int:size>", methods=['GET','POST'])
@api.route("/<int:page>/<int:size>/<string:sort>/<string:sortColumn>", methods=['GET','POST'])
class PaginatedExpense(Resource):
    @cross_origin()
    def get(self,page,size,sort=None,sortColumn=None):
        return BaseCrud.paginated('Expense',page,size,sort,sortColumn)

    @cross_origin()
    def post(self,page,size,sort=None,sortColumn=None):
        pass
    
@api.route("/<string:id>", methods=['GET','PUT','DELETE'])
class PutDeleteExpense(Resource):

    @cross_origin()
    def get(self, id):
        return BaseCrud.record('Expense',id)

    @cross_origin()
    def put(self, id):
        return BaseCrud.update('Expense', id, json.loads(request.form.to_dict()['data']), request.files.to_dict())


    @cross_origin()
    def delete(self, id):
        return BaseCrud.delete('Expense',id)