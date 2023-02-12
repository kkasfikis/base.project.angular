from datetime import datetime 

class HelperFunctions:
    @staticmethod
    def copy_object_values(source,dest):
        fields = [field_name for field_name in source._fields]
        for attr in fields:
            if attr == 'id':
                continue
            value = getattr(source,attr)
            setattr(dest,attr,value)
    
    @staticmethod
    def send_email():
        pass

    @staticmethod
    def convertDates(data):
        for key in data.keys():
            if type(data[key]) == list:
                for item in data[key]:
                    for k in item.keys():
                        if type(item[k]) == str and '.' in item[k]:
                            try:
                                item[k] = datetime.fromisoformat(item[k].split('.')[0])
                            except:
                                continue
            else:
                if type(data[key]) == str and '.' in data[key]:
                    try:
                        data[key] = datetime.fromisoformat(data[key].split('.')[0])
                    except:
                        continue