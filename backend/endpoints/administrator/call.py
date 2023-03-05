from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from ..crud import BaseCrud
from service import svc
from models.agent import Agent
from models.call import Call
from datetime import datetime
from models.port import Port
from models.client import Client
from models.agent import Agent
from models.vessel import Vessel
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json
from helperFunctions import HelperFunctions

api = Namespace('admin/call',description = 'Call Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostCall(Resource):
    @cross_origin()
    def get(self):
        return BaseCrud.read('Call')

    @cross_origin()
    def post(self):
        return BaseCrud.create('Call',request.get_json())

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
        return BaseCrud.update('Call', id, request.get_json())
    
    @cross_origin()
    def delete(self, id):
        return BaseCrud.delete('Call',id)