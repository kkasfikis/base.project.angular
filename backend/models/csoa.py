
from service import svc
class ConsolidatedStatementOfAccountItem(svc.db.EmbeddedDocument):
    item_date = svc.db.StringField(required = True, unique = True, min_length=3, max_length= 255)    #	T
    item_soa_desc = svc.db.StringField(required = True, unique = True, min_length=3, max_length= 255) #	T	 SOA no / SOA Date SOA title
    item_debit = svc.db.StringField(min_length=3, max_length= 255)                                   #	N
    item_credit = svc.db.StringField(min_length=3, max_length= 255)                                  #	N
    item_balance = svc.db.StringField(min_length=3, max_length= 255)                                 #	N

class ConsolidatedStatementOfAccount(svc.db.Document):
    csoa_type = svc.db.StringField(required = True, min_length=3, max_length= 255)                    #	T   "Consolidated Statement of Account"
    csoa_date = svc.db.StringField(required = True, min_length=3, max_length= 255)                    #	D
    csoa_seria = svc.db.StringField(required = True, min_length=3, max_length= 255)                   #	T	
    csoa_no = svc.db.StringField(required = True, unique = True, min_length=3, max_length= 255)       #	N	csoa +1
    csoa_title = svc.db.StringField(min_length=3, max_length= 255)                                    #	T   Clientname
    inv_client_name = svc.db.StringField(min_length=3, max_length= 255)                               #	T   from Client
    inv_client_info = svc.db.StringField(min_length=3, max_length= 255)                               #	T   From Client
    inv_debit_amount = svc.db.StringField(min_length=3, max_length= 255)                              #	N   sum of itemdebit
    inv_credit_amount = svc.db.StringField(min_length=3, max_length= 255)                            #	N   sum of itemcredit
    inv_balance_amount = svc.db.StringField(min_length=3, max_length= 255)                            #	N   sum of itembalance
    em_csoa_item = svc.db.ListField(svc.db.EmbeddedDocumentField(ConsolidatedStatementOfAccountItem))                           #	T
