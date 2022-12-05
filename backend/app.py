import os,sys
sys.path.insert(0, os.path.abspath(".."))
from backend import svc
import endpoints.auth #do not remove this
from endpoints.administrator.port import api as port
from endpoints.administrator.client import api as client

svc.api.add_namespace(port)
svc.api.add_namespace(client)

if __name__ == '__main__':
    svc.app.run(port=8081, debug=True)

