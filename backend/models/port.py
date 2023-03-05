from service import svc
class Port(svc.db.Document):
    name = svc.db.StringField(unique = True, required = True, min_length=0, max_length= 255)
    anchorage = svc.db.StringField(min_length=0, max_length= 255)
    agent = svc.db.StringField(min_length=0, max_length= 255)
    weather_link = svc.db.StringField(min_length=0, max_length=255)
    notes = svc.db.StringField(min_length=0, max_length=255)