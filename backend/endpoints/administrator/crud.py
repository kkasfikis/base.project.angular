from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace
from flask_cors import cross_origin
from service import svc
from ..crud import BaseCrud
from models.client import Client
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json

api = Namespace('crud',description = 'Client Crud Endpoints')
@api.route("/<string:collection>/<string:attribute>", methods=['GET','POST'])
@api.route("/<string:collection>/<string:attribute>/<string:mode>", methods=['GET','POST'])
class GetCrud(Resource):
    @cross_origin()
    def get(self,collection,attribute,mode = None):
        return BaseCrud.getAttribute(collection,attribute,mode)
