from service import svc
class Expense(svc.db.Document):
    cat	 = svc.db.StringField(min_length=0, max_length= 255)                        #	T	Selected from PRLIST > value for PRLIST > list = “Expenses Category”
    sub	 = svc.db.StringField(min_length=0, max_length= 255)                        #	T	Selected from PRLIST > value for PRLIST > list = “Expenses Subcategory”
    desc = svc.db.StringField(min_length=0, max_length= 255)                        #	T		
    amount = svc.db.StringField(required = True, min_length=0, max_length= 255)     #	N
    ref_inv = svc.db.StringField(min_length=0, max_length= 255)                      #	T
    inv_date = svc.db.StringField(required = True, min_length=0, max_length= 255)    #	D
    inv_s_no = svc.db.StringField(min_length=0, max_length= 255)                      #	T
    inv_company = svc.db.StringField(min_length=0, max_length= 255)                  #	T
    bank = svc.db.StringField(min_length=0, max_length= 255)                        #	T	Selected from PRLIST > value for PRLIST > list = “Bank”
    account_no = svc.db.StringField(min_length=0, max_length= 255)                   #	T	Selected from PRLIST > value for PRLIST > list = “Bank Accounts”
    deposit_withdrawal = svc.db.StringField(required = True, min_length=0, max_length= 255) #	T	“DEPOSIT”, “WITHDRAWAL”
    currency = svc.db.StringField(required = True, min_length=0, max_length= 255)   #	T	“USD”,”EURO”,”LC”