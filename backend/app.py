import os,sys
from service import svc
import endpoints.auth #do not remove this
from endpoints.administrator.port import api as port
from endpoints.administrator.client import api as client
from endpoints.administrator.agent import api as agent
from endpoints.administrator.vessel import api as vessel
from endpoints.administrator.call import api as call


if __name__ == '__main__':
    svc.api.add_namespace(agent)
    svc.api.add_namespace(port)
    svc.api.add_namespace(client)
    svc.api.add_namespace(vessel)
    svc.api.add_namespace(call)
    svc.app.run(port=8081, debug=True)

