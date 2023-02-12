from service import svc
from models.call import Call
from models.breakdown import Breakdown
from models.client import Client
class InvoiceItem(svc.db.EmbeddedDocument):
    item_date = svc.db.DateTimeField()     #	T
    item_description = svc.db.StringField(min_length=3, max_length= 255)                             #	T	
    item_order = svc.db.IntField(min_value=0)                                    #	N	
    item_price = svc.db.FloatField(min_value=0)                                     #	N	
    item_qty = svc.db.IntField(min_value=0)                                      #	N
    item_amount = svc.db.FloatField(min_value=0)                                    #	N
    item_discount_value = svc.db.FloatField(min_value=0)                           #	N
    item_discount_percent = svc.db.FloatField(min_value=0)                            #	N
    discount_amount = svc.db.FloatField(min_value=0)                              #	N
    discount_total = svc.db.FloatField(min_value=0)         

class Invoice(svc.db.Document):
    invoice_type = svc.db.StringField(required = True, min_length=3, max_length= 255)   #	T   "Proforma","Debit Note", "Credit Note", "Disbursement Account"
    invoice_title = svc.db.StringField(min_length=3, max_length= 255)    
    invoice_balance = svc.db.FloatField(min_value=0)                 #	N	-1,0,1 
    invoice_date = svc.db.DateTimeField()                     #	D
    invoice_seria = svc.db.StringField(required = True, min_length=3, max_length= 255)                   #	T	
    invoice_no = svc.db.StringField(required = True, unique = True, min_length=3, max_length= 255)       #	N	invno+1
    call = svc.db.ReferenceField(Call, reverse_delete_rule=1)                                  #	T
    breakdown = svc.db.ReferenceField(Breakdown, reverse_delete_rule=1)                                    #	T   Callid / Vessel / ETA / Port / Status
    client = svc.db.ReferenceField(Client, reverse_delete_rule=1)                             #	T   from Call
    client_alias = svc.db.StringField(min_length=3, max_length= 255)                              #	T   from Call
    client_info = svc.db.StringField(min_length=3, max_length= 255)                               #	T   From Client
    invoice_total_amount = svc.db.FloatField(min_value=0)                              #	N
    invoice_items = svc.db.ListField(svc.db.EmbeddedDocumentField(InvoiceItem))                     #	T
