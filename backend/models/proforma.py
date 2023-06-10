from service import svc
from models.client import Client

class ProformaItem(svc.db.EmbeddedDocument):
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
    item_remarks = svc.db.StringField()  

class Proforma(svc.db.Document):
    proforma_type = svc.db.StringField(required = True, min_length=0, max_length= 255)   #	T   "Proforma","Debit Note", "Credit Note", "Disbursement Account"
    proforma_title = svc.db.StringField(min_length=0, max_length= 255)    
    proforma_date = svc.db.DateTimeField()                     #	D
    proforma_no = svc.db.StringField(unique = True, min_length=0, max_length= 255)       #	N	invno+1
    client = svc.db.ReferenceField(Client, reverse_delete_rule=1)                             #	T   from Call
    client_alias = svc.db.StringField(min_length=0, max_length= 255)                              #	T   from Call
    client_info = svc.db.StringField(min_length=0, max_length= 255)                               #	T   From Client
    proforma_total_amount = svc.db.FloatField(min_value=0)                              #	N
    proforma_items = svc.db.ListField(svc.db.EmbeddedDocumentField(ProformaItem))                     #	T
