from service import svc
from models.user import User

class Vessel(svc.db.Document):
    vessel_name = svc.db.StringField(required = True, min_length=0, max_length= 255)      #	T
    ex_name = svc.db.StringField(min_length=0, max_length= 255)          #		T
    flag = svc.db.StringField(required = True, min_length=0, max_length= 255)           #	T   Selected from PRLIST > value for PRLIST > list = “Vessel Flags”
    phone = svc.db.StringField(min_length=0, max_length= 255)           #		T
    sat_fax = svc.db.StringField(min_length=0, max_length= 255)          #		T
    sat_tlx = svc.db.StringField(min_length=0, max_length= 255)          #		T
    email = svc.db.StringField(min_length=0, max_length= 255)           #		T
    scid = svc.db.StringField(min_length=0, max_length= 255)            #		N
    dwt = svc.db.StringField(min_length=0, max_length= 255)             #		N
    grt = svc.db.StringField(min_length=0, max_length= 255)             #		N
    nrt = svc.db.StringField(min_length=0, max_length= 255)             #		N
    blt = svc.db.StringField(min_length=0, max_length= 255)             #		N
    scnrt = svc.db.StringField(min_length=0, max_length= 255)           #		N
    loa = svc.db.StringField(min_length=0, max_length= 255)             #		N
    draft = svc.db.StringField(min_length=0, max_length= 255)           #		N
    beam = svc.db.StringField(min_length=0, max_length= 255)            #		n
    scnt = svc.db.StringField(min_length=0, max_length= 255)            #		N
    scgt = svc.db.StringField(min_length=0, max_length= 255)            #		n
    vessel_type = svc.db.StringField(min_length=0, max_length= 255)            #		T   Selected from PRLIST > value for PRLIST > list = “Vessel Types”
    pilots = svc.db.StringField(min_length=0, max_length= 255)          #		N
    note = svc.db.StringField(min_length=0, max_length= 255)            #		T
    ton_rate = svc.db.StringField(min_length=0, max_length= 255)         #		N
    captain_user = svc.db.ReferenceField(User, reverse_delete_rule=1)