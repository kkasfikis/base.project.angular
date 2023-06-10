from fpdf import FPDF
from datetime import datetime
from endpoints.crud import BaseCrud

class Report(FPDF):
    def __init__(self):
        super().__init__()
        self.set_font('Arial', '', 12)
        self.set_left_margin(20)
        self.set_right_margin(20)
        self.page_number = 1

    def header(self):
        self.image('logo.png', x=10, y=10, w=70)
        self.set_xy(100, 10)
        self.multi_cell(0, 5, 'Force Marine\n123 Main St\nCity, State, ZIP')
        self.set_xy(170, 10)
        self.cell(0, 5, f'{datetime.now().strftime("%b %d, %Y")} - Page {self.page_number}', align='R')
        self.set_line_width(0.5)
        self.line(10, 35, 200, 35)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', '', 10)
        self.cell(0, 5, 'ABC Company - 123 Main St - City, State, ZIP', 0, 0, 'C')
        self.cell(0, 5, f'{datetime.now().strftime("%b %d, %Y")} - Page {self.page_number}', 0, 0, 'R')

    def get_string_height(self, text : str, width : int):
        num_lines = self.get_string_width(text) // width + 1
        # Calculate the height of the multi-cell element
        return num_lines * self.font_size

    def generate_credit_note_report(self, cn : dict):

        def _table_headers():
            self.set_font('Arial', 'B', 12)
            self.cell(30, 5, 'Date')
            self.cell(60, 5, 'Description')
            self.cell(30, 5, 'Amount')
            self.cell(30, 5, 'Bank')
            self.cell(30, 5, 'Bank Account')
            self.ln()
            self.set_font('Arial', '', 10) 

        def _display_table(items : list):
            self.set_font('Arial', '', 10)
            remaining_height = self.h - self.y - 10
            _table_headers()
            for item in cn['items']:
                if self.y + self.get_string_height(item["item_description"], 60) + 5 > remaining_height:
                    self.page_number += 1
                    self.add_page()
                    self.ln()
                    remaining_height = self.h - self.y
                    self.set_y(40)    
                    _table_headers()
                
                self.cell(30, 5, item["item_date"].strftime('%b %d, %Y'))
                x = self.x
                self.set_x(self.x + 60)
                self.cell(30, 5, f'{item["item_amount"]:.2f}')
                self.cell(30, 5, f'{item["item_deposit_bank"]}')
                self.cell(30, 5, f'{item["item_deposit_account"]}')
                self.set_x(x)
                self.multi_cell(60, 5, f'{item["item_description"]}')
                self.ln()

        def _display_header(title : str):
            self.set_font('Arial', 'B', 12)
            w = self.get_string_width(title) + 6
            self.set_x((210 - w) / 2)
            self.ln()
            self.set_font('Arial', '', 10) 

        def _display_info():
            self.set_y(50)
            self.cell(50, 5, 'Credit Date:')
            self.cell(0, 5, cn['credit_date'].strftime('%b %d, %Y'))
            self.set_y(70)
            self.cell(50, 5, 'Breakdown:')
            self.multi_cell(0, 5, cn['breakdown'])
            self.set_y(80)
            self.cell(50, 5, 'Call:')
            self.multi_cell(0, 5, cn['call'])
            self.set_y(100)
            self.cell(50, 5, 'Client:')
            self.multi_cell(0, 5, cn['client'])
            self.set_y(120)


        self.add_page()

        _display_header(f'Credit Note #{cn["credit_no"]}')
        _display_info()
        _display_table(cn['items'])

        self.ln()
        self.set_font('Arial', 'B', 12)
        self.cell(125)
        self.cell(30, 5, 'Total Amount')
        self.cell(30, 5, str(cn['total_amount']))

    def generate_debit_note_report(self, dn : dict ):
        self.add_page()
        remaining_height = self.h - self.y - 10
        self.set_y(50)
        self.cell(50, 5, 'Debit Date:')
        self.cell(0, 5, dn['debit_date'].strftime('%b %d, %Y'))
        self.set_y( 60)
        self.cell(50, 5, 'Credit Note No.:')
        self.cell(0, 5, dn['credit_note_no'])
        self.set_y(70)
        self.cell(50, 5, 'Debit Category:')
        self.cell(0, 5, dn['debit_category'])
        self.set_y(80)
        self.cell(50, 5, 'Call:')
        self.multi_cell(0, 5, dn['call'])
        self.set_y(100)
        self.cell(50, 5, 'Client:')
        self.multi_cell(0, 5, dn['client'])
        self.set_y(130)
        self.set_font('Arial', 'B', 12)
        self.cell(55, 5, 'Description')
        self.cell(25, 5, 'Price')
        self.cell(25, 5, 'Quantity')
        self.cell(25, 5, 'Amount')
        self.cell(25, 5, 'Discount %')
        self.cell(25, 5, 'Subtotal')
        self.ln()
        self.set_line_width(0.5)
        self.line(10, 35, 200, 35)
        self.ln()
        index = 0
        self.set_font('Arial', '', 10)
        for item in dn['items']:
            index = index + 1
            if self.y + self.get_string_height(item["description"], 55) + 5 > remaining_height:
                self.page_number += 1
                self.add_page()
                self.ln()
                remaining_height = self.h - self.y
                self.set_font('Arial', 'B', 12)
                self.set_y(40)
                self.cell(55, 5, 'Description')
                self.cell(25, 5, 'Price')
                self.cell(25, 5, 'Quantity')
                self.cell(25, 5, 'Amount')
                self.cell(25, 5, 'Discount %')
                self.cell(25, 5, 'Subtotal')
                self.ln()
                self.set_line_width(0.5)
                self.line(10, 35, 200, 35)
                self.ln()
                self.set_font('Arial', '', 10)       
            x = self.x
            self.set_x(self.x + 55)
            self.cell(25, 5, f'{item["price"]:.2f}')
            self.cell(25, 5, f'{item["quantity"]:.2f}')
            self.cell(25, 5, f'{item["amount"]:.2f}')
            self.cell(25, 5, f'{item["discount"]:.2f}')
            self.cell(25, 5, f'{item["subtotal"]:.2f}')
            self.set_x(x)
            self.multi_cell(55, 5, f'{item["description"]}')
            self.set_line_width(0.2)
            self.line(10, 35, 200, 35)
            self.ln()
        self.ln()
        self.ln()
        self.set_font('Arial', 'B', 12)
        self.cell(125)
        self.cell(30, 5, 'Total Amount')
        self.cell(30, 5, str(dn['total_amount']))

    def generate_proforma_report(self, proforma : dict):
        
        def _blank_fill_dict():
            form_keys = ['proforma_title','proforma_date','proforma_no','proforma_total_amount']
            subform_keys = ['item_category1','item_category2','item_description','item_order','item_price','item_qty',
                            'item_amount','item_discount_value','item_discount_percent','item_total','item_remarks']
            for key in form_keys:
                if key not in proforma:
                    proforma[key] = '-'

            for item in proforma['proforma_items']:
                for key in subform_keys:
                    if key not in item:
                        item[key] = '-'

        def _display_table(items : list):
            self.set_font('Arial', '', 10)
            remaining_height = self.h - self.y - 10
            #_table_headers()
            
            self.set_y(self.y + 20)
            self.cell(50,5, 'Proforma Items:')
            self.set_y(self.y + 10)
            
            for item in items:
                if (self.get_string_height(item["item_description"], 150)  \
                    + self.get_string_height(item["item_remarks"], 150) + 30 > remaining_height) :
                    self.page_number += 1
                    self.add_page()
                    self.ln()
                    remaining_height = self.h - self.y
                    self.set_y(40)    
                    
                self.cell(30,5, 'Category:')
                self.cell(50,5, item['item_category1'])
                self.cell(30,5, 'Sub Category:')
                self.cell(50,5, item['item_category2'])
                self.set_y(self.y + 10)
                self.cell(30,5, 'Description:')
                self.multi_cell(150,self.get_string_height(item['item_description'],150), item['item_description'])
                self.set_y(self.y + self.get_string_height(item['item_description'],150))
                self.cell(30,5, 'Order:')
                self.cell(30,5, str(item['item_order']))
                self.cell(30,5, 'Price:')
                self.cell(30,5, str(item['item_price']))
                self.cell(30,5, 'Quantity:')
                self.cell(30,5, str(item['item_qty']))
                self.set_y(self.y + 10)
                self.cell(30,5, 'Discount:')
                self.cell(30,5, str(item['item_discount_value']))
                self.cell(30,5, 'Discount %:')
                self.cell(30,5, str(item['item_discount_percent']))
                self.cell(30,5, 'Total:')
                self.cell(30,5, str(item['item_total']))
                self.set_y(self.y + 10)
                self.cell(30,5, 'Remarks:')
                self.multi_cell(150,self.get_string_height(item['item_remarks'],150), item['item_remarks'])
                self.set_y(self.y + self.get_string_height(item['item_remarks'],150))
                self.set_y(self.y + 10)

        def _display_header(title : str):
            self.set_font('Arial', 'B', 12)
            w = self.get_string_width(title) + 6
            self.set_x((210 - w) / 2)
            self.ln()
            self.set_font('Arial', '', 10) 

        def _display_info():
            self.set_y(50)
            self.cell(30, 5, 'Title:')
            self.cell(50, 5, proforma['proforma_title'])
            self.set_x(80)
            self.cell(30, 5, 'Date:')
            self.cell(50, 5, proforma['proforma_date'])
            self.set_y(60)
            self.cell(30, 5, 'Client Name:')
            self.cell(50, 5, proforma['client']['name'])
            self.set_x(80)
            self.cell(30, 5, 'Client Alias:')
            self.cell(50, 5, proforma['client_alias'])
            self.set_y(70)
            self.cell(30, 5, 'Client Info:')
            self.multi_cell(50, 5, proforma['client_info'])
            #Client INFO

        self.add_page()
        _blank_fill_dict()
        _display_header(f'Proforma #{proforma["proforma_no"]}')
        _display_info()
        _display_table(proforma['proforma_items'])

        self.ln()
        self.set_font('Arial', 'B', 12)
        self.cell(100)
        self.cell(60, 5, 'Proforma Total Amount')
        self.cell(30, 5, str(proforma['proforma_total_amount']))

    def generate_breakdown_report(self, breakdown : dict):
        
        def _blank_fill_dict():
            form_keys = ['breakdown_entry','breakdown_status','breakdown_comment','breakdown_info','breakdown_debit_amount','breakdown_no']
            subform_keys = ['item_date','item_category','item_subcategory','item_description','item_order','item_price',
                            'item_remark','item_debit','item_qty']
            for key in form_keys:
                if key not in breakdown:
                    breakdown[key] = '-'

            for item in breakdown['breakdown_items']:
                for key in subform_keys:
                    if key not in item:
                        item[key] = '-'

        def _display_table(items : list):
            self.set_font('Arial', '', 10)
            remaining_height = self.h - self.y - 10
            #_table_headers()
            self.set_y(self.y + 20)
            self.cell(50,5, 'Breakdown Items:')
            self.set_y(self.y + 10)
            

            for item in items:

                print(self.get_string_height(item["item_description"], 150),self.get_string_height(item["item_remarks"], 150),remaining_height,self.y,self.h)
                if (self.y + self.get_string_height(item["item_description"], 150) + self.get_string_height(item["item_remarks"], 150) + 40 > remaining_height) :
                    print('changing page')
                    self.page_number += 1
                    self.add_page()
                    self.ln()
                    remaining_height = self.h - self.y
                    self.set_y(40)    

                self.cell(30,5, 'Date:')
                self.cell(50,5, item['item_date'])
                self.cell(30,5, 'Category:')
                self.cell(50,5, item['item_category1'])
                self.cell(30,5, 'Sub Category:')
                self.cell(50,5, item['item_category2'])
                self.set_y(self.y + 10)
                self.cell(30,5, 'Description:')
                self.multi_cell(150,self.get_string_height(item['item_description'],150), item['item_description'])
                self.set_y(self.y + self.get_string_height(item['item_description'],150))
                self.cell(30,5, 'Order:')
                self.cell(30,5, str(item['item_order']))
                self.cell(30,5, 'Price:')
                self.cell(30,5, str(item['item_price']))
                self.cell(30,5, 'Quantity:')
                self.cell(30,5, str(item['item_qty']))
                self.cell(30,5, 'Debit:')
                self.cell(30,5, str(item['item_debit']))
                self.set_y(self.y + 10)
                self.cell(30,5, 'Remarks:')
                self.multi_cell(150,self.get_string_height(item['item_remarks'],150), item['item_remarks'])
                self.set_y(self.y + self.get_string_height(item['item_remarks'],150))
                self.set_y(self.y + 10)

        def _display_header(title : str):
            self.set_font('Arial', 'B', 12)
            w = self.get_string_width(title) + 6
            self.set_x((210 - w) / 2)
            self.ln()
            self.set_font('Arial', '', 10) 

        def _display_info():
            self.set_y(50)
            self.cell(40, 5, 'Proforma:')
            self.set_y(60)
            self.cell(40, 5, 'Proforma No:')
            self.cell(50, 5, breakdown['proforma']['proforma_no'])
            self.cell(40, 5, 'Proforma Title:')
            self.cell(50, 5, breakdown['proforma']['proforma_title'])
            self.set_y(70)
            client = BaseCrud.record('Client',breakdown['call']['client'])[0]['data']
            self.cell(40, 5, 'Call Client:')
            self.cell(50, 5, client['name'])
            self.cell(40, 5, 'Call Client Alias:')
            self.cell(50, 5, breakdown['call']['client_alias'])
            self.set_y(80)
            vessel = BaseCrud.record('Vessel',breakdown['call']['vessel'])[0]['data']
            self.cell(40, 5, 'Call Vessel:')
            self.cell(50, 5, vessel['vessel_name'])
            self.cell(40, 5, 'Call Vessel Flag:')
            self.cell(50, 5, breakdown['call']['vessel_flag'])
            self.set_y(90)
            port = BaseCrud.record('Port',breakdown['call']['port'])[0]['data']
            self.cell(40, 5, 'Call Port:')
            self.cell(50, 5, port['name'])
            self.cell(40, 5, 'Call Port Anchorage:')
            self.cell(50, 5, breakdown['call']['port_anchorage'])
            #'breakdown_entry','breakdown_status','breakdown_comment','breakdown_info','breakdown_debit_amount','breakdown_no'
            self.set_y(100)
            self.cell(40, 5, 'Entry Date:')
            self.cell(50, 5, breakdown['breakdown_entry'])
            self.cell(40, 5, 'Status:')
            self.cell(50, 5, breakdown['breakdown_status'])
            self.cell(40, 5, 'Comment:')
            self.cell(50, 5, breakdown['breakdown_comment'])
            self.set_y(110)
            self.cell(40, 5, 'Info:')
            self.multi_cell(150, self.get_string_height(breakdown['breakdown_info'],150), breakdown['breakdown_info'])
            self.set_y(110 + self.get_string_height(breakdown['breakdown_info'],150))
            print('Breakdown info height',self.get_string_height(breakdown['breakdown_info'],150),self.y)
          

        self.add_page()
        _blank_fill_dict()
        _display_header(f'Breakdown List #{breakdown["breakdown_no"]}')
        _display_info()
        _display_table(breakdown['breakdown_items'])

        self.ln()
        self.set_font('Arial', 'B', 12)
        self.cell(100)
        self.cell(60, 5, 'Breakdown Total Amount')
        self.cell(30, 5, str(breakdown['breakdown_debit_amount']))