from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from service import svc
from models.agent import Agent
from models.call import Call
from helpers import Helpers
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json

api = Namespace('call',description = 'Agent Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class ReadCreateCall(Resource):
    @cross_origin()
    def get(self):
        try:
            calls = []
            for call in Call.objects:
                tcall = json.loads(call.to_json())
                tcall['_id'] = tcall['_id']['$oid']
                calls.append(tcall)
            return {
                'read' : True,
                'data' : calls
            },200
        except svc.db.ValidationError as e:
            return {
                'read' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200

    @cross_origin()
    def post(self):
        call : Call
        data = request.get_json()
        if '_id' in data:
            data.pop('_id')
        try:
            call = Call(**data)
            call.validate()
        except svc.db.ValidationError as e:
            return {
                'created' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200
            
        try:
            call.save()
            return {
                'created' : True,
                'message' : 'Agent successfully created'
            },200
        except Exception as e:
            return {
                'created' : False,
                'message' : 'An error occured: ' + str(e)
            },200

@api.route("/<int:page>/<int:size>", methods=['GET','POST'])
@api.route("/<int:page>/<int:size>/<string:sort>/<string:sortColumn>", methods=['GET','POST'])
class PaginatedCall(Resource):
    @cross_origin()
    def get(self,page,size,sort=None,sortColumn=None):
        try:
            calls = []
            count = Call.objects.count()
            overflow = False
            if(page * size > count) :
                overflow = True
            for call in Call.objects.skip(page*size).limit(size):
                tcall = json.loads(call.to_json())
                tcall['_id'] = tcall['_id']['$oid']
                calls.append(tcall)
            
            if sort is not None and sort == 'desc' and sortColumn is not None:
                calls.reverse()

            return {
                'read' : True,
                'data' : calls[page * size : page * size + size] if not overflow else calls[0:size],
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
class PutDeleteAgent(Resource):

    @cross_origin()
    def get(self, id):
        try:
            call = json.loads(Call.objects(pk = id).first().to_json())
            call['_id'] = call['_id']['$oid']
            return {
                'info' : True,
                'data' : call
            },200
        except Exception as e:
            print(str(e))
            return {
                'updated' : False,
                'message' : 'An error occured: ' + str(e)
            },200

    @cross_origin()
    def put(self, id):
        call : Call
        call_data : Call
        data = request.get_json()
        if '_id' in data:
            data.pop('_id')
        try:
            call_data = Call(**data)
            call_data.validate()
        except svc.db.ValidationError as e:
            return {
                'updated' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200

        try:
            call = Call.objects(pk = id).first()
            Helpers.copy_object_values(call_data,call)
            return {
                'updated' : True,
                'message' : 'Call successfully updated'
            },200
        except Exception as e:
            return {
                'updated' : False,
                'message' : 'An error occured: ' + str(e)
            },200


    @cross_origin()
    def delete(self, id):
        call : Call
        try:
            call = Call.objects(pk=id).first()
            if call:
                call.delete()
            return {
                'deleted' : True,
                'message' : 'Call successfully deleted'
            },200
        except Exception as e:
            return {
                'deleted' : False,
                'message' : 'An error occured: ' + str(e)
            },200