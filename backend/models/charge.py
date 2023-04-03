from service import svc

class Charge(svc.db.Document):
    category1 = svc.db.StringField(required = True, min_length=0, max_length= 255)                      #	T   Selected from PRLIST > value for PRLIST > list = “Charge Categories”            
    category2 = svc.db.StringField(required = True, min_length=0, max_length= 255)   
    category_order = svc.db.IntField(min_value=0)       #	I               #	T   Selected from PRLIST > value for PRLIST > list = “Charge Subcategories”
    description = svc.db.StringField(required = True, unique = True, min_length=0, max_length= 255)    #   T
    price = svc.db.FloatField(min_value=0)                         #	T
    notes = svc.db.StringField(min_length=0, max_length= 255)
   
    