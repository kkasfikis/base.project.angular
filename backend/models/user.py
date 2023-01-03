from service import svc
class User(svc.db.Document):
    username = svc.db.StringField(unique = True, required = True, min_length=3, max_length= 20)
    password = svc.db.StringField(required = True, min_length=3, max_length= 80)
    roles = svc.db.ListField(svc.db.StringField(min_length=3, max_length=20))
    fullName = svc.db.StringField(required = True, min_length=3, max_length=50)
    email = svc.db.StringField(unique = True, required=True, min_length=3, max_length=50)

