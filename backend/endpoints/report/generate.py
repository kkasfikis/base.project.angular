from fpdf import FPDF
from flask import jsonify, request, current_app, make_response
from flask_restx import Resource,Namespace,fields,reqparse
from flask_cors import CORS, cross_origin
from ..crud import BaseCrud
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
import json
from datetime import datetime
from models.report import CreditNoteReport
from fpdf import fpdf

api = Namespace('report/generate',description = 'Report Generation')

@api.route("/<string:report_type>/<string:id>", methods=['GET','POST'])
class Generate(Resource):


    @cross_origin()
    def get(self, report_type : str, id : str):
        #data = request.get_json()
        pdf = self._generate_debit_note_report()
        response = make_response(pdf.output(dest='S').encode('latin-1'))
        response.headers.set('Content-Disposition','attachment',filename = 'report.pdf')
        response.headers.set('Content-Type','application/pdf')

        return response
    
    
    def _generate_debit_note_report(self):
        credit_items = [
            {
                'item_date' : datetime.now(),
                'item_description': 'Item 3',
                'item_amount': 7.50,
                'item_deposit_bank': 'EuroBank',
                'item_deposit_account': 'IBM243512351235123512'
            },
            {
                'item_date' : datetime.now(),
                'item_description': 'Item 3',
                'item_amount': 7.50,
                'item_deposit_bank': 'EuroBank',
                'item_deposit_account': 'IBM243512351235123512'
            },
            {
                'item_date' : datetime.now(),
                'item_description': 'Item 3',
                'item_amount': 7.50,
                'item_deposit_bank': 'EuroBank',
                'item_deposit_account': 'IBM243512351235123512'
            },
            {
                'item_date' : datetime.now(),
                'item_description': 'Item 3',
                'item_amount': 7.50,
                'item_deposit_bank': 'EuroBank',
                'item_deposit_account': 'IBM243512351235123512'
            },
            {
                'item_date' : datetime.now(),
                'item_description': 'Item 3',
                'item_amount': 7.50,
                'item_deposit_bank': 'EuroBank',
                'item_deposit_account': 'IBM243512351235123512'
            },
        ]

        report = CreditNoteReport()
        report.generate_credit_note_report({
            "credit_date" : datetime.now(),
            "credit_no" : '12345',
            "call" : 'This is a multiline call description.\nIt can span multiple lines.',
            "client" : 'This is a multiline client description.\nIt can span multiple lines.',
            "breakdown" : 'This is a multiline client description.\nIt can span multiple lines.',
            "total_amount": 44.88,
            "items" : credit_items
        })
        return report