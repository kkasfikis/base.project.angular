from service import svc
class Vessel(svc.db.Document):
    name = svc.db.StringField(required = True, min_length=3, max_length= 255)#
    exName = svc.db.StringField(min_length=3, max_length= 255)
    flag = svc.db.StringField(min_length=3, max_length=255)#
    phone = svc.db.StringField(min_length=3, max_length=255)##########
    fax = svc.db.StringField( min_length=3, max_length=255)##########
    telex  = svc.db.StringField( min_length=3, max_length=255)
    email  = svc.db.EmailField()#########
    SCID = svc.db.StringField( min_length=3, max_length=255)
    DWT  = svc.db.StringField( min_length=3, max_length=255)#capacity
    NRT  = svc.db.StringField( min_length=3, max_length=255)
    BLT  = svc.db.StringField( min_length=3, max_length=255)#year created
    SCNRT = svc.db.StringField( min_length=3, max_length=255)
    LOA  = svc.db.StringField( min_length=3, max_length=255)
    DRAFT = svc.db.StringField( min_length=3, max_length=255)
    BEAM = svc.db.StringField( min_length=3, max_length=255)
    SCNT  = svc.db.StringField( min_length=3, max_length=255)
    SCGT  = svc.db.StringField( min_length=3, max_length=255)
    type  = svc.db.StringField( min_length=3, max_length=255)#
    pilots = svc.db.StringField( min_length=3, max_length=255)#number
    notes = svc.db.StringField( min_length=3, max_length=255)
    image = svc.db.StringField(min_length=3,max_length=255)########################
    tonrate = svc.db.StringField( min_length=3, max_length=255)#number