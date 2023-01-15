
from service import svc
class StatementOfAccountItem(svc.db.EmbeddedDocument):
    item_date = svc.db.StringField(required = True, unique = True, min_length=3, max_length= 255)    #	T
    item_description = svc.db.StringField(min_length=3, max_length= 255)                             #	T	 DA no / DA title, CN no /CN title
    item_price = svc.db.StringField(min_length=3, max_length= 255)                                   #	N	
    item_debit = svc.db.StringField(min_length=3, max_length= 255)                                   #	N
    item_credit = svc.db.StringField(min_length=3, max_length= 255)     

class StatementOfAccount(svc.db.Document):
    soa_type = svc.db.StringField(required = True, min_length=3, max_length= 255)                    #	T   "Statement of Account"
    soa_date = svc.db.StringField(required = True, min_length=3, max_length= 255)                    #	D
    soa_seria = svc.db.StringField(required = True, min_length=3, max_length= 255)                   #	T	
    soa_no = svc.db.StringField(required = True, unique = True, min_length=3, max_length= 255)       #	N	soa + 1
    call_id = svc.db.StringField(min_length=3, max_length= 255)                                      #	T
    break_id = svc.db.StringField(min_length=3, max_length= 255)                                     #	T   BreakID for CallID
    soa_title = svc.db.StringField(min_length=3, max_length= 255)                                    #	T   Callid / Vessel / ETA / Port / Status
    soa_client_name = svc.db.StringField(min_length=3, max_length= 255)                               #	T   from Call
    soa_client_alias = svc.db.StringField(min_length=3, max_length= 255)                              #	T   from Call
    soa_client_info = svc.db.StringField(min_length=3, max_length= 255)                               #	T   From Client
    soa_debit_amount = svc.db.StringField(min_length=3, max_length= 255)                              #	N
    soa_credit_tamount = svc.db.StringField(min_length=3, max_length= 255)                            #	N
    soa_balance_amount = svc.db.StringField(min_length=3, max_length= 255)                            #	N
    em_soa_item = svc.db.ListField(svc.db.EmbeddedDocumentField(StatementOfAccountItem))                              #	T