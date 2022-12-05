import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicTableComponent } from './ui-components/dynamic-table/dynamic-table.component';
import { DynamicFormComponent } from './ui-components/dynamic-form/dynamic-form.component';
import { DynamicNavigatorComponent } from './ui-components/dynamic-navigator/dynamic-navigator.component';
import { DynamicFormFieldComponent } from './ui-components/dynamic-form/dynamic-form-field/dynamic-form-field.component';
import { NavMenuOptionTreeComponent } from './ui-components/dynamic-navigator/nav-menu-option-tree/nav-menu-option-tree.component';
import { SideMenuOptionTreeComponent } from './ui-components/dynamic-navigator/side-menu-option-tree/side-menu-option-tree.component';
import { ThemeSelectorComponent } from './ui-components/dynamic-navigator/theme-selector/theme-selector.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'  


import { MatButtonModule} from '@angular/material/button'
import { MatInputModule} from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule} from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox' 
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatMenuModule} from '@angular/material/menu'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule} from '@angular/material/table'
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSortModule} from '@angular/material/sort';
import { ResponsiveDynamicTableModule } from './ui-components/dynamic-table/responsive-dynamic-table/responsive-dynamic-table.module';
import { DynamicSubFormComponent } from './ui-components/dynamic-form/dynamic-sub-form/dynamic-sub-form.component';
import { DynamicInfoComponent } from './ui-components/dynamic-info/dynamic-info.component';
import { DynamicInfoFieldComponent } from './ui-components/dynamic-info/dynamic-info-field/dynamic-info-field.component';
import { DynamicInfoDialogComponent } from './ui-components/dialogs/dynamic-info-dialog/dynamic-info-dialog.component'; 
import {MatDialogModule} from '@angular/material/dialog';
import { DynamicCrudComponent } from './ui-components/dynamic-crud/dynamic-crud.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatRadioModule} from '@angular/material/radio'
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationDialogComponent } from './ui-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { VesselComponent } from './administrator/vessel/vessel.component';
import { PortComponent } from './administrator/port/port.component';
import { UnauthorizedComponent } from './auth/unauthorized/unauthorized.component';
import { AboutComponent } from './about/about.component';
import { DynamicSubFormInfoComponent } from './ui-components/dynamic-info/dynamic-sub-form-info/dynamic-sub-form-info.component';
import { ClientComponent } from './administrator/client/client.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicTableComponent,
    DynamicFormComponent,
    DynamicNavigatorComponent,
    DynamicFormFieldComponent,
    NavMenuOptionTreeComponent,
    SideMenuOptionTreeComponent,
    ThemeSelectorComponent,
    DynamicSubFormComponent,
    DynamicInfoComponent,
    DynamicInfoFieldComponent,
    DynamicInfoDialogComponent,
    DynamicCrudComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    VesselComponent,
    PortComponent,
    UnauthorizedComponent,
    AboutComponent,
    DynamicSubFormInfoComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatListModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatRadioModule,
    ResponsiveDynamicTableModule,
    ToastrModule.forRoot()
  ],
  providers: [{ provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
