import os,sys
from service import svc
import endpoints.auth #do not remove this
import endpoints.helpers #do not remove this
from endpoints.administrator.port import api as port
from endpoints.administrator.client import api as client
from endpoints.administrator.agent import api as agent
from endpoints.administrator.vessel import api as vessel
from endpoints.administrator.call import api as call
from endpoints.administrator.supplier import api as supplier
from endpoints.administrator.expense import api as expense
from endpoints.administrator.bankAccount import api as bankAccount
from endpoints.administrator.charge import api as charge
from endpoints.administrator.staff import api as staff
from endpoints.administrator.predefined import api as predefined
from endpoints.administrator.soa import api as soa
from endpoints.administrator.csoa import api as csoa
from endpoints.administrator.breakdown import api as breakdown
from endpoints.administrator.invoice import api as invoice
from endpoints.administrator.crud import api as crud
from endpoints.administrator.userManagement import api as userManagement


if __name__ == '__main__':
    svc.api.add_namespace(agent)
    svc.api.add_namespace(port)
    svc.api.add_namespace(client)
    svc.api.add_namespace(vessel)
    svc.api.add_namespace(call)
    svc.api.add_namespace(supplier)
    svc.api.add_namespace(expense)
    svc.api.add_namespace(bankAccount)
    svc.api.add_namespace(charge)
    svc.api.add_namespace(staff)
    svc.api.add_namespace(predefined)
    svc.api.add_namespace(soa)
    svc.api.add_namespace(csoa)
    svc.api.add_namespace(breakdown)
    svc.api.add_namespace(invoice)
    svc.api.add_namespace(crud)
    svc.api.add_namespace(userManagement)
    svc.app.run(port=8081, debug=True)

