from service import svc
class Predefined(svc.db.Document):
    list_name = svc.db.StringField(required = True, min_length=3, max_length= 255) # T	Values: everything in ""
    value = svc.db.StringField(required = True, min_length=3, max_length=255)           #	T	
    forecolor = svc.db.StringField(min_length=3, max_length= 255)           #	N
    backcolor = svc.db.StringField(min_length=3, max_length= 255)           #	N
