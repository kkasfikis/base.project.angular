from service import svc
class Predefined(svc.db.Document):
    name = svc.db.StringField(required = True, min_length=3, max_length= 255)#  T	Values: everything in ""
    key = svc.db.StringField(required = True, min_length=3, max_length=255)  #	T	
    values = svc.db.ListField(svc.db.StringField(unique=True))
    fore_color = svc.db.StringField(min_length=3, max_length= 255)           #	N
    back_color = svc.db.StringField(min_length=3, max_length= 255)           #	N
