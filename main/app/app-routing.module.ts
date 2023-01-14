import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AgentComponent } from './administrator/agent/agent.component';
import { CallComponent } from './administrator/call/call.component';
import { ClientComponent } from './administrator/client/client.component';
import { PortComponent } from './administrator/port/port.component';
import { SupplierComponent } from './administrator/supplier/supplier.component';
import { VesselComponent } from './administrator/vessel/vessel.component';
import { AdminGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { UnauthorizedComponent } from './auth/unauthorized/unauthorized.component';
import { TestComponent } from './test/test.component';
const routes: Routes = [
  {path:'',redirectTo:'about',pathMatch:'full'},
  {path:'about',component: AboutComponent},
  {path:'login',component: LoginComponent},
  {path:'unauthorized',component: UnauthorizedComponent},
  
  //Administrator
  {path:'port',component:PortComponent,canActivate:[AdminGuard]},
  {path:'vessel',component:VesselComponent,canActivate:[AdminGuard]},
  {path:'client',component:ClientComponent,canActivate:[AdminGuard]},
  {path:'agent',component:AgentComponent,canActivate:[AdminGuard]},
  {path:'call',component:CallComponent,canActivate:[AdminGuard]},
  {path:'supplier',component:SupplierComponent,canActivate:[AdminGuard]},
  {path:'test',component:TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
