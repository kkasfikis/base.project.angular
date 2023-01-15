from service import svc
class InvoiceItem(svc.db.EmbeddedDocument):
    item_date = svc.db.StringField(required = True, unique = True, min_length=3, max_length= 255)    #	T
    item_description = svc.db.StringField(min_length=3, max_length= 255)                             #	T	
    item_order = svc.db.StringField(min_length=3, max_length= 255)                                   #	N	
    item_price = svc.db.StringField(min_length=3, max_length= 255)                                   #	N	
    item_qty = svc.db.StringField(min_length=3, max_length= 255)                                     #	N
    item_amount = svc.db.StringField(min_length=3, max_length= 255)                                  #	N
    item_discount_value = svc.db.StringField(min_length=3, max_length= 255)                           #	N
    item_discount_percent = svc.db.StringField(min_length=3, max_length= 255)                         #	N
    discount_amount = svc.db.StringField(min_length=3, max_length= 255)                              #	N
    discount_total = svc.db.StringField(min_length=3, max_length= 255)       

class Invoice(svc.db.Document):
    inv_type = svc.db.StringField(required = True, min_length=3, max_length= 255)   #	T   "Proforma","Debit Note", "Credit Note", "Disbursement Account"
    inv_balance = svc.db.StringField(required = True, min_length=3, max_length= 255)                 #	N	-1,0,1 
    inv_date = svc.db.StringField(required = True, min_length=3, max_length= 255)                    #	D
    inv_seria = svc.db.StringField(required = True, min_length=3, max_length= 255)                   #	T	
    inv_no = svc.db.StringField(required = True, unique = True, min_length=3, max_length= 255)       #	N	invno+1
    call_id = svc.db.StringField(min_length=3, max_length= 255)                                      #	T
    break_id = svc.db.StringField(min_length=3, max_length= 255)                                     #	T   BreakID for CallID
    inv_title = svc.db.StringField(min_length=3, max_length= 255)                                    #	T   Callid / Vessel / ETA / Port / Status
    inv_client_name = svc.db.StringField(min_length=3, max_length= 255)                               #	T   from Call
    inv_client_alias = svc.db.StringField(min_length=3, max_length= 255)                              #	T   from Call
    inv_client_info = svc.db.StringField(min_length=3, max_length= 255)                               #	T   From Client
    inv_total_amount = svc.db.StringField(min_length=3, max_length= 255)                              #	N
    em_invoice_item = svc.db.ListField(svc.db.EmbeddedDocumentField(InvoiceItem))                     #	T
