import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn : 'root'})
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let user = this.authService.getUser()
        let token = user?.token;
        
        let headers : HttpHeaders;
        if(user && token){
            headers = req.headers.set('Authorization', `Bearer ${user.token}`);         
        }
        else{
            headers = req.headers;
        }
        let authReq = req.clone({headers});
        
        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMsg = '';
                
                if (error.error instanceof ErrorEvent) {
                    errorMsg = `Client Side Error: ${error.error.message}`;
                } else {
                    errorMsg = `Server Side Error Code: ${error.status},  Message: ${error.message}`;
                }

                if(error && error.status && (error.status == 401 || error.status == 403)){
                    if(user && token){
                        this.router.navigate(['/unauthorized']);
                    }
                    else{
                        this.router.navigate(['/login']);
                    }
                }

                console.error(errorMsg);
                return throwError( () => new Error(errorMsg));
            })
        )
    }
}