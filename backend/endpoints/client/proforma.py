from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from ..crud import BaseCrud
from service import svc
from datetime import datetime
from models.client import Client
from models.proforma import Proforma
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json
from helperFunctions import HelperFunctions

api = Namespace('client/proforma',description = 'Call Crud Endpoints')

@api.route("/<int:page>/<int:size>", methods=['GET','POST'])
@api.route("/<int:page>/<int:size>/<string:sort>/<string:sortColumn>", methods=['GET','POST'])
class PaginatedCaptainCall(Resource):
    @cross_origin()
    @jwt_required()
    def get(self,page,size,sort=None,sortColumn=None):
        user = get_jwt_identity()
        try:
            items = []
            overflow = False
            client = Client.objects( client_user =  user['id'] ).first()
            count = Proforma.objects(client =  client).count()
            if(page * size > count) :
                overflow = True

            calls = None
            if sort != None and sortColumn != None:
                if sort != 'asc':
                    sortColumn = '-' + sortColumn

                calls = Proforma.objects(client =  client).skip(page*size).limit(size).order_by(sortColumn)
            else:
                calls = Proforma.objects(client =  client).skip(page*size).limit(size)
                pass  
            for item in calls:
                titem = json.loads(item.to_json())
                for key in titem.keys():
                    if type(titem[key]) == dict and '$oid' in titem[key]:
                        titem[key] = titem[key]['$oid']
                    if type(titem[key]) == dict and '$date' in titem[key]:
                        titem[key] = datetime.fromtimestamp( titem[key]['$date'] / 1000 ).isoformat()
                items.append(titem)
            
            return {
                'read' : True,
                'data' : items,
                'count' : count,
                'overflow' : overflow
            }, 200
        except svc.db.ValidationError as e:
            return {
                'read' : False,
                'message' : 'There are validation errors: ' + str(e) 
            }, 200

    @cross_origin()
    def post(self,page,size,sort=None,sortColumn=None):
        pass
    
@api.route("/<string:id>", methods=['GET','PUT','DELETE'])
class PutDeleteCaptainCall(Resource):

    @cross_origin()
    def get(self, id):
        try:
            item = json.loads(Proforma.objects(pk = id).first().to_json())
            for key in item.keys():
                if type(item[key]) == dict and '$oid' in item[key]:
                    item[key] = item[key]['$oid']
                if type(item[key]) == dict and '$date' in item[key]:
                    item[key] = datetime.fromtimestamp(item[key]['$date'] / 1000 ).isoformat()
            return {
                'info' : True,
                'data' : item
            },200
        except Exception as e:
            return {
                'updated' : False,
                'message' : 'An error occured: ' + str(e)
            },200
