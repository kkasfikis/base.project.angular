from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json
from ..crud import BaseCrud
from helperFunctions import HelperFunctions
api = Namespace('admin/breakdown',description = 'Breakdown List Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostBreakdown(Resource):
    @cross_origin()
    def get(self):
        return BaseCrud.read('Breakdown')

    @cross_origin()
    def post(self):
        data = json.loads(request.form.to_dict()['data'])
        data.pop('call_estimated_date')
        data.pop('call_client')
        data.pop('call_client_alias')
        data.pop('call_vessel')
        data.pop('call_vessel_flag')
        data.pop('call_port')
        data.pop('proforma_no')
        return BaseCrud.create('Breakdown',data, request.files.to_dict())

@api.route("/<int:page>/<int:size>", methods=['GET','POST'])
@api.route("/<int:page>/<int:size>/<string:sort>/<string:sortColumn>", methods=['GET','POST'])
class PaginatedBreakdown(Resource):
    @cross_origin()
    def get(self,page,size,sort=None,sortColumn=None):
        return BaseCrud.paginated('Breakdown',page,size,sort,sortColumn)

    @cross_origin()
    def post(self,page,size,sort=None,sortColumn=None):
        pass
    
@api.route("/<string:id>", methods=['GET','PUT','DELETE'])
class PutDeleteBreakdown(Resource):

    @cross_origin()
    def get(self, id):
        return BaseCrud.record('Breakdown',id)

    @cross_origin()
    def put(self, id):
        data = json.loads(request.form.to_dict()['data'])
        data.pop('call_estimated_date')
        data.pop('call_client')
        data.pop('call_client_alias')
        data.pop('call_vessel')
        data.pop('call_vessel_flag')
        data.pop('call_port')
        data.pop('proforma_no')
        return BaseCrud.update('Breakdown', id, data, request.files.to_dict())


    @cross_origin()
    def delete(self, id):
        return BaseCrud.delete('Breakdown',id)