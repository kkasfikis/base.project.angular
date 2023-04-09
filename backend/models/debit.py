from service import svc
from models.client import Client

class DebitItem(svc.db.EmbeddedDocument):
    item_date = svc.db.DateTimeField()  
    item_category1 = svc.db.StringField(min_length=0, max_length= 255)  
    item_category2 = svc.db.StringField(min_length=0, max_length= 255)   
    item_description = svc.db.StringField(min_length=0, max_length= 255)
    item_order = svc.db.IntField(min_value=0)                                    #	N	
    item_price = svc.db.FloatField(min_value=0)                                     #	N	
    item_qty = svc.db.IntField(min_value=0)                                      #	N
    item_amount = svc.db.FloatField(min_value=0)                                    #	N
    item_discount_value = svc.db.FloatField(min_value=0)                           #	N
    item_discount_percent = svc.db.FloatField(min_value=0)                            #	N
    item_total = svc.db.FloatField(min_value=0)         


class DebitNote(svc.db.Document):
    debit_date = svc.db.DateTimeField()                     #	D
    debit_no = svc.db.StringField(unique = True, min_length=0, max_length= 255)       #	N	invno+1
    debit_category = svc.db.StringField(min_length=0, max_length= 255) 
    client = svc.db.ReferenceField(Client, reverse_delete_rule=1)                             #	T   from Call
    client_alias = svc.db.StringField(min_length=0, max_length= 255)                              #	T   from Call
    client_address = svc.db.StringField(min_length=0, max_length= 255)                               #	T   From Client
    call_info = svc.db.StringField(min_length=0, max_length= 255) 
    debit_amount = svc.db.FloatField(min_value=0)                              #	N
    debit_items = svc.db.ListField(svc.db.EmbeddedDocumentField(DebitItem))                     #	T
