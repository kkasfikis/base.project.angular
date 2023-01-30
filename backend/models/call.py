from service import svc
from models.client import Client
from models.vessel import Vessel
from models.port import Port
from models.agent import Agent

class Inquire1(svc.db.EmbeddedDocument):                                #   OWNERS REPRESENTATIVES LOG
    position= svc.db.StringField(min_length=3, max_length= 255)	    #   T 	Selected from PRLIST > value, for PRLIST > list = “Positions” (supt / port captain / other staff)
    name = svc.db.StringField(required=True, min_length=3, max_length= 255)		#   T
    arrival_port = svc.db.StringField(min_length=3, max_length= 255) 	#   T   Select from Ports
    arrival_date = svc.db.StringField(min_length=3, max_length= 255)	#   D
    first_hotel = svc.db.StringField(min_length=3, max_length= 255)		#   T	Selected from PRLIST > value, for PRLIST > list = “Hotels”
    first_hotel_details = svc.db.StringField(min_length=3, max_length= 255)	#	T
    first_hotel_room = svc.db.StringField(min_length=3, max_length= 255)		#   T
    first_hotel_phone = svc.db.StringField(min_length=3, max_length= 255)	    #   T
    first_hotel_checkin_date = svc.db.StringField(min_length=3, max_length= 255)	#   D
    first_hotel_checkout_date = svc.db.StringField(min_length=3, max_length= 255)	#   D
    second_hotel = svc.db.StringField(min_length=3, max_length= 255)	    #   T	Selected from PRLIST > value, for PRLIST > list = “Hotels”
    second_hotel_details  = svc.db.StringField(min_length=3, max_length= 255)   #	T
    second_hotel_room = svc.db.StringField(min_length=3, max_length= 255)	    #   T
    second_hotel_phone = svc.db.StringField(min_length=3, max_length= 255)	    #   T
    second_hotel_checkin_date = svc.db.StringField(min_length=3, max_length= 255)	#   D
    second_hotel_checkout_date = svc.db.StringField(min_length=3, max_length= 255)	#   D
    visa_expiration_date = svc.db.StringField(min_length=3, max_length= 255) #   D
    passport_image = svc.db.StringField(min_length=3, max_length= 255)	    #   T	LINKs
    departure_airport = svc.db.StringField(min_length=3, max_length= 255)	#   T	Selected from PRLIST > value, for PRLIST > list = “Airports”
    departure_date	= svc.db.StringField(min_length=3, max_length= 255)     #   D
    departure_details = svc.db.StringField(min_length=3, max_length= 255)	#   T	LINKs
    comments = svc.db.StringField(min_length=3, max_length= 255)	#   T

class Inquire2(svc.db.EmbeddedDocument):                                                # CREW CHANGES
    name = svc.db.StringField(required=True, min_length=3, max_length= 255)	        #	T
    signin_signoff = svc.db.StringField(min_length=3, max_length= 255)	        #  	T   "ON","OFF"
    rank = svc.db.StringField(min_length=3, max_length= 255)	        #  	T 	Selected from PRLIST > value, for PRLIST > list = “Crew Ranks” 
    details = svc.db.StringField(min_length=3, max_length= 255)	        #  	T 	LINKs
    passport_expiration_date = svc.db.StringField(min_length=3, max_length= 255)	    # 	D	ALERT
    exit_visa_application_date = svc.db.StringField(min_length=3, max_length= 255)	#   D	ALERT
    passport_image = svc.db.StringField(min_length=3, max_length= 255)	    #   T	LINKs
    visa_image = svc.db.StringField(min_length=3, max_length= 255)	    #   T	LINKs
    exit_visa_ISS_date = svc.db.StringField(min_length=3, max_length= 255)	#   D	ALERT
    visa_details = svc.db.StringField(min_length=3, max_length= 255)	        #   T	LINKs
    hotel = svc.db.StringField(min_length=3, max_length= 255)	        #   T	Selected from PRLIST > value, for PRLIST > list = “Hotels”
    hotel_details = svc.db.StringField(min_length=3, max_length= 255)	    #   T
    hotel_room = svc.db.StringField(min_length=3, max_length= 255)	        #   T
    hotel_phone = svc.db.StringField(min_length=3, max_length= 255)	        #   T
    hotel_checkin_date = svc.db.StringField(min_length=3, max_length= 255)	    #   D
    hotel_checkout_date = svc.db.StringField(min_length=3, max_length= 255)	    #   D
    date = svc.db.StringField(min_length=3, max_length= 255)	        #   D			‘join ship / disenbark date

class Inquire3(svc.db.EmbeddedDocument):
    type = svc.db.StringField(required=True, min_length=3, max_length= 255)	        #	T	techs / surveyors
    names = svc.db.StringField(required=True, min_length=3, max_length= 255)	        #	T	workshop name and details / surveyform name snd details
    equipment_surveys = svc.db.StringField(min_length=3, max_length= 255)	    # 	T	LINKs
    hotel = svc.db.StringField(min_length=3, max_length= 255)	        #	T	Selected from PRLIST > value, for PRLIST > list = “Hotels” 
    hotel_details = svc.db.StringField(min_length=3, max_length= 255)	    #	T
    hotel_room = svc.db.StringField(min_length=3, max_length= 255)	        #	T
    hotel_phone = svc.db.StringField(min_length=3, max_length= 255)	        #	T
    hotel_referrer = svc.db.StringField(min_length=3, max_length= 255)	            #	T	Selected from PRLIST > value, for PRLIST > list = “Hotel Accomodation Arranged By” (workshop-surveyor / agent)
    hotel_referrer_details = svc.db.StringField(min_length=3, max_length= 255)	        #	T
    hotel_checkin_date = svc.db.StringField(min_length=3, max_length= 255)	    #	D
    hotel_checkout_date = svc.db.StringField(min_length=3, max_length= 255)	    #	D
    arrival_date = svc.db.StringField(min_length=3, max_length= 255)	        #	D   ALERT
    arrival_flight = svc.db.StringField(min_length=3, max_length= 255)	    #	T
    departure_date = svc.db.StringField(min_length=3, max_length= 255)	        #	D   ALERT
    departure_flight = svc.db.StringField(min_length=3, max_length= 255)	    #	T
    attendance = svc.db.StringField(min_length=3, max_length= 255)	    #	D   ALERT

class Inquire4(svc.db.EmbeddedDocument):
    position = svc.db.StringField(min_length=3, max_length= 255)	    #	T	Selected from PRLIST > value, for PRLIST > list = “Positions” (owner repr /crew & rank)
    name = svc.db.StringField(min_length=3, max_length= 255)	        #	T
    incident_date = svc.db.StringField(min_length=3, max_length= 255)	    #	D
    medical_date = svc.db.StringField(min_length=3, max_length= 255)	    #	D
    medical_type = svc.db.StringField(min_length=3, max_length= 255)	    #	T	Selected from PRLIST > value, for PRLIST > list = “Type of Med. Att.” hospitalization/medical treatment
    checkin_date = svc.db.StringField(min_length=3, max_length= 255)	        #	D
    checkout_date = svc.db.StringField(min_length=3, max_length= 255)	    #	D
    medical_status = svc.db.StringField(min_length=3, max_length= 255)	        #	T	Selected from PRLIST > value, for PRLIST > list = “Medical Att. Status” (treatment & hospital / treatment & ship / discharge for hospital)

class Inquire5(svc.db.EmbeddedDocument):
    post_office = svc.db.StringField(min_length=3, max_length= 255)              #	T
    offland_description = svc.db.StringField(min_length=3, max_length= 255)	    #	T 	Selected from PRLIST > value, for PRLIST > list = “Offland Items Descriptions” (boxes, nr. Colls, weight)
    details = svc.db.StringField(min_length=3, max_length= 255)	    #	T
    documents = svc.db.StringField(min_length=3, max_length= 255)	        #	T	LINKs
    offland_date = svc.db.StringField(min_length=3, max_length= 255)	#	D   ALERT
    forward_date = svc.db.StringField(min_length=3, max_length= 255)	    #	D   ALERT
    estimated_arrival_date = svc.db.StringField(min_length=3, max_length= 255)	    #	D   ALERT
    offland_destination = svc.db.StringField(min_length=3, max_length= 255)	    # 	T	Selected from PRLIST > value, for PRLIST > list = “Offland Destinations” (other port / overseas /owner office)
    offland_destination_details = svc.db.StringField(min_length=3, max_length= 255)	    #	T
    offland_status = svc.db.StringField(min_length=3, max_length= 255)	        #	T	Selected from PRLIST > value, for PRLIST > list = “Statuses” (claance under progress / transit to exporting port)
    export_documents = svc.db.StringField(min_length=3, max_length= 255)	    #	T	LINKs
    offland_forward_method = svc.db.StringField(min_length=3, max_length= 255)	    # 	T	Selected from PRLIST > value, for PRLIST > list = “Offland FRW Methods” (local courier / int'l courier /local logistics / AWB B/L /dedicated truck / other

class Inquire6(svc.db.EmbeddedDocument):
    power_supply = svc.db.StringField(min_length=3, max_length= 255)	    # 	T
    quantity = svc.db.StringField(min_length=3, max_length= 255)	            # 	N
    estimated_delivery_datetime = svc.db.StringField(min_length=3, max_length= 255)	    # 	D   ALERT
    power_supply_status = svc.db.StringField(min_length=3, max_length= 255)	        # 	T	Selected from PRLIST > value, for PRLIST > list = “PW Supply Status”  (order  received / stand by  / order dlvrd)
    power_supply_delivery_method = svc.db.StringField(min_length=3, max_length= 255)	    # 	T	Selected from PRLIST > value, for PRLIST > list = “PW Supply DLV Method”  (ph. Supplier arrangement / via supply boat arranged by agent)

class Inquire7(svc.db.EmbeddedDocument):
    domestic_shipment_type = svc.db.StringField(min_length=3, max_length= 255)	        #	T	Selected from PRLIST > value, for PRLIST > list = “Domestic Shipment Type”   (AWB / courier / SF)
    track_number = svc.db.StringField(min_length=3, max_length= 255)	    #	T
    documents = svc.db.StringField(min_length=3, max_length= 255)	        #	T   LINKs
    post_office = svc.db.StringField(min_length=3, max_length= 255)	            #	T
    domestic_shipment_date = svc.db.StringField(min_length=3, max_length= 255)	    #	D   ALERT
    domestic_shipment_status = svc.db.StringField(min_length=3, max_length= 255)	        #	T	Selected from PRLIST > value, for PRLIST > list = “Domestic Shipment Status”  

class Inquire8(svc.db.EmbeddedDocument):
    overseas_shipment_type = svc.db.StringField(min_length=3, max_length= 255)	        #	T	Selected from PRLIST > value, for PRLIST > list = “Overseas Shipment Type”   (AWB / courier / SF)
    track_number = svc.db.StringField(min_length=3, max_length= 255)	    #	T
    doclink = svc.db.StringField(min_length=3, max_length= 255)	        #	T
    post_office = svc.db.StringField(min_length=3, max_length= 255)	            #	T
    overseas_shipment_date = svc.db.StringField(min_length=3, max_length= 255)	    #	D   ALERT
    overseas_shipment_status = svc.db.StringField(min_length=3, max_length= 255)	        #	T	Selected from PRLIST > value, for PRLIST > list = “Overseas Shipment Status”  

class Inquire9(svc.db.EmbeddedDocument):
    store_provision_type = svc.db.StringField(min_length=3, max_length= 255)	        #	T	Selected from PRLIST > value, for PRLIST > list = “Store Provisions Type”  ( stores / provisions)
    quantity = svc.db.StringField(min_length=3, max_length= 255)	            #	N
    store_provision_supplier = svc.db.StringField(min_length=3, max_length= 255)	    #	T	Selected from PRLIST > value, for PRLIST > list = “Store Provisions Supplier”  Typelocal /physical supplier
    details = svc.db.StringField(min_length=3, max_length= 255)	        #	T
    delivery_date = svc.db.StringField(min_length=3, max_length= 255)	        #	D   ALERT
    store_provision_status = svc.db.StringField(min_length=3, max_length= 255)	        # 	T	Selected from PRLIST > value, for PRLIST > list = “Store Provisions Status”  (order partially received / order under preparation /stand by for dlvr /order dlvrd)
    store_provision_delivery_method = svc.db.StringField(min_length=3, max_length= 255)	    # 	T	Selected from PRLIST > value, for PRLIST > list = “Store Provisions DLV Methods”  (ph. Supplier arrangement / via supply boat arranged by agent)

class Inquire10(svc.db.EmbeddedDocument):
    bunker_type = svc.db.StringField(min_length=3, max_length= 255)	        #	T	Selected from PRLIST > value, for PRLIST > list = “Bunkers Log” (bunkering / lub oils/ chems / paints)
    quantity = svc.db.StringField(min_length=3, max_length= 255)	            #	N
    delivery_date = svc.db.StringField(min_length=3, max_length= 255)	        #	D   ALERT
    bunker_supplier_type = svc.db.StringField(min_length=3, max_length= 255)	        #	T	Selected from PRLIST > value, for PRLIST > list = “Supplier Types” (local / physical supplier)
    details = svc.db.StringField(min_length=3, max_length= 255)	        #	T	Selected from PRLIST > value, for PRLIST > list = “Bunkers Details” ( LFSO / HSFO/ MEO)
    bunker_status = svc.db.StringField(min_length=3, max_length= 255)	        #	T	Selected from PRLIST > value, for PRLIST > list = “Bunkers Statuses” (order rcvd by ph. supplier / order under ph. Supplier clearance / bardge - order stand by for dlvr /order dlvrd)
    bunker_delivery_method = svc.db.StringField(min_length=3, max_length= 255)	    # 	T	Selected from PRLIST > value, for PRLIST > list = “Bunkers DLV Method” (ph. Supplier arrangement / via supply boat arranged by agent)

class Inquire11(svc.db.EmbeddedDocument):
    ship_pollutant_service = svc.db.StringField(min_length=3, max_length= 255)	        #	T	Selected from PRLIST > value, for PRLIST > list = “Ships Pollutants Service” (sludge disposal / slops disposal / garbage disposal /grey waters / hold washings)
    quantity = svc.db.StringField(min_length=3, max_length= 255)	            #	N
    date = svc.db.StringField(min_length=3, max_length= 255)	    #	D   ALERT
    ship_pollutant_status = svc.db.StringField(min_length=3, max_length= 255)	        # 	T	Selected from PRLIST > value, for PRLIST > list = “Ships Pollutants Status” (permision on progress / stand by / garbage collection /collected)

class Inquire12(svc.db.EmbeddedDocument):
    description = svc.db.StringField(min_length=3, max_length= 255)	    #	T
    date = svc.db.StringField(min_length=3, max_length= 255)	        #	T   ALERT
    quantity = svc.db.StringField(min_length=3, max_length= 255)	            #	N
    status = svc.db.StringField(min_length=3, max_length= 255)	        #	T	Selected from PRLIST > value, for PRLIST > list = “Various Inquiries Statuses”
    documents = svc.db.StringField(min_length=3, max_length= 255)	        #	T   LINKs

class Inquire13(svc.db.EmbeddedDocument):
    ctm_operation = svc.db.StringField(min_length=3, max_length= 255)		    #   T	Selected from PRLIST > value, for PRLIST > list = “CTM Operation” (remitted / received /dlvrd)
    amount = svc.db.StringField(min_length=3, max_length= 255)		    #   N
    currency = svc.db.StringField(min_length=3, max_length= 255)	    #   T   "USD","EURO","LC"
    date = svc.db.StringField(min_length=3, max_length= 255)	    #   D

