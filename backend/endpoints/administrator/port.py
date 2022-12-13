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
                for i in range(20):
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

@api.route("/<int:page>/<int:size>", methods=['GET','POST'])
@api.route("/<int:page>/<int:size>/<string:sort>/<string:sortColumn>", methods=['GET','POST'])
class PaginatedPort(Resource):
    @cross_origin()
    def get(self,page,size,sort=None,sortColumn=None):
        print('SORT COLUMNNNNN : ',sortColumn)
        try:
            ports = []
            count = Port.objects.count()
            overflow = False
            if(page * size > count * 20) :
                overflow = True
            for port in Port.objects: #.skip(page*size).limit(size):
                for i in range(20):
                    tport = json.loads(port.to_json())
                    tport['_id'] = tport['_id']['$oid']
                    tport['name'] = tport['name'] + "_" + str(i)
                    ports.append(tport)
            
            if sort is not None and sort == 'desc' and sortColumn is not None:
                ports.reverse()
            return {
                'read' : True,
                'data' : ports[page * size : page * size + size] if not overflow else ports[0:size],
                'count' : count * 20,
                'overflow' : overflow
            }, 200
        except svc.db.ValidationError as e:
            return {
                'read' : False,
                'message' : 'There are validation errors: ' + str(e) 
            }, 200

    @cross_origin()
    def post(self,page,size,sort=None,sortColumn=None):
        try:
            ports = []
            data = request.get_json()
            print(data)
            count = Port.objects.count()
            overflow = False
            if(page * size > count * 20) :
                overflow = True
            for port in Port.objects: #.skip(page*size).limit(size):
                for i in range(20):
                    tport = json.loads(port.to_json())
                    tport['_id'] = tport['_id']['$oid']
                    tport['name'] = tport['name'] + "_" + str(i)
                    ports.append(tport)
            y = (data['search'][0]).split(':')[1]
            print ('Y:',y)
            ports1 = list(filter(lambda x: (y  in x['name']), ports)) 
            count = len(ports1)
            if sort is not None and sort == 'desc' and sortColumn is not None:
                ports1.reverse()
            ports1 = ports1[page * size : page * size + size] 
            return {
                'read' : True,
                'data' : ports1,
                'count' : count,
                'overflow' : overflow
            }, 200
        except svc.db.ValidationError as e:
            return {
                'read' : False,
                'message' : 'There are validation errors: ' + str(e) 
            }, 200
    
@api.route("/<string:id>", methods=['GET','PUT','DELETE'])
class PutDeletePort(Resource):

    @cross_origin()
    def get(self, id):
        try:
            port = Port.objects(pk = id).first()
            return {
                'info' : True,
                'data' : port
            },200
        except Exception as e:
            return {
                'updated' : False,
                'message' : 'An error occured: ' + str(e)
            },200

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