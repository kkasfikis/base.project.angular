from backend import svc
class PersonInCharge(svc.db.EmbeddedDocument):
    name = svc.db.StringField(required = True, min_length=3, max_length= 255)
    position = svc.db.StringField(required = True, min_length=3, max_length= 255)
    title = svc.db.StringField(required = True, min_length=3, max_length= 255)
    phone = svc.db.StringField(required = True, min_length=3, max_length= 255)
    mobile = svc.db.StringField(required = True, min_length=3, max_length= 255)
    fax = svc.db.StringField(required = True, min_length=3, max_length= 255)
    internalNumber = svc.db.StringField(required = True, min_length=3, max_length= 255)
    notes = svc.db.StringField(required = True, min_length=3, max_length= 255)

class Alias(svc.db.EmbeddedDocument):
    name = svc.db.StringField(required = True, min_length=3, max_length= 255)

class Client(svc.db.Document):
    name = svc.db.StringField(required = True, min_length=3, max_length= 255)
    category = svc.db.StringField(min_length=3, max_length= 255)
    status = svc.db.StringField(min_length=3, max_length=255)
    occupation = svc.db.StringField(min_length=3, max_length=255)
    VAT = svc.db.StringField( min_length=3, max_length=255)
    VATpercentage  = svc.db.StringField( min_length=3, max_length=255)
    email  = svc.db.EmailField()
    phone = svc.db.StringField( min_length=3, max_length=255)
    fax  = svc.db.StringField( min_length=3, max_length=255)
    country = svc.db.StringField( min_length=3, max_length=255)
    town = svc.db.StringField( min_length=3, max_length=255)
    address = svc.db.StringField( min_length=3, max_length=255)
    zip  = svc.db.StringField( min_length=3, max_length=255)
    priority = svc.db.StringField( min_length=3, max_length=255)
    paymentMethod = svc.db.StringField( min_length=3, max_length=255)
    bank  = svc.db.StringField( min_length=3, max_length=255)
    account  = svc.db.StringField( min_length=3, max_length=255)
    entryDate  = svc.db.DateTimeField()
    notes = svc.db.StringField( min_length=3, max_length=255)
    peopleInCharge = svc.db.ListField(svc.db.EmbeddedDocumentField(PersonInCharge))
    aliases = svc.db.ListField(svc.db.EmbeddedDocumentField(Alias))


