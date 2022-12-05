from backend import svc
class User(svc.db.Document):
    name = svc.db.StringField(unique = True, required = True, min_length=3, max_length= 20)
    value = svc.db.StringField(required = True, min_length=3, max_length= 80)
    forecolor = svc.db.ListField(svc.db.StringField(min_length=3, max_length=20))
    backcolor = svc.db.StringField(required = True, min_length=3, max_length=50)