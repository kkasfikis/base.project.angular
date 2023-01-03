from service import svc
class Port(svc.db.Document):
    name = svc.db.StringField(unique = True, required = True, min_length=3, max_length= 255)
    anchorage = svc.db.StringField(min_length=3, max_length= 255)
    notes = svc.db.StringField(min_length=3, max_length=255)
    weatherLink = svc.db.StringField(min_length=3, max_length=255)