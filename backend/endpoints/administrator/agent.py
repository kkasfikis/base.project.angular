from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from service import svc
from models.agent import Agent
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json

api = Namespace('agent',description = 'Agent Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostAgent(Resource):
    @cross_origin()
    def get(self):
        try:
            agents = []
            for agent in Agent.objects:
                tagent = json.loads(agent.to_json())
                tagent['_id'] = tagent['_id']['$oid']
                agents.append(tagent)
            
            return {
                'read' : True,
                'data' : agents
            },200
        except svc.db.ValidationError as e:
            return {
                'read' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200

    @cross_origin()
    def post(self):
        agent : Agent
        data = request.get_json()
        if '_id' in data:
            data.pop('_id')
        try:
            agent = Agent(**data)
            agent.validate()
        except svc.db.ValidationError as e:
            return {
                'created' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200
            
        try:
            agent.save()
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
class PaginatedAgent(Resource):
    @cross_origin()
    def get(self,page,size,sort=None,sortColumn=None):
        try:
            agents = []
            count = Agent.objects.count()
            overflow = False
            if(page * size > count) :
                overflow = True
            for agent in Agent.objects.skip(page*size).limit(size):
                tagent = json.loads(agent.to_json())
                tagent['_id'] = tagent['_id']['$oid']
                agents.append(tagent)
            
            if sort is not None and sort == 'desc' and sortColumn is not None:
                agents.reverse()

            return {
                'read' : True,
                'data' : agents[page * size : page * size + size] if not overflow else agents[0:size],
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
            agent = Agent.objects(pk = id).first()
            return {
                'info' : True,
                'data' : agent
            },200
        except Exception as e:
            return {
                'updated' : False,
                'message' : 'An error occured: ' + str(e)
            },200

    @cross_origin()
    def put(self, id):
        agent : Agent
        data = request.get_json()
        if '_id' in data:
            data.pop('_id')
        try:
            agent = Agent(**data)
            agent.validate()
        except svc.db.ValidationError as e:
            return {
                'updated' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200

        try:
            agent = Agent.objects(pk = id).first()
            agent.name = data['name']
            agent.phone = data['phone']
            agent.fax = data['fax']
            agent.email = data['email']
            agent.notes = data['notes']
            agent.peopleInCharge = data['peopleInCharge']
            agent.port = data['port']
            agent.save()
            return {
                'updated' : True,
                'message' : 'Agent successfully updated'
            },200
        except Exception as e:
            return {
                'updated' : False,
                'message' : 'An error occured: ' + str(e)
            },200


    @cross_origin()
    def delete(self, id):
        agent : Agent
        try:
            agent = Agent.objects(pk=id).first()
            if agent:
                agent.delete()
            return {
                'deleted' : True,
                'message' : 'Agent successfully deleted'
            },200
        except Exception as e:
            return {
                'deleted' : False,
                'message' : 'An error occured: ' + str(e)
            },200