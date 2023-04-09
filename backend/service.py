import datetime
from flask import Flask
from flask_restx import Api
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager
from flask_mongoengine import MongoEngine
from dataclasses import dataclass, field


@dataclass
class Service:
    name : str
    app : Flask = field(init=False) 
    api : Api = field(init=False) 
    jwt : JWTManager = field(init=False) 
    db : MongoEngine = field(init=False) 

    def __post_init__(self) -> None:
        self._init_app()

    def _init_app(self) -> None:
        self._set_app()
        self._set_api()

        self._set_configs()

        self._set_mongo()
        self._set_jwt()

    def _set_mongo(self) -> None:
        self.db = MongoEngine()
        self.db.init_app(self.app)

    def _set_jwt(self)-> None:
        self.jwt = JWTManager(self.app)
        
    def _set_api(self) -> None:
        self.api = Api(self.app,version="1.0.0",title=self.name)
    
    def _set_app(self) -> None:
        self.app = Flask(__name__)
        cors = CORS(self.app)
        self.app.config['CORS_HEADERS'] = 'Content-Type'

    def _set_configs(self) -> None:
        self.app.config['JWT_SECRET_KEY'] = 'Your_Secret_Key'
        self.app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)
        self.app.config['MONGODB_SETTINGS'] = {
            'db' : 'MAIS_db',
            'host' : 'localhost',
            'port' : 27017
        }

    @staticmethod
    def error_handler(e):
        print(e)
        return { 
            'error-message' : str(e)
        },500
    
svc = Service(name = 'MAIS API v1.0.0')
