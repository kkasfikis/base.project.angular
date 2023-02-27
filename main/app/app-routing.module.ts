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
import { InvoiceComponent } from './administrator/invoice/invoice.component';
import { PortComponent } from './administrator/port/port.component';
import { PredefinedComponent } from './administrator/predefined/predefined.component';
import { SOAComponent } from './administrator/soa/soa.component';
import { StaffComponent } from './administrator/staff/staff.component';
import { SupplierComponent } from './administrator/supplier/supplier.component';
import { UserManagementComponent } from './administrator/user-management/user-management.component';
import { VesselComponent } from './administrator/vessel/vessel.component';
import { AdminGuard } from './auth/auth.guard';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UnauthorizedComponent } from './auth/unauthorized/unauthorized.component';
const routes: Routes = [
  {path:'',redirectTo:'about',pathMatch:'full'},
  {path:'about',component: AboutComponent},
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'changePassword',component: ChangePasswordComponent},
  {path:'unauthorized',component: UnauthorizedComponent},
  
  //Administrator
  {path:'port',component:PortComponent,canActivate:[AdminGuard]},
  {path:'vessel',component:VesselComponent,canActivate:[AdminGuard]},
  {path:'client',component:ClientComponent,canActivate:[AdminGuard]},
  {path:'agent',component:AgentComponent,canActivate:[AdminGuard]},
  {path:'call',component:CallComponent,canActivate:[AdminGuard]},
  {path:'supplier',component:SupplierComponent,canActivate:[AdminGuard]},
  {path:'expense',component:ExpenseComponent,canActivate:[AdminGuard]},
  {path:'bankAccount',component:BankAccountComponent,canActivate:[AdminGuard]},
  {path:'staff',component:StaffComponent,canActivate:[AdminGuard]},
  {path:'predefined',component:PredefinedComponent,canActivate:[AdminGuard]},
  {path:'charge',component:ChargeComponent,canActivate:[AdminGuard]},
  {path:'soa',component:SOAComponent,canActivate:[AdminGuard]},
  {path:'csoa',component:CSOAComponent,canActivate:[AdminGuard]},
  {path:'breakdown',component:BreakdownComponent,canActivate:[AdminGuard]},
  {path:'invoice',component:InvoiceComponent,canActivate:[AdminGuard]},
  {path:'userManagement',component:UserManagementComponent,canActivate:[AdminGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