class Call(svc.db.Document):
    eta_date = svc.db.StringField(required = True,min_length=3, max_length= 255)         #		D
    call_entry_date = svc.db.StringField(min_length=3, max_length= 255)                   #       D	
    client = svc.db.ReferenceField(Client)
    client_name = svc.db.StringField(required = True,min_length=3, max_length= 255)  #		T	Select from CLIENTS 
    client_alias = svc.db.StringField(required = True,min_length=3, max_length= 255)   #		T	Select from CLIENTALIAS for specific Client
    vessel = svc.db.ReferenceField(Vessel)
    vessel_name = svc.db.StringField(required = True,min_length=3, max_length= 255)     #		T	Select from VESSELS
    vessel_flag = svc.db.StringField(required = True,min_length=3, max_length= 255)     #       T   Selected from PRLIST > value for PRLIST > list = “Vessel Flags”
    port = svc.db.ReferenceField(Port)
    port_name = svc.db.StringField(required = True,min_length=3, max_length= 255)    #		T	Select from PORTS
    port_anchorage = svc.db.StringField(min_length=3, max_length= 255)                #		T
    agent = svc.db.ReferenceField(Agent)
    agent_name = svc.db.StringField(min_length=3, max_length= 255)               #		T	Select from AGENTS
    agent_person_in_charge = svc.db.StringField(min_length=3, max_length= 255)                 #		T	Select from AGENTPIC for specific agent
    call_status = svc.db.StringField(min_length=3, max_length= 255)              #		T	Selected from PRLIST > value, backcolor, forecolor for PRLIST > list = “Call Statuses”	
    call_type = svc.db.StringField(min_length=3, max_length= 255)                #		T	Selected from PRLIST > value, backcolor, forecolor for PRLIST > list = “Call Types”
    safety_manual = svc.db.StringField(min_length=3, max_length= 255)                  #		T
    safety_certificate = svc.db.StringField(min_length=3, max_length= 255)               #		T
    itc = svc.db.StringField(min_length=3, max_length= 255)                          #		T
    ssec = svc.db.StringField(min_length=3, max_length= 255)                    #		T
    nrt = svc.db.StringField(min_length=3, max_length= 255)                     #		T
    ert = svc.db.StringField(min_length=3, max_length= 255)                     #		T	
    dwt = svc.db.StringField(min_length=3, max_length= 255)                     #		T
    breadth = svc.db.StringField(min_length=3, max_length= 255)                  #		T
    draft = svc.db.StringField(min_length=3, max_length= 255)                   #		T
    usr = svc.db.StringField(min_length=3, max_length= 255)                     #		T
    cma = svc.db.StringField(min_length=3, max_length= 255)                     #		T
    last_rscr = svc.db.StringField(min_length=3, max_length= 255)                #		T
    arrival_draft = svc.db.StringField(min_length=3, max_length= 255)               #		T
    arrival_fwbob = svc.db.StringField(min_length=3, max_length= 255)               #		T
    arrival_sludge = svc.db.StringField(min_length=3, max_length= 255)             #		T
    updated_prospect_link = svc.db.StringField(min_length=3, max_length= 255)         #	    T   LINKs
    updated_lineup = svc.db.StringField(min_length=3, max_length= 255)           #		T
    inbound_bob = svc.db.StringField(min_length=3, max_length= 255)              #		T
    outbound_fob = svc.db.StringField(min_length=3, max_length= 255)             #		T
    entry_on_progress_date = svc.db.StringField(min_length=3, max_length= 255)         #	    D
    anchorage_waiting_pilot = svc.db.StringField(min_length=3, max_length= 255)   #	    T
    etb = svc.db.StringField(min_length=3, max_length= 255)                     #		D
    etc = svc.db.StringField(min_length=3, max_length= 255)                     #		D
    ets	 = svc.db.StringField(min_length=3, max_length= 255)                    #		D
    remarks = svc.db.StringField(min_length=3, max_length= 255)                 #		T
    terminal_pisch_rate = svc.db.StringField(min_length=3, max_length= 255)       #	    T
    terminal_specs = svc.db.StringField(min_length=3, max_length= 255)           #		T   
    terminal_maintenance_schedule = svc.db.StringField(min_length=3, max_length= 255)      #	    T
    port_recent_accident = svc.db.StringField(min_length=3, max_length= 255)      #	    T
    pilots_availability = svc.db.StringField(min_length=3, max_length= 255)      #	    T
    other_port_restrictions = svc.db.StringField(min_length=3, max_length= 255)    #	    T
    military_exercise = svc.db.StringField(min_length=3, max_length= 255)        #		T
    warehouse_conditions = svc.db.StringField(min_length=3, max_length= 255)     #	    T	
    ice_concentration = svc.db.StringField(min_length=3, max_length= 255)        #	    T
    fog_status = svc.db.StringField(min_length=3, max_length= 255)               #		T
    typhoons_expected = svc.db.StringField(min_length=3, max_length= 255)        #	    T
    holidays = svc.db.StringField(min_length=3, max_length= 255)                #		T
    port_document = svc.db.StringField(min_length=3, max_length= 255)             #		T   LINKs
    fishing_boat_risk_status = svc.db.StringField(min_length=3, max_length= 255)   #	    T
    inq1 = svc.db.ListField(svc.db.EmbeddedDocumentField(Inquire1))
    inq2 = svc.db.ListField(svc.db.EmbeddedDocumentField(Inquire2))
    inq3 = svc.db.ListField(svc.db.EmbeddedDocumentField(Inquire3))
    inq4 = svc.db.ListField(svc.db.EmbeddedDocumentField(Inquire4))
    inq5 = svc.db.ListField(svc.db.EmbeddedDocumentField(Inquire5))
    inq6 = svc.db.ListField(svc.db.EmbeddedDocumentField(Inquire6))
    inq7 = svc.db.ListField(svc.db.EmbeddedDocumentField(Inquire7))
    inq8 = svc.db.ListField(svc.db.EmbeddedDocumentField(Inquire8))
    inq9 = svc.db.ListField(svc.db.EmbeddedDocumentField(Inquire9))
    inq10 = svc.db.ListField(svc.db.EmbeddedDocumentField(Inquire10))
    inq11 = svc.db.ListField(svc.db.EmbeddedDocumentField(Inquire11))
    inq12 = svc.db.ListField(svc.db.EmbeddedDocumentField(Inquire12))
    inq13 = svc.db.ListField(svc.db.EmbeddedDocumentField(Inquire13))

