from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from service import svc
from models.port import Port
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json
from ..crud import BaseCrud
api = Namespace('port',description = 'Port Crud Endpoints')

@api.route("/", methods=['GET','POST'])
class GetPostPort(Resource):
    @cross_origin()
    def get(self):
        return BaseCrud.read('Port')

    @cross_origin()
    def post(self):
        return BaseCrud.create('Port',request.get_json())

@api.route("/<int:page>/<int:size>", methods=['GET','POST'])
@api.route("/<int:page>/<int:size>/<string:sort>/<string:sortColumn>", methods=['GET','POST'])
class PaginatedPort(Resource):
    @cross_origin()
    def get(self,page,size,sort=None,sortColumn=None):
        return BaseCrud.paginated('Port',page,size,sort,sortColumn)

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
        return BaseCrud.record('Port',id)

    @cross_origin()
    def put(self, id):
        return BaseCrud.update('Port', id, request.get_json())


    @cross_origin()
    def delete(self, id):
        return BaseCrud.delete('Port',id)