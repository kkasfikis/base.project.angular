import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormFieldBase, FormFieldType } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService, private toastr : ToastrService, private router : Router) { }
  enabledSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loginFields : BehaviorSubject<FormFieldBase>[] =[
    new BehaviorSubject<FormFieldBase>({
      value : '',
      type : FormFieldType.TextBox,
      key : 'username',
      label : 'Username',
      order: 1,
      enabled : true,
      required : true,
      minLength : 3,
      maxLength : 20,
      regexPattern : '',
      width : 100,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase),
    new BehaviorSubject<FormFieldBase>({
      value : '',
      type : FormFieldType.TextBox,
      key : 'password',
      label : 'Password',
      order: 1,
      enabled : true,
      required : true,
      minLength : 3,
      maxLength : 20,
      regexPattern : '',
      width : 100,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase)
  ] as BehaviorSubject<FormFieldBase>[]

  ngOnInit(): void {
  }

  login(data : any){
    this.authService.login(data['username'],data['password']).subscribe({
      next : (resp : any) => {
        //console.log(JSON.stringify(resp))
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
