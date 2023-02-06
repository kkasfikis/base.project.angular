from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from ..crud import BaseCrud
from service import svc
from models.agent import Agent
from models.call import Call
from helpers import Helpers
from datetime import datetime
from models.port import Port
from models.client import Client
from models.agent import Agent
from models.vessel import Vessel
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json

api = Namespace('call',description = 'Call Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostCall(Resource):
    @cross_origin()
    def get(self):
        return BaseCrud.read('Call')

    @cross_origin()
    def post(self):
        data = request.get_json()
        #fix date format
        for key in data.keys():
            if type(data[key]) == list:
                for item in data[key]:
                    for k in item.keys():
                        if '.' in item[k]:
                            try:
                                item[k] = datetime.fromisoformat(i.split('.')[0])
                            except:
                                continue
            else:
                if '.' in data[key]:
                    try:
                        data[key] = datetime.fromisoformat(data[key].split('.')[0])
                    except:
                        continue



        # data['estimated_date'] = datetime.fromisoformat(data['estimated_date'].split('.')[0])
        # data['call_entry_date'] = datetime.fromisoformat(data['call_entry_date'].split('.')[0])
        # data['etb'] = datetime.fromisoformat(data['etb'].split('.')[0])
        # data['etc'] = datetime.fromisoformat(data['etc'].split('.')[0])
        # data['ets'] = datetime.fromisoformat(data['ets'].split('.')[0])
        # data['entry_on_progress_date'] = datetime.fromisoformat(data['entry_on_progress_date'].split('.')[0])

        # for item in data['inq1']:
        #     item['arrival_date'] = datetime.fromisoformat(data['arrival_date'].split('.')[0])
        #     item['visa_expiration_date'] = datetime.fromisoformat(data['visa_expiration_date'].split('.')[0])
        #     item['visa_expiration_date'] = datetime.fromisoformat(data['visa_expiration_date'].split('.')[0])
        #     item['departure_date'] = datetime.fromisoformat(data['departure_date'].split('.')[0])

        # for item in data['inq2']:
        #     item['date'] = datetime.fromisoformat(data['date'].split('.')[0])
        #     item['exit_visa_ISS_date'] = datetime.fromisoformat(data['exit_visa_ISS_date'].split('.')[0])
        #     item['exit_visa_application_date'] = datetime.fromisoformat(data['exit_visa_application_date'].split('.')[0])
        #     item['passport_expiration_date'] = datetime.fromisoformat(data['passport_expiration_date'].split('.')[0])
        #     item['hotel_checkin_date'] = datetime.fromisoformat(data['hotel_checkin_date'].split('.')[0])
        #     item['hotel_checkout_date'] = datetime.fromisoformat(data['hotel_checkout_date'].split('.')[0])

  
        
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
        data =  BaseCrud.recordItem('Call',id)
        if data is not None:
            data['port'] = data['port']['$oid']
            data['vessel'] = data['vessel']['$oid']
            data['agent'] = data['agent']['$oid']
            data['client'] = data['client']['$oid']
            print('!!!!!',data['client'])
            return {
                'info' : True,
                'data' : data
            },200
        else:
            return {
                'updated' : False,
                'message' : 'An error occured'
            },200

        

    @cross_origin()
    def put(self, id):
        return BaseCrud.update('Call', id, request.get_json())


    @cross_origin()
    def delete(self, id):
        return BaseCrud.delete('Call',id)