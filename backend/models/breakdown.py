from service import svc

class BreakdownItem(svc.db.EmbeddedDocument):
    item_date = svc.db.DateTimeField()                          #	D
    item_status = svc.db.StringField(required = True, min_length=0, max_length= 255)                     #	T
    item_category = svc.db.StringField(min_length=0, max_length= 255)                                    #	T
    item_subcategory = svc.db.StringField(min_length=0, max_length= 255)                                 #	T
    item_description = svc.db.StringField(min_length=0, max_length= 255)                                 #	T
    item_order = svc.db.IntField(min_value=0)                                       #	N
    item_price = svc.db.FloatField(min_value=0)                                       #	N
    item_remark = svc.db.StringField(min_length=0, max_length= 255)                                      #	T
    item_credit = svc.db.FloatField(min_value=0)                                      #	N
    item_debit = svc.db.FloatField(min_value=0)                                       #	N
    item_qty = svc.db.IntField(min_value=0)                                         #	N
    item_amount = svc.db.FloatField(min_value=0)                                      #	N
    item_actual = svc.db.FloatField(min_value=0)                                      #	N
    item_link = svc.db.StringField(min_length=0, max_length= 255)      

class Breakdown(svc.db.Document):
    breakdown_entry = svc.db.DateTimeField()                      #	D
    breakdown_status = svc.db.StringField(required = True, min_length=0, max_length= 255)                   #	T
    breakdown_comment = svc.db.StringField(required = True, min_length=0, max_length= 255)                  #	T
    breakdown_info = svc.db.StringField(required = True, min_length=0, max_length= 1500)                    #	T
    breakdown_debit_amount = svc.db.FloatField(min_value=0)                               #	N   sum of itemamount
    breakdown_credit_amount = svc.db.FloatField(min_value=0)                              #	N   sum of itemcredit
    breakdown_actual_amount = svc.db.FloatField(min_value=0)                              #	N   sum of itemactual
    breakdown_items = svc.db.ListField(svc.db.EmbeddedDocumentField(BreakdownItem))                            #	T