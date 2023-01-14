from service import svc

class PortCharge(svc.db.EmbeddedDocument):
    ch_desc = svc.db.StringField(min_length=3, max_length= 255)                     #	T   Select ch_desc from Charges
    port_name = svc.db.StringField(min_length=3, max_length= 255)                    #	T	Select protname from Ports			
    price = svc.db.StringField(min_length=3, max_length= 255) 

class Charge(svc.db.Document):
    ch_cat = svc.db.StringField(min_length=3, max_length= 255)                      #	T   Selected from PRLIST > value for PRLIST > list = “Charge Categories”
    ch_cat_order = svc.db.StringField(min_length=3, max_length= 255)                #	I
    ch_sub = svc.db.StringField(min_length=3, max_length= 255)                      #	T   Selected from PRLIST > value for PRLIST > list = “Charge Subcategories”
    ch_desc = svc.db.StringField(required = True, unique = True, min_length=3, max_length= 255)    #   T
    ch_rem = svc.db.StringField(min_length=3, max_length= 255)                      #	T
    em_port_charges = svc.db.ListField(svc.db.EmbeddedDocumentField(PortCharge))
    