class Helpers:
    @staticmethod
    def copy_object_values(source,dest):
        fields = [field_name for field_name in source._fields]
        for attr in fields:
            if attr is 'id':
                continue
            value = getattr(source,attr)
            setattr(dest,attr,value)
        print(dest.to_json())
    
    @staticmethod
    def send_email():
        pass