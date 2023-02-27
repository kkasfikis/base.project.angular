import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonHelpers } from 'main/app/ui-components/dynamic-crud/json-helpers';
import { FormFieldBase, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import * as data from './register.ui-config.json'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService : AuthService, private toastr : ToastrService, private router : Router) { }

  formFields : (BehaviorSubject<FormFieldBase> | BehaviorSubject<SubForm>)[] = [] 

  ngOnInit(): void {
    let result = JsonHelpers.convertFromJson(data);
    this.formFields = result.fields;
  }

  register(data : any){
    this.authService.register(data.username,data.password,data.email,data.full_name).subscribe({
      next : (resp:any) => {
        if(resp && resp.register){
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
