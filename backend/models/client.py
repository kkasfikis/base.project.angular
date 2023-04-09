from service import svc
from models.user import User

class ClientPiC(svc.db.EmbeddedDocument):
    name = svc.db.StringField(required = True, min_length=0, max_length= 255)
    position = svc.db.StringField(required = True, min_length=0, max_length= 255)
    title = svc.db.StringField(required = True, min_length=0, max_length= 255)
    phone = svc.db.StringField(required = True, min_length=0, max_length= 255)
    mobile = svc.db.StringField(required = True, min_length=0, max_length= 255)
    fax = svc.db.StringField(required = True, min_length=0, max_length= 255)
    internal_number = svc.db.StringField(required = True, min_length=0, max_length= 255)
    notes = svc.db.StringField(required = True, min_length=0, max_length= 255)

class ClientAlias(svc.db.EmbeddedDocument):
    alias = svc.db.StringField(unique = True, required = True, min_length=0, max_length= 255) #####
    text = svc.db.StringField(required = True, min_length=0,max_length=10000)

class Client(svc.db.Document):
    name = svc.db.StringField(required = True, min_length=0, max_length= 255) #
    logo = svc.db.StringField() ############################
    category = svc.db.StringField(min_length=0, max_length= 255) #
    resp =  svc.db.StringField(min_length=0, max_length= 255) #
    status = svc.db.StringField(min_length=0, max_length=255) #
    occupation = svc.db.StringField(min_length=0, max_length=255) 
    vat = svc.db.StringField( min_length=0, max_length=255) 
    tax_percentage  = svc.db.StringField( min_length=0, max_length=255)
    email  = svc.db.EmailField()
    phone = svc.db.StringField( min_length=0, max_length=255) #
    fax  = svc.db.StringField( min_length=0, max_length=255) 
    country = svc.db.StringField( min_length=0, max_length=255) #
    town = svc.db.StringField( min_length=0, max_length=255)
    address = svc.db.StringField( min_length=0, max_length=255)
    client_zip  = svc.db.StringField( min_length=0, max_length=255)
    priority = svc.db.StringField( min_length=0, max_length=255) #
    payment_method = svc.db.StringField( min_length=0, max_length=255)
    bank  = svc.db.StringField( min_length=0, max_length=255)
    account  = svc.db.StringField( min_length=0, max_length=255)
    entry_date  = svc.db.DateTimeField()
    notes = svc.db.StringField( min_length=0, max_length=255)
    client_people_in_charge = svc.db.ListField(svc.db.EmbeddedDocumentField(ClientPiC))
    client_aliases = svc.db.ListField(svc.db.EmbeddedDocumentField(ClientAlias)) 
    client_user = svc.db.ReferenceField(User, reverse_delete_rule=1)