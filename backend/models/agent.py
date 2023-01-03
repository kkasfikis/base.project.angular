from service import svc
from models.port import Port
class PersonInCharge(svc.db.EmbeddedDocument):
    name = svc.db.StringField(required = True, min_length=3, max_length= 255)
    position = svc.db.StringField(required = True, min_length=3, max_length= 255)
    title = svc.db.StringField(required = True, min_length=3, max_length= 255)
    phone = svc.db.StringField(required = True, min_length=3, max_length= 255)
    mobile = svc.db.StringField(required = True, min_length=3, max_length= 255)
    fax = svc.db.StringField(required = True, min_length=3, max_length= 255)
    internalNumber = svc.db.StringField(required = True, min_length=3, max_length= 255)
    notes = svc.db.StringField(required = True, min_length=3, max_length= 255)

class Agent(svc.db.Document):
    name = svc.db.StringField(required = True, min_length=3, max_length= 255) #
    phone = svc.db.StringField(min_length=3, max_length= 255) 
    fax = svc.db.StringField(min_length=3, max_length=255)
    email = svc.db.EmailField(required=True) 
    notes = svc.db.StringField( min_length=3, max_length=255)
    peopleInCharge = svc.db.ListField(svc.db.EmbeddedDocumentField(PersonInCharge))
    port = svc.db.ReferenceField(Port) #