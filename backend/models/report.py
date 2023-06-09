from fpdf import FPDF
from datetime import datetime
class CreditNoteReport(FPDF):
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

    def generate_disbursement_account_report(self, da : dict):
        pass

    def generate_final_disbursement_account_report(self, fda : dict):
        pass

    def generate_consolidated_state_of_account_report(self , csoa :dict):
        pass

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
            print('Item',index,self.y,remaining_height)
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
                print('changed page',remaining_height)
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
