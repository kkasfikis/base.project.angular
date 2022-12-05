from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace
from flask_cors import cross_origin
from backend import svc
from models.client import Client
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json

api = Namespace('client',description = 'Port Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostClient(Resource):

    @cross_origin()
    def get(self):
        try:
            clients = []
            for client in Client.objects:
                tclient = json.loads(client.to_json())
                tclient['_id'] = tclient['_id']['$oid']
                clients.append(tclient)
            
            return {
                'read' : True,
                'data' : clients
            }, 200
        except svc.db.ValidationError as e:
            return {
                'read' : False,
                'message' : 'There are validation errors: ' + str(e) 
            }, 200

    @cross_origin()
    def post(self):
        client : Client
        data = request.get_json()
        data.pop('_id')
        try:
            client = Client(**data)
            client.validate()
        except svc.db.ValidationError as e:
            return {
                'created' : False,
                'message' : 'There are validation errors: ' + str(e) 
            }, 200
            
        try:
            client.save()
            return {
                'created' : True,
                'message' : 'Port successfully created'
            }, 200
        except Exception as e:
            return {
                'created' : False,
                'message' : 'An error occured: ' + str(e)
            }, 200


    
@api.route("/<string:id>", methods=['PUT','DELETE'])
class PutDeleteClient(Resource):

    @cross_origin()
    def put(self, id):
        client : Client
        data = request.get_json()
        data.pop('_id')
        try:
            client = Client(**data)
            client.validate()
        except svc.db.ValidationError as e:
            return {
                'updated' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200

        try:
            client = Client.objects(pk = id).first()
            client.name = data['name']
            client.anchorage = data['anchorage']
            client.notes = data['notes']
            client.weatherLink = data['weatherLink']
            client.save()
            return {
                'updated' : True,
                'message' : 'Port successfully updated'
            },200
        except Exception as e:
            return {
                'updated' : False,
                'message' : 'An error occured: ' + str(e)
            },200


    @cross_origin()
    def delete(self, id):
        client : Client
        try:
            client = Client.objects(pk=id).first()
            if client:
                client.delete()
            return {
                'deleted' : True,
                'message' : 'Port successfully deleted'
            }, 200
        except Exception as e:
            return {
                'deleted' : False,
                'message' : 'An error occured: ' + str(e)
            }, 200