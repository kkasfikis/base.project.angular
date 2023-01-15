import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot,CanActivate,Router,RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate{

    constructor( private authService : AuthService, private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.checkIsUserAuthenticated();
    }
    
    private checkIsUserAuthenticated(){
        if(this.authService.getUser() != undefined){
            return true;
        }
        this.redirectToLogin();
        return false;
    }

    private redirectToLogin(){
        this.router.navigate(['/login']);
    }
}

@Injectable({providedIn : 'root'})
export class AdminGuard implements CanActivate{

    constructor( private authService : AuthService, private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.checkIsUserAuthenticated() && this.checkIsUserAdmin();
    }
    
    private checkIsUserAuthenticated(){
        if(this.authService.getUser() != undefined){
            return true;
        }
        this.redirectToLogin();
        return false;
    }

    private checkIsUserAdmin(){
        if(this.authService.getUser().roles.includes('administrator')){
            return true;
        }
        this.redirectToUnauthorized();
        return false;
    }

    private redirectToLogin(){
        this.router.navigate(['/login']);
    }

    private redirectToUnauthorized(){
        this.router.navigate(['/unauthorized']);
    }
}