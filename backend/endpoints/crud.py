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
    def _handle_key(item : dict , key : str) -> None:
        if type(item[key]) == bson.objectid.ObjectId :
            item[key] = str(item[key])
        elif '$oid' in item[key]:
            item[key] = item[key]['$oid']
    @staticmethod
    def _handle_read_reference_field(item : dict, original : any, load : bool = True) -> None:
        for key in item.keys():
            if (type(item[key]) == bson.objectid.ObjectId) or (type(item[key]) == dict and '$oid' in item[key] and '_file' not in key):
                if load == True:
                    orig = original[key].to_mongo()
                    item[key] = orig.to_dict()
                    BaseCrud._handle_key(item[key],'_id')
                    BaseCrud._handle_read_date(item[key])
                    
                    
                    file_keys_to_pop = []
                    for kkey in item[key].keys():
                        if type(item[key][kkey]) == list:
                            for i in item[key][kkey]:
                                file_keys_to_pop_from_subform = []
                                for kkkey in i.keys():
                                    if '_file' in kkkey:
                                        file_keys_to_pop_from_subform.append(kkkey)
                                for kkkey in file_keys_to_pop_from_subform:
                                    i.pop(kkkey)
                        if '_file' in kkey:
                            file_keys_to_pop.append(kkey)
                    
                    for kkey in file_keys_to_pop:
                        item[key].pop(kkey)

                    #print('Modified reference object',item[key])

                    BaseCrud._handle_read_reference_field(item[key],orig,False)
                    #item[key][skey] = item[key][skey]['$oid']
                else:
                    BaseCrud._handle_key(item,key)

            
        
    @staticmethod
    def _handle_read_file(item : dict, original : any, read : bool = True) -> None:
        for key in item.keys():
            if type(item[key]) == dict and '$oid' in item[key] and '_file' in key:
                if read:
                    item[key] = base64.b64encode(original[key].read()).decode('ascii')
                else:
                    item[key] = ''

    def _handle_read_list(item : dict, original : any) -> None:
        for key in item.keys():
            if type(item[key]) == list:
                index = 0
                for i in item[key]:
                    if type(i) is not str:
                        BaseCrud._handle_read_date(i)
                        BaseCrud._handle_read_file(i,original[key][index])
                        BaseCrud._handle_read_reference_field(i,original[key][index])
                    index = index + 1
    @staticmethod
    def _handle_read_date(item : dict) -> None:
        for key in item.keys():
            if type(item[key]) == dict and '$date' in item[key]:
                item[key] = datetime.fromtimestamp( item[key]['$date'] / 1000 ).isoformat()


    @staticmethod
    def _handle_write_date(item : dict):
        for key in item.keys():
            if '_file' not in key:
                print(key,item[key])
            if type(item[key]) == str :
                try:
                    item[key] = datetime.fromisoformat(item[key].split('.')[0]) if '.' in item[key] else datetime.fromisoformat(item[key])
                except:
                    continue
    
    @staticmethod
    def _handle_write_reference_field(item : dict):
        pass
    
    @staticmethod
    def _handle_write_file(item : dict, files : any = None) -> None:
        subform_files = []
        if files is not None: 
            for key in files.keys():
                
                if '.' in key:
                    key_parts = key.split('.')
                    subform_files.append({
                        'subform' : key_parts[0],
                        'index' : int(key_parts[1]),
                        'field' : key_parts[2],
                        'file' : files[key]
                    })
                else:
                    item[key] = files[key]
        return subform_files
           
    @staticmethod
    def _handle_write_list(item : dict):
        for key in item.keys():
            if type(item[key]) == list:
                index = 0
                for i in item[key]:
                    if type(i) is not str:
                        BaseCrud._handle_write_date(item[key][index])
                    index = index + 1  
    
    @staticmethod
    def read(class_name : str, load : bool = True, read_file : bool = True):
        try:
            collection = getattr(models,class_name)
            items = []
            for item in collection.objects:
                titem = json.loads(item.to_json())

                BaseCrud._handle_key(titem, '_id')
                BaseCrud._handle_read_file(titem, item, read_file)
                BaseCrud._handle_read_date(titem)
                BaseCrud._handle_read_reference_field(titem, item, load)
                BaseCrud._handle_read_list(titem,item)
                
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
    def paginated(class_name : str, page : int, size : int, sort : str = None, sort_column : str = None, load : bool = True, read_file : bool = True):
        try:
            collection = getattr(models,class_name)
            items = []
            count = collection.objects.count()
            overflow = False
            if(page * size > count) :
                overflow = True

                
            for item in collection.objects.skip(page*size).limit(size):
                titem = json.loads(item.to_json())
                
                BaseCrud._handle_key(titem,'_id')
                BaseCrud._handle_read_file(titem, item, read_file)
                BaseCrud._handle_read_date(titem)
                BaseCrud._handle_read_reference_field(titem, item, load)
                BaseCrud._handle_read_list(titem,item)

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
            print(str(e))
            return {
                'read' : False,
                'message' : 'There are validation errors: ' + str(e) 
            }, 200

    @staticmethod
    def search():
        pass

    @staticmethod
    def record(class_name : str, id : str, load : bool = True, read_file : bool = True):
        try:
            collection = getattr(models,class_name)
            item = collection.objects(pk = id).first()
            titem = json.loads(item.to_json()) 
            
            BaseCrud._handle_key(titem,'_id')
            BaseCrud._handle_read_file(titem, item, read_file)
            BaseCrud._handle_read_date(titem)
            BaseCrud._handle_read_reference_field(titem, item, load)
            BaseCrud._handle_read_list(titem,item)
            
            return {
                'info' : True,
                'data' : titem
            },200
        except Exception as e:
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
        
        BaseCrud._handle_write_list(data)
        BaseCrud._handle_write_date(data)
        subform_files = BaseCrud._handle_write_file(data,files)

        try:
            item = collection(**data)
            for file in subform_files:
                item[file['subform']][file['index']][file['field']].put(file['file'])
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

        BaseCrud._handle_write_list(data)
        BaseCrud._handle_write_date(data)
        subform_files = BaseCrud._handle_write_file(data,files)
        try:
            item_data = collection(**data)
            for file in subform_files:
                item_data[file['subform']][file['index']][file['field']].put(file['file'])
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