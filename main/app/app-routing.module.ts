import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AgentComponent } from './administrator/agent/agent.component';
import { BankAccountComponent } from './administrator/bank-account/bank-account.component';
import { BreakdownComponent } from './administrator/breakdown/breakdown.component';
import { CallComponent } from './administrator/call/call.component';
import { ChargeComponent } from './administrator/charge/charge.component';
import { ClientComponent } from './administrator/client/client.component';
import { CSOAComponent } from './administrator/csoa/csoa.component';
import { ExpenseComponent } from './administrator/expense/expense.component';
import { ProformaComponent } from './administrator/proforma/proforma.component';
import { PortComponent } from './administrator/port/port.component';
import { PredefinedComponent } from './administrator/predefined/predefined.component';
import { SOAComponent } from './administrator/soa/soa.component';
import { StaffComponent } from './administrator/staff/staff.component';
import { SupplierComponent } from './administrator/supplier/supplier.component';
import { UserManagementComponent } from './administrator/user-management/user-management.component';
import { VesselComponent } from './administrator/vessel/vessel.component';
import { AgentCallComponent } from './agent/agent-call/agent-call.component';
import { AdminGuard, AgentGuard, CaptainGuard, ClientGuard } from './auth/auth.guard';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UnauthorizedComponent } from './auth/unauthorized/unauthorized.component';
import { CaptainCallComponent } from './captain/captain-call/captain-call.component';
import { ProformaTemplateComponent } from './administrator/proforma-template/proforma-template.component';
import { ClientProformaComponent } from './client/client-proforma/client-proforma.component';
import { ClientBreakdownComponent } from './client/client-breakdown/client-breakdown.component';
import { CreditNoteComponent } from './administrator/credit-note/credit-note.component';
import { DebitNoteComponent } from './administrator/debit-note/debit-note.component';
import { DisbursementAccountComponent } from './administrator/disbursement-account/disbursement-account.component';
const routes: Routes = [
  {path:'',redirectTo:'about',pathMatch:'full'},
  {path:'about',component: AboutComponent},
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'changePassword',component: ChangePasswordComponent},
  {path:'unauthorized',component: UnauthorizedComponent},
  
  //Administrator
  {path:'admin/port',component:PortComponent,canActivate:[AdminGuard]},
  {path:'admin/vessel',component:VesselComponent,canActivate:[AdminGuard]},
  {path:'admin/client',component:ClientComponent,canActivate:[AdminGuard]},
  {path:'admin/agent',component:AgentComponent,canActivate:[AdminGuard]},
  {path:'admin/call',component:CallComponent,canActivate:[AdminGuard]},
  {path:'admin/supplier',component:SupplierComponent,canActivate:[AdminGuard]},
  {path:'admin/expense',component:ExpenseComponent,canActivate:[AdminGuard]},
  {path:'admin/bankAccount',component:BankAccountComponent,canActivate:[AdminGuard]},
  {path:'admin/staff',component:StaffComponent,canActivate:[AdminGuard]},
  {path:'admin/predefined',component:PredefinedComponent,canActivate:[AdminGuard]},
  {path:'admin/charge',component:ChargeComponent,canActivate:[AdminGuard]},
  {path:'admin/soa',component:SOAComponent,canActivate:[AdminGuard]},
  {path:'admin/csoa',component:CSOAComponent,canActivate:[AdminGuard]},
  {path:'admin/breakdown',component:BreakdownComponent,canActivate:[AdminGuard]},
  {path:'admin/proforma',component:ProformaComponent,canActivate:[AdminGuard]},
  {path:'admin/proformaTemplate',component:ProformaTemplateComponent,canActivate:[AdminGuard]},
  {path:'admin/userManagement',component:UserManagementComponent,canActivate:[AdminGuard]},
  {path:'admin/credit',component:CreditNoteComponent,canActivate:[AdminGuard]},
  {path:'admin/debit',component:DebitNoteComponent,canActivate:[AdminGuard]},
  {path:'admin/disbursement',component:DisbursementAccountComponent,canActivate:[AdminGuard]},

  //Captain
  {path:'captain/call',component:CaptainCallComponent,canActivate:[CaptainGuard]},
  
  //Agent
  {path:'agent/call',component:AgentCallComponent,canActivate:[AgentGuard]},

  //Client
  
  {path:'client/proforma',component:ClientProformaComponent,canActivate:[ClientGuard]},
  {path:'client/breakdown',component:ClientBreakdownComponent,canActivate:[ClientGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
