from service import svc

class BreakdownItem(svc.db.EmbeddedDocument):
    item_date = svc.db.StringField(required = True, min_length=3, max_length= 255)                       #	D
    item_status = svc.db.StringField(required = True, min_length=3, max_length= 255)                     #	T
    item_category = svc.db.StringField(min_length=3, max_length= 255)                                    #	T
    item_subcategory = svc.db.StringField(min_length=3, max_length= 255)                                 #	T
    item_description = svc.db.StringField(min_length=3, max_length= 255)                                 #	T
    item_order = svc.db.StringField(min_length=3, max_length= 255)                                       #	N
    item_price = svc.db.StringField(min_length=3, max_length= 255)                                       #	N
    item_remark = svc.db.StringField(min_length=3, max_length= 255)                                      #	T
    item_credit = svc.db.StringField(min_length=3, max_length= 255)                                      #	N
    item_debit = svc.db.StringField(min_length=3, max_length= 255)                                       #	N
    item_qty = svc.db.StringField(min_length=3, max_length= 255)                                         #	N
    item_amount = svc.db.StringField(min_length=3, max_length= 255)                                      #	N
    item_actual = svc.db.StringField(min_length=3, max_length= 255)                                      #	N
    item_link = svc.db.StringField(min_length=3, max_length= 255)      

class Breakdown(svc.db.Document):
    break_entry = svc.db.StringField(required = True, min_length=3, max_length= 255)                    #	D
    break_status = svc.db.StringField(required = True, min_length=3, max_length= 255)                   #	T
    break_comment = svc.db.StringField(required = True, min_length=3, max_length= 255)                  #	T
    break_info = svc.db.StringField(required = True, min_length=3, max_length= 1500)                    #	T
    break_debit_amount = svc.db.StringField(min_length=3, max_length= 255)                               #	N   sum of itemamount
    break_credit_amount = svc.db.StringField(min_length=3, max_length= 255)                              #	N   sum of itemcredit
    break_actual_amount = svc.db.StringField(min_length=3, max_length= 255)                              #	N   sum of itemactual
    em_break_item = svc.db.ListField(svc.db.EmbeddedDocumentField(BreakdownItem))                            #	T