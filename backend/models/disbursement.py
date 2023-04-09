from service import svc
from models.client import Client

class DisbursementItem(svc.db.EmbeddedDocument):
    item_date = svc.db.DateTimeField() 
    item_category = svc.db.StringField(min_length=0, max_length= 255)   
    item_description = svc.db.StringField(min_length=0, max_length= 255)
    item_order = svc.db.IntField(min_value=0)                                    #	N	
    item_price = svc.db.FloatField(min_value=0)                                     #	N	
    item_qty = svc.db.IntField(min_value=0)                                      #	N
    item_amount = svc.db.FloatField(min_value=0)                                    #	N
    item_discount_value = svc.db.FloatField(min_value=0)                           #	N
    item_discount_percent = svc.db.FloatField(min_value=0)                            #	N
    item_total = svc.db.FloatField(min_value=0)         


class DisbursementAccount(svc.db.Document):
    disbursement_date = svc.db.DateTimeField()                     #	D
    disbursement_no = svc.db.StringField(unique = True, min_length=0, max_length= 255)       #	N	invno+1
    client = svc.db.ReferenceField(Client, reverse_delete_rule=1)                             #	T   from Call
    client_alias = svc.db.StringField(min_length=0, max_length= 255)                              #	T   from Call
    client_address = svc.db.StringField(min_length=0, max_length= 255)                               #	T   From Client
    call = svc.db.StringField(min_length=0, max_length= 255) 
    disbursement_amount = svc.db.FloatField(min_value=0)                              #	N
    disbursement_items = svc.db.ListField(svc.db.EmbeddedDocumentField(DisbursementItem))                     #	T
