from service import svc

class ProformaTemplateItem(svc.db.EmbeddedDocument):
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

class ProformaTemplate(svc.db.Document):
    template_name = svc.db.StringField(min_length=0, max_length= 255)
    template_items = svc.db.ListField(svc.db.EmbeddedDocumentField(ProformaTemplateItem))                     #	T
