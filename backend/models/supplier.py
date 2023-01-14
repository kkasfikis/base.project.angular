from service import svc
class SupplierPiC(svc.db.EmbeddedDocument):
    pic_name = svc.db.StringField(required = True, unique = True, min_length=3, max_length= 255)                 #	T
    position = svc.db.StringField(min_length=3, max_length= 255)                #	T	Selected from PRLIST > value for PRLIST > list = “Positions”
    title = svc.db.StringField(min_length=3, max_length= 255)                   #	T	Selected from PRLIST > value for PRLIST > list = “Titles”
    phone = svc.db.StringField(min_length=3, max_length= 255)                   #	T
    mobile = svc.db.StringField(min_length=3, max_length= 255)                  #	T
    email = svc.db.StringField(min_length=3, max_length= 255)                   #	T
    fax = svc.db.StringField(min_length=3, max_length= 255)                     #	T
    internal_number = svc.db.StringField(min_length=3, max_length= 255)                   #	T
    notes = svc.db.StringField(min_length=3, max_length= 255)     

class Supplier(svc.db.Document):
    supplier_name = svc.db.StringField(required = True, unique = True, min_length=3, max_length= 255)            #	T	
    category = svc.db.StringField(min_length=3, max_length= 255)                #	T	Selected from PRLIST > value, backcolor, forecolor for PRLIST > list = “Supplier Categories”
    status = svc.db.StringField(min_length=3, max_length= 255)                  #	T	Selected from PRLIST > value, backcolor, forecolor for PRLIST > list = “Statuses”
    supplier_object = svc.db.StringField(min_length=3, max_length= 255)                  #	T	Selected from PRLIST > value for PRLIST > list = “Objects”
    vat_no = svc.db.StringField(min_length=3, max_length= 255)                   #	T
    doy = svc.db.StringField(min_length=3, max_length= 255)                     #	T
    fpa = svc.db.StringField(min_length=3, max_length= 255)                     #	T
    mail = svc.db.StringField(min_length=3, max_length= 255)                    #	T
    phone = svc.db.StringField(min_length=3, max_length= 255)                   #	T
    fax = svc.db.StringField(min_length=3, max_length= 255)                     #	T
    country = svc.db.StringField(min_length=3, max_length= 255)                 #	T	Selected from PRLIST > value for PRLIST > list = “Countries”
    town = svc.db.StringField(min_length=3, max_length= 255)                    #	T	
    address = svc.db.StringField(min_length=3, max_length= 255)                 #	T
    zip = svc.db.StringField(min_length=3, max_length= 255)                     #	T
    resp = svc.db.StringField(min_length=3, max_length= 255)                    #	T
    priority = svc.db.StringField(min_length=3, max_length= 255)                #	T   Selected from PRLIST > value for PRLIST > list = “Priority Descriptions”
    payment_way = svc.db.StringField(min_length=3, max_length= 255)              #	T	Selected from PRLIST > value, backcolor, forecolor for PRLIST > list = “Ways of Payment”
    bank = svc.db.StringField(min_length=3, max_length= 255)                    #	T	Selected from PRLIST > value for PRLIST > list = “Banks”
    account = svc.db.StringField(min_length=3, max_length= 255)                 #	T
    entry_date = svc.db.StringField(min_length=3, max_length= 255)               #	D
    notes = svc.db.StringField(min_length=3, max_length= 255)                   #	T
    ports = svc.db.StringField(min_length=3, max_length= 255)                   #	T   
    supplier_pic = svc.db.ListField(svc.db.EmbeddedDocumentField(SupplierPiC))