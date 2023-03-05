from service import svc
class Staff(svc.db.Document):
    staff_name = svc.db.StringField(required = True, unique = True, min_length=0, max_length= 255)   #	T
    staff_educ = svc.db.StringField(min_length=0, max_length= 255)                 #	T  
    staff_id_card_no = svc.db.StringField(min_length=0, max_length= 255)              #	T
    staff_soc_sec_no = svc.db.StringField(min_length=0, max_length= 255)              #	T
    staff_position = svc.db.StringField(min_length=0, max_length= 255)             #	T   Selected from PRLIST > value for PRLIST > list = “Positions”
    staff_dept = svc.db.StringField(min_length=0, max_length= 255)                 #	T
    staff_mob = svc.db.StringField(min_length=0, max_length= 255)                  #	T
    notes = svc.db.StringField(min_length=0, max_length= 255)  