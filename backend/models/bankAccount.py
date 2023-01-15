from service import svc
class BankAccount(svc.db.Document):
    bank = svc.db.StringField(required = True, min_length=3, max_length= 255)       #	T	Selected from PRLIST > value for PRLIST > list = “Banks”
    account_no = svc.db.StringField(required = True, unique = True, min_length=3, max_length= 255)    #	T	
    bank_address	= svc.db.StringField(min_length=3, max_length= 255)                 #	T	
    country = svc.db.StringField(min_length=3, max_length= 255)                     #	T  	Selected from PRLIST > value for PRLIST > list = “Countries”
    phone = svc.db.StringField(min_length=3, max_length= 255)                       #	T	
    mail = svc.db.StringField(min_length=3, max_length= 255)                        #	T	
    fax	 = svc.db.StringField(min_length=3, max_length= 255)                        #	T	
    pic_name = svc.db.StringField(min_length=3, max_length= 255)                         #	T		
    pic_position = svc.db.StringField(min_length=3, max_length= 255)                 #	T   Selected from PRLIST > value for PRLIST > list = “Positions”
    pic_mobile = svc.db.StringField(min_length=3, max_length= 255)                   #	T
    pic_intr_no = svc.db.StringField(min_length=3, max_length= 255)                   #	T	
    currency = svc.db.StringField(min_length=3, max_length= 255)   