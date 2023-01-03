from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from service import svc
from models.vessel import Vessel
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json

api = Namespace('vessel',description = 'Agent Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostVessel(Resource):
    @cross_origin()
    def get(self):
        try:
            vessels = []
            for vessel in Vessel.objects:
                tvessel = json.loads(vessel.to_json())
                tvessel['_id'] = tvessel['_id']['$oid']
                vessels.append(tvessel)
            
            return {
                'read' : True,
                'data' : vessels
            },200
        except svc.db.ValidationError as e:
            return {
                'read' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200

    @cross_origin()
    def post(self):
        vessel : Vessel
        data = request.get_json()
        if '_id' in data:
            data.pop('_id')
        try:
            vessel = Vessel(**data)
            vessel.validate()
        except svc.db.ValidationError as e:
            return {
                'created' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200
            
        try:
            vessel.save()
            return {
                'created' : True,
                'message' : 'Vessel successfully created'
            },200
        except Exception as e:
            return {
                'created' : False,
                'message' : 'An error occured: ' + str(e)
            },200

@api.route("/<int:page>/<int:size>", methods=['GET','POST'])
@api.route("/<int:page>/<int:size>/<string:sort>/<string:sortColumn>", methods=['GET','POST'])
class PaginatedVessel(Resource):
    @cross_origin()
    def get(self,page,size,sort=None,sortColumn=None):
        try:
            vessels = []
            count = Vessel.objects.count()
            overflow = False
            if(page * size > count) :
                overflow = True
            for vessel in Vessel.objects.skip(page*size).limit(size):
                tvessel = json.loads(vessel.to_json())
                tvessel['_id'] = tvessel['_id']['$oid']
                vessels.append(tvessel)
            
            if sort is not None and sort == 'desc' and sortColumn is not None:
                vessels.reverse()

            return {
                'read' : True,
                'data' : vessels[page * size : page * size + size] if not overflow else vessels[0:size],
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
class PutDeleteVessel(Resource):

    @cross_origin()
    def get(self, id):
        try:
            vessel = Vessel.objects(pk = id).first()
            return {
                'info' : True,
                'data' : vessel
            },200
        except Exception as e:
            return {
                'updated' : False,
                'message' : 'An error occured: ' + str(e)
            },200

    @cross_origin()
    def put(self, id):
        vessel : Vessel
        data = request.get_json()
        if '_id' in data:
            data.pop('_id')
        try:
            vessel = Vessel(**data)
            vessel.validate()
        except svc.db.ValidationError as e:
            return {
                'updated' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200

        try:
            vessel = Vessel.objects(pk = id).first()
            vessel.name = data['name']
            vessel.exName = data['exName']
            vessel.flag = data['flag']
            vessel.phone = data['phone']
            vessel.fax = data['fax']
            vessel.telex = data['telex']
            vessel.email = data['email']
            vessel.SCID = data['SCID']
            vessel.DWT = data['DWT']
            vessel.NRT = data['NRT']
            vessel.BLT = data['BLT']
            vessel.SCNRT = data['SCNRT']
            vessel.LOA = data['LOA']
            vessel.DRAFT = data['DRAFT']
            vessel.BEAM = data['BEAM']
            vessel.SCNT = data['SCNT']
            vessel.SCGT = data['SCGT']
            vessel.pilots = data['pilots']
            vessel.notes = data['notes']
            vessel.image = data['image']
            vessel.tonrate = data['tonrate']
            vessel.save()
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
        vessel : Vessel
        try:
            vessel = Vessel.objects(pk=id).first()
            if vessel:
                vessel.delete()
            return {
                'deleted' : True,
                'message' : 'Vessel successfully deleted'
            },200
        except Exception as e:
            return {
                'deleted' : False,
                'message' : 'An error occured: ' + str(e)
            },200