
from models.breakdown import Breakdown
from models.call import Call
from models.client import Client
from service import svc

class StatementOfAccountItem(svc.db.EmbeddedDocument):
    item_date = svc.db.DateTimeField()     #	T
    item_description = svc.db.StringField(min_length=0, max_length= 255)                             #	T	 DA no / DA title, CN no /CN title
    item_price = svc.db.FloatField(min_value= 0)                                     #	N	
    item_debit = svc.db.FloatField(min_value= 0)                                  #	N
    item_credit = svc.db.FloatField(min_value= 0)      

class StatementOfAccount(svc.db.Document):
    soa_date = svc.db.DateTimeField()                     #	D
    soa_seria = svc.db.StringField(required = True, min_length=0, max_length= 255)                   #	T	
    soa_no = svc.db.StringField(required = True, unique = True, min_length=0, max_length= 255)       #	N	soa + 1
    call = svc.db.ReferenceField(Call, reverse_delete_rule=1)                                  #	T
    breakdown = svc.db.ReferenceField(Breakdown, reverse_delete_rule=1)                                    #	T   BreakID for CallID
    soa_title = svc.db.StringField(min_length=0, max_length= 255)                                    #	T   Callid / Vessel / ETA / Port / Status
    client = svc.db.ReferenceField(Client, reverse_delete_rule=1)                                  #	T   from Call
    client_alias = svc.db.StringField(min_length=0, max_length= 255)                              #	T   from Call
    client_info = svc.db.StringField(min_length=0, max_length= 255)                               #	T   From Client
    soa_debit_amount = svc.db.FloatField(min_value= 0)                             #	N
    soa_credit_amount = svc.db.FloatField(min_value= 0)                          #	N
    soa_balance_amount = svc.db.FloatField(min_value= 0)                            #	N
    soa_items = svc.db.ListField(svc.db.EmbeddedDocumentField(StatementOfAccountItem))                              #	T