from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from ..crud import BaseCrud
from service import svc
from datetime import datetime
from models.agent import Agent
from models.call import Call
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json
from helperFunctions import HelperFunctions

api = Namespace('agent/call',description = 'Call Crud Endpoints')

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
            agent = Agent.objects( agent_user =  user['id'] ).first()
            count = Call.objects(agent =  agent).count()
            if(page * size > count) :
                overflow = True

            calls = None
            if sort != None and sortColumn != None:
                if sort != 'asc':
                    sortColumn = '-' + sortColumn

                calls = Call.objects(agent =  agent).skip(page*size).limit(size).order_by(sortColumn).only('estimated_date','call_entry_date','vessel','vessel_flag','port',
                        'terminal_pisch_rate','terminal_specs','terminal_maintenance_schedule','port_recent_accident',
                        'pilots_availability','other_port_restrictions','military_exercises','warehouse_conditions','ice_concentration',
                        'fog_status','typhoons_expected','holidays','port_document','fishing_boat_risk_status')
            else:
                calls = Call.objects(agent =  agent).skip(page*size).limit(size).only('estimated_date','call_entry_date','vessel','vessel_flag','port',
                        'terminal_pisch_rate','terminal_specs','terminal_maintenance_schedule','port_recent_accident',
                        'pilots_availability','other_port_restrictions','military_exercises','warehouse_conditions','ice_concentration',
                        'fog_status','typhoons_expected','holidays','port_document','fishing_boat_risk_status')
                pass  
            for item in calls:
                titem = json.loads(item.to_json())
                for key in titem.keys():
                    if type(titem[key]) == dict and '$oid' in titem[key]:
                        titem[key] = titem[key]['$oid']
                    if type(titem[key]) == dict and '$date' in titem[key]:
                        titem[key] = datetime.fromtimestamp( titem[key]['$date'] / 1000 ).isoformat()
                items.append(titem)
            
            # if sort is not None and sort == 'desc' and sortColumn is not None:
            #     items.reverse()

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
            item = json.loads(Call.objects(pk = id).only('estimated_date','call_entry_date','vessel','vessel_flag','port',
                       'terminal_pisch_rate','terminal_specs','terminal_maintenance_schedule','port_recent_accident',
                        'pilots_availability','other_port_restrictions','military_exercises','warehouse_conditions','ice_concentration',
                        'fog_status','typhoons_expected','holidays','port_document','fishing_boat_risk_status').first().to_json())
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

    @cross_origin()
    def put(self, id):
        item : any
        data = request.get_json()

        if '_id' in data:
            data.pop('_id')

        HelperFunctions.convertDatesFromISO(data)
        try:
            item = Call.objects(pk = id).first()
            for key in ['terminal_pisch_rate','terminal_specs','terminal_maintenance_schedule','port_recent_accident',
                        'pilots_availability','other_port_restrictions','military_exercises','warehouse_conditions','ice_concentration',
                        'fog_status','typhoons_expected','holidays','port_document','fishing_boat_risk_status']:
                item[key] = data[key]
            item.validate()
        except svc.db.ValidationError as e:
            return {
                'updated' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200
        
        try:    
            item.save()
            return {
                'updated' : True,
                'message' : f'Call successfully updated'
            },200
        except Exception as e:
            return {
                'updated' : False,
                'message' : 'An error occured: ' + str(e)
            },200