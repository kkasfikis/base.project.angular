import json
import bson
import io
import base64
import models
from service import svc
from helperFunctions import HelperFunctions
from datetime import datetime
class BaseCrud:
    @staticmethod
    def read(class_name : str):
        try:
            collection = getattr(models,class_name)
            items = []
            for item in collection.objects:
                titem = json.loads(item.to_json())
                for key in titem.keys():
                    if type(titem[key]) == dict and '$oid' in titem[key]:
                        titem[key] = titem[key]['$oid']
                    if type(titem[key]) == dict and '$date' in titem[key]:
                        titem[key] = datetime.fromtimestamp(titem[key]['$date'] / 1000 ).isoformat()
                items.append(titem)                    
            return {
                'read' : True,
                'data' : items
            },200
        except svc.db.ValidationError as e:
            return {
                'read' : False,
                'message' : 'Errors: ' + str(e) 
            },200

    @staticmethod
    def paginated(class_name : str, page : int, size : int, sort : str = None, sort_column : str = None):
        try:
            collection = getattr(models,class_name)
            items = []
            count = collection.objects.count()
            overflow = False
            if(page * size > count) :
                overflow = True

                
            for item in collection.objects.skip(page*size).limit(size):
                titem = json.loads(item.to_json())
                for key in titem.keys():
                    if type(titem[key]) == dict and '$oid' in titem[key]:
                        if key != '_id' and '_file' not in key:
                            titem[key] = item[key].to_mongo().to_dict()
                            for skey in titem[key].keys():
                                if type(titem[key][skey]) == bson.objectid.ObjectId :
                                    titem[key][skey] = str(titem[key][skey])    
                        else:
                            if key == '_id':
                                titem['_id'] = titem['_id']['$oid']
                            else:
                                titem[key] = base64.b64encode(item[key].read()).decode('ascii')
                                print('b64',titem[key][0:100])
                    if type(titem[key]) == dict and '$date' in titem[key]:
                        titem[key] = datetime.fromtimestamp( titem[key]['$date'] / 1000 ).isoformat()
                items.append(titem)
            
            if sort is not None and sort == 'desc' and sort_column is not None:
                items.reverse()

            return {
                'read' : True,
                'data' : items,
                'count' : count,
                'overflow' : overflow
            }, 200
        except Exception as e:
            print('PAGINATED EXCEPTION',str(e))
            return {
                'read' : False,
                'message' : 'There are validation errors: ' + str(e) 
            }, 200

    @staticmethod
    def search():
        pass

    @staticmethod
    def recordItem(class_name : str, id : str):
        try:
            collection = getattr(models,class_name)
            item = collection.objects(pk = id).first()
            titem = json.loads(item.to_json()) 
            titem['_id'] = titem['_id']['$oid']
            for key in titem.keys():
                if type(titem[key]) == dict and '$oid' in titem[key]:
                    titem[key] = item[key].to_mongo().to_dict()
                    for skey in titem[key].keys():
                        if type(titem[key][skey]) == bson.objectid.ObjectId :
                            titem[key][skey] = str(titem[key][skey])
                    
            return titem
        except Exception as e:
            return None

    @staticmethod
    def record(class_name : str, id : str):
        try:
            collection = getattr(models,class_name)
            item = collection.objects(pk = id).first()
            titem = json.loads(item.to_json()) 
            titem['_id'] = titem['_id']['$oid']
            for key in titem.keys():
                print(type(titem[key]))
                if '_file' in key:
                    print('file in read',key)
                    titem[key] = base64.b64encode(item[key].read()).decode('ascii')
                    print('b64',titem[key][0:100]) 
                elif type(titem[key]) == list: #check if array
                    index = 0
                    for tmp in titem[key]:
                        if type(tmp) == dict:
                            for k in tmp.keys():
                                if '_file' in k:
                                    titem[key][index][k] = base64.b64encode(item[key][index][k].read()).decode('ascii')
                        index = index + 1
                else:
                    if type(titem[key]) == dict and '$oid' in titem[key]:
                        titem[key] = item[key].to_mongo().to_dict()
                        for skey in titem[key].keys():
                            if type(titem[key][skey]) == bson.objectid.ObjectId :
                                titem[key][skey] = str(titem[key][skey])
            return {
                'info' : True,
                'data' : titem
            },200
        except Exception as e:
            print('READ EXCEPTION',str(e))
            return {
                'updated' : False,
                'message' : 'An error occured: ' + str(e)
            },200

    @staticmethod
    def create(class_name : str, data : dict, files = None):
        item : any
        collection = getattr(models,class_name)
        if '_id' in data:
            data.pop('_id')
        
        HelperFunctions.convertDatesFromISO(data)

        subform_files = []

        if files is not None: 
            for key in files.keys():
                if '.' in key:
                    key_parts = key.split('.')
                    subform_files.append({
                        'subform' : key_parts[0],
                        'subform_index' : int(key_parts[1]),
                        'subform_field' : key_parts[2],
                        'file_value' : files[key]
                    })
                else:
                    data[key] = files[key]

        try:
            item = collection(**data)
            for file in subform_files:
                item[file['subform']][file['subform_index']][file['subform_field']].put(file['file_value'])
            item.validate()
        except svc.db.ValidationError as e:
            return {
                'created' : False,
                'message' : 'Error: ' + str(e) 
            },200
            
        try:
            item.save()
            return {
                'created' : True,
                'message' : f'{class_name} successfully created'
            },200
        except Exception as e:
            return {
                'created' : False,
                'message' : 'An error occured: ' + str(e)
            },200

    @staticmethod
    def update(class_name:str, id:str, data: dict, files = None):
       
        item : any
        item_data : any
        collection = getattr(models,class_name)
        if '_id' in data:
            data.pop('_id')

        HelperFunctions.convertDatesFromISO(data)
        
        if files is not None: 
            for key in files.keys():
                if '.' in key:
                    key_parts = key.split('.')
                    data[key_parts[0]][int(key_parts[1])][key_parts[2]] = files[key]
                else:
                    data[key] = files[key]

        try:
            item_data = collection(**data)
            item_data.validate()
        except svc.db.ValidationError as e:
            return {
                'updated' : False,
                'message' : 'There are validation errors: ' + str(e) 
            },200
        try:
            item = collection.objects(pk = id).first()
            HelperFunctions.copy_object_values(item_data,item)
            item.save()
            return {
                'updated' : True,
                'message' : f'{class_name} successfully updated'
            },200
        except Exception as e:
            return {
                'updated' : False,
                'message' : 'An error occured: ' + str(e)
            },200

    @staticmethod
    def delete(class_name:str,id:str):
        item : any
        collection = getattr(models,class_name)
        try:
            item = collection.objects(pk=id).first()
            if item:
                item.delete()
            return {
                'deleted' : True,
                'message' : f'{class_name} successfully created'
            },200
        except Exception as e:
            return {
                'deleted' : False,
                'message' : 'An error occured: ' + str(e)
            },200
