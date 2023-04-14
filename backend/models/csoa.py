
from models.client import Client
from service import svc

class ConsolidatedStatementOfAccountItem(svc.db.EmbeddedDocument):
    item_date = svc.db.DateTimeField()     #	T
    item_description = svc.db.StringField(required = True, unique = True, min_length=0, max_length= 255) #	T	 SOA no / SOA Date SOA title
    item_debit = svc.db.FloatField(min_value= 0)                                   #	N
    item_credit = svc.db.FloatField(min_value= 0)                                 #	N
    item_balance = svc.db.FloatField(min_value= 0)                                #	N

class ConsolidatedStatementOfAccount(svc.db.Document):
    csoa_date = svc.db.DateTimeField()                     #	D
    csoa_no = svc.db.StringField(required = True, unique = True, min_length=0, max_length= 255)       #	N	csoa +1
    client = svc.db.ReferenceField(Client, reverse_delete_rule=1)                               #	T   from Client
    csoa_debit_amount = svc.db.FloatField(min_value= 0)                              #	N   sum of itemdebit
    csoa_credit_amount = svc.db.FloatField(min_value= 0)                           #	N   sum of itemcredit
    csoa_balance_amount = svc.db.FloatField(min_value= 0)                            #	N   sum of itembalance
    csoa_items = svc.db.ListField(svc.db.EmbeddedDocumentField(ConsolidatedStatementOfAccountItem))                           #	T
