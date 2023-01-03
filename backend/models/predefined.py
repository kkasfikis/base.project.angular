from service import svc
class Predefined(svc.db.Document):
    name = svc.db.StringField(unique = True, required = True, min_length=3, max_length= 20)