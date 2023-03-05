import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
import { FormFieldBase, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import * as data from './change-password.ui-config.json'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  formFields : (BehaviorSubject<FormFieldBase> | BehaviorSubject<SubForm>)[] = []
  constructor(private authService : AuthService, private toastr : ToastrService, private router : Router) { }
  
  ngOnInit(): void {
    let result = JsonHelpers.convertFromJson(data);
    this.formFields = result.fields;
  }

  changePassword(data : any){
    this.authService.login(data['username'],data['password']).subscribe({
      next : (resp : any) => {
        if (resp && resp.login){
          if(!this.authService.setUser(resp.token)){
            this.toastr.error('Failed to decode JWT', 'error');
          }
          this.router.navigate(['/']);
          this.toastr.success(resp.message,'Success')
        }
        else{
          this.toastr.error(resp.message,'Error')
        }
      }
    })
  }
}
