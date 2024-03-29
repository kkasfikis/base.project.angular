from service import svc
from models.user import User

class AgentPiC(svc.db.EmbeddedDocument):
    pic_name = svc.db.StringField(required = True, unique = True, min_length=0, max_length= 255)   #	    T
    agent_name = svc.db.StringField(min_length=0, max_length= 255)           #		T	Select from AGENTS
    position = svc.db.StringField(min_length=0, max_length= 255)            #	    T	Selected from PRLIST > value for PRLIST > list = “Positions”
    title = svc.db.StringField(min_length=0, max_length= 255)               #		T	Selected from PRLIST > value for PRLIST > list = “Titles”
    phone = svc.db.StringField(min_length=0, max_length= 255)               #		T
    mobile = svc.db.StringField(min_length=0, max_length= 255)              #		T
    email = svc.db.StringField(min_length=0, max_length= 255)               #		T
    fax = svc.db.StringField(min_length=0, max_length= 255)                 #		T
    internal_number = svc.db.StringField(min_length=0, max_length= 255)               #		T
    notes = svc.db.StringField(min_length=0, max_length= 255) 

class Agent(svc.db.Document):
    agent_name = svc.db.StringField(required = True, unique = True, min_length=0, max_length= 255)    #	    T
    port_name = svc.db.StringField(min_length=0, max_length= 255)            #	    T	Select from PORTS 
    notes = svc.db.StringField(min_length=0, max_length= 255)               #		T
    phone = svc.db.StringField(min_length=0, max_length= 255)               #		T	
    fax = svc.db.StringField(min_length=0, max_length= 255)                 #		T	
    mail = svc.db.StringField(min_length=0, max_length= 255)                #		T
    agent_people_in_charge = svc.db.ListField(svc.db.EmbeddedDocumentField(AgentPiC))
    agent_user = svc.db.ReferenceField(User, reverse_delete_rule=1)