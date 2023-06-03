from service import svc
from models.proforma import Proforma
from models.call import Call

class BreakdownItem(svc.db.EmbeddedDocument):
    item_date = svc.db.DateTimeField()                          #	D
    item_category = svc.db.StringField(min_length=0, max_length= 255)                                    #	T
    item_subcategory = svc.db.StringField(min_length=0, max_length= 255)                                 #	T
    item_description = svc.db.StringField(min_length=0, max_length= 255)                                 #	T
    item_order = svc.db.IntField(min_value=0)                                       #	N
    item_price = svc.db.FloatField(min_value=0)                                       #	N
    item_remark = svc.db.StringField(min_length=0, max_length= 255)                                      #	T
    item_debit = svc.db.FloatField(min_value=0)                                       #	N
    item_qty = svc.db.IntField(min_value=0)                                         #	N
    item_link_file = svc.db.FileField(required=False)    

class Breakdown(svc.db.Document):
    proforma = svc.db.ReferenceField(Proforma, reverse_delete_rule=1)
    call = svc.db.ReferenceField(Call,reverse_delete_rule=1)
    breakdown_entry = svc.db.DateTimeField()                      #	D
    breakdown_status = svc.db.StringField(required = True, min_length=0, max_length= 255)                   #	T
    breakdown_comment = svc.db.StringField(required = True, min_length=0, max_length= 255)                  #	T
    breakdown_info = svc.db.StringField(required = True, min_length=0, max_length= 1500)                    #	T
    breakdown_debit_amount = svc.db.FloatField(min_value=0)                               #	N   sum of itemamount
    breakdown_no = svc.db.StringField(unique = True, min_length=0, max_length= 255) 
    breakdown_items = svc.db.ListField(svc.db.EmbeddedDocumentField(BreakdownItem))                            #	T