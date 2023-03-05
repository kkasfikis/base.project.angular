from flask import jsonify, request, current_app
from flask_restx import Resource,Namespace
from flask_cors import cross_origin
import models
import json
from service import svc
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity

@svc.app.route("/getAttributeList", methods=["GET"])
def getAttributeList():
    args = request.args
    mode = args.get('mode') if 'mode' in args else None
    attribute = args.get('attribute')
    class_name = args.get('class_name')
    collection = getattr(models,class_name)
    try:
        items = []
        if mode is not None:
            fields = ['id']
            
            if ',' in attribute:
                for attr in attribute.split(','):
                    fields.append(attr)
            else:
                fields.append(attribute)

            for item in collection.objects().only(*fields):
                tItem = json.loads(item.to_json())
                tItem['_id'] = tItem['_id']['$oid']
                items.append(tItem)
        else:
            items = collection.objects().distinct(attribute)
            
        return {
            'attribute' : True,
            'data' : items
        },200
    except Exception as e:
        return {
            'attribute' : False,
            'message' : 'An error occured: ' + str(e)
        },200

@svc.app.route("/getSingleAttribute", methods=["GET"])
def getSingleAttribute():
    args = request.args
    mode = args.get('mode') if 'mode' in args else None
    attribute = args.get('attribute')
    class_name = args.get('class_name')
    id = args.get('id')
    collection = getattr(models,class_name)
    try:
        fields = ['id',attribute]
        item = json.loads(collection.objects(pk = id).only(*fields).first().to_json())
        item['_id'] = item['_id']['$oid']
            
        return {
            'attribute' : True,
            'data' : item
        },200
    except Exception as e:
        return {
            'attribute' : False,
            'message' : 'An error occured: ' + str(e)
        },200

@svc.app.route("/queryByValue", methods=["POST"])
def queryByValue():
    data = request.get_json()
    class_name = data['class_name']
    query = data['query']
    collection = getattr(models,class_name)
    try:
        results = list(collection.objects(**query))
        data = [json.loads(x.to_json()) for x in results] 
        for x in data:
            x['_id'] = x['_id']['$oid']
        return {
            'query' : True,
            'data' : data
        },200
    except Exception as e:
        return {
            'query' : False,
            'message' : 'An error occured: ' + str(e)
        },200