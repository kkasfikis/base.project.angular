from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from backend import svc
from models.port import Port
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json

api = Namespace('port',description = 'Port Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostPort(Resource):

    @cross_origin()
    def get(self):
        try:
            ports = []
            for port in Port.objects:
                tport = json.loads(port.to_json())
                tport['_id'] = tport['_id']['$oid']
                ports.append(tport)
            
            return {
                'read' : True,
                'data' : ports
            },200
        except svc.db.ValidationError as e:
            return {
                'read' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200

    @cross_origin()
    def post(self):
        port : Port
        data = request.get_json()
        data.pop('_id')
        try:
            port = Port(**data)
            port.validate()
        except svc.db.ValidationError as e:
            return {
                'created' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200
            
        try:
            port.save()
            return {
                'created' : True,
                'message' : 'Port successfully created'
            },200
        except Exception as e:
            return {
                'created' : False,
                'message' : 'An error occured: ' + str(e)
            },200


    
@api.route("/<string:id>", methods=['PUT','DELETE'])
class PutDeletePort(Resource):

    @cross_origin()
    def put(self, id):
        port : Port
        data = request.get_json()
        data.pop('_id')
        try:
            port = Port(**data)
            port.validate()
        except svc.db.ValidationError as e:
            return {
                'updated' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200

        try:
            port = Port.objects(pk = id).first()
            port.name = data['name']
            port.anchorage = data['anchorage']
            port.notes = data['notes']
            port.weatherLink = data['weatherLink']
            port.save()
            return {
                'updated' : True,
                'message' : 'Port successfully created'
            },200
        except Exception as e:
            return {
                'updated' : False,
                'message' : 'An error occured: ' + str(e)
            },200


    @cross_origin()
    def delete(self, id):
        port : Port
        try:
            port = Port.objects(pk=id).first()
            if port:
                port.delete()
            return {
                'deleted' : True,
                'message' : 'Port successfully created'
            },200
        except Exception as e:
            return {
                'deleted' : False,
                'message' : 'An error occured: ' + str(e)
            },200