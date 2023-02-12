import json
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
                        titem[key] = titem[key]['$oid']
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
        except svc.db.ValidationError as e:
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
            item = json.loads(collection.objects(pk = id).first().to_json())
            for key in item.keys():
                if type(item[key]) == dict and '$oid' in item[key]:
                    item[key] = item[key]['$oid']
                if type(item[key]) == dict and '$date' in item[key]:
                    item[key] = datetime.fromtimestamp(item[key]['$date'] / 1000 ).isoformat()
            return item
        except Exception as e:
            print(str(e))
            return None

    @staticmethod
    def record(class_name : str, id : str):
        try:
            collection = getattr(models,class_name)
            item = json.loads(collection.objects(pk = id).first().to_json())
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

    @staticmethod
    def create(class_name : str, data : dict):
        item : any
        collection = getattr(models,class_name)
        if '_id' in data:
            data.pop('_id')
        
        HelperFunctions.convertDatesFromISO(data)

        try:
            item = collection(**data)
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
    def update(class_name:str, id:str, data:dict):
        item : any
        item_data : any
        collection = getattr(models,class_name)
        if '_id' in data:
            data.pop('_id')

        HelperFunctions.convertDatesFromISO(data)

        try:
            item_data = collection(**data)
            item_data.validate()
            print("ITEM DATA:",item_data)
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
