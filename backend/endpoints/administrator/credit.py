from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
from ..crud import BaseCrud
import json
api = Namespace('admin/credit',description = 'Credit Notes Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPost(Resource):
    @cross_origin()
    def get(self):
        return BaseCrud.read('CreditNote')

    @cross_origin()
    def post(self):
        data = json.loads(request.form.to_dict()['data'])
        return BaseCrud.create('CreditNote',data, request.files.to_dict())

@api.route("/<int:page>/<int:size>", methods=['GET','POST'])
@api.route("/<int:page>/<int:size>/<string:sort>/<string:sortColumn>", methods=['GET','POST'])
class Paginated(Resource):
    @cross_origin()
    def get(self,page,size,sort=None,sortColumn=None):
        return BaseCrud.paginated('CreditNote',page,size,sort,sortColumn)

    @cross_origin()
    def post(self,page,size,sort=None,sortColumn=None):
        pass
    
@api.route("/<string:id>", methods=['GET','PUT','DELETE'])
class PutDelete(Resource):

    @cross_origin()
    def get(self, id):
        return BaseCrud.record('CreditNote',id)

    @cross_origin()
    def put(self, id):
        data = json.loads(request.form.to_dict()['data'])
        return BaseCrud.update('CreditNote', id, data, request.files.to_dict() )

    @cross_origin()
    def delete(self, id):
        return BaseCrud.delete('CreditNote',id)