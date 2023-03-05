from service import svc

class PredefinedValue(svc.db.EmbeddedDocument):
    value = svc.db.StringField(min_length=0, max_length= 255)  
    fore_color = svc.db.StringField(min_length=0, max_length= 255)           #	N
    back_color = svc.db.StringField(min_length=0, max_length= 255)           #	N

class Predefined(svc.db.Document):
    name = svc.db.StringField(required = True, min_length=0, max_length= 255)#  T	Values: everything in ""
    key = svc.db.StringField(required = True, min_length=0, max_length=255)  #	T	
    values = svc.db.ListField(svc.db.EmbeddedDocumentField(PredefinedValue))  
    
