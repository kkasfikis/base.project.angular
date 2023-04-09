from service import svc
from models.client import Client

class CreditItem(svc.db.EmbeddedDocument):
    item_date = svc.db.DateTimeField()  
    item_description = svc.db.StringField(min_length=0, max_length= 255)
    item_amount = svc.db.FloatField(min_value=0)                                     #	N	
    item_deposit_bank = svc.db.StringField(min_length=0, max_length= 255)
    item_deposit_account = svc.db.StringField(min_length=0, max_length= 255)

class CreditNote(svc.db.Document):
    credit_date = svc.db.DateTimeField()                     #	D
    credit_no = svc.db.StringField(unique = True, min_length=0, max_length= 255)       #	N	invno+1
    client = svc.db.ReferenceField(Client, reverse_delete_rule=1)                             #	T   from Call
    client_alias = svc.db.StringField(min_length=0, max_length= 255)                              #	T   from Call
    client_address = svc.db.StringField(min_length=0, max_length= 255)                               #	T   From Client
    call_info = svc.db.StringField(min_length=0, max_length= 255) 
    credit_amount = svc.db.FloatField(min_value=0)                              #	N
    credit_items = svc.db.ListField(svc.db.EmbeddedDocumentField(CreditItem))                     #	T
