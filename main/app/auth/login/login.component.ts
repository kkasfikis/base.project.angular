import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormClassName, FormFieldBase, FormFieldType } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
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
  loginFields : FormFieldBase[] =[
    {
      className : FormClassName.FormFieldBase,
      value : new BehaviorSubject<any>(''),
      type : FormFieldType.TextBox,
      key : 'username',
      label : 'Username',
      order: 1,
      enabled : new BehaviorSubject<boolean>(true),
      required : new BehaviorSubject<boolean>(true),
      minLength : new BehaviorSubject<number>(3),
      maxLength : new BehaviorSubject<number>(20),
      regexPattern : new BehaviorSubject<string>(''),
      width : 100,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase,
    {
      className : FormClassName.FormFieldBase,
      value : new BehaviorSubject<any>(''),
      type : FormFieldType.TextBox,
      key : 'password',
      label : 'Password',
      order: 1,
      enabled : new BehaviorSubject<boolean>(true),
      required : new BehaviorSubject<boolean>(true),
      minLength : new BehaviorSubject<number>(3),
      maxLength : new BehaviorSubject<number>(20),
      regexPattern : new BehaviorSubject<string>(''),
      width : 100,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase
  ] as FormFieldBase[]

  ngOnInit(): void {
  }

  login(data : any){
    this.authService.login(data['username'],data['password']).subscribe({
      next : (resp : any) => {
        console.log(JSON.stringify(resp))
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
