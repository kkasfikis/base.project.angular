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
        console.log('ADMIN AUTH GUARD',this.authService.getUser().role)
        if(this.authService.getUser().role == 'administrator'){
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

@Injectable({providedIn : 'root'})
export class AgentGuard implements CanActivate{

    constructor( private authService : AuthService, private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.checkIsUserAuthenticated() && this.checkIsUserAgent();
    }
    
    private checkIsUserAuthenticated(){
        if(this.authService.getUser() != undefined){
            return true;
        }
        this.redirectToLogin();
        return false;
    }

    private checkIsUserAgent(){
        if(this.authService.getUser().role == 'agent'){
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

@Injectable({providedIn : 'root'})
export class CaptainGuard implements CanActivate{

    constructor( private authService : AuthService, private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.checkIsUserAuthenticated() && this.checkIsUserCaptain();
    }
    
    private checkIsUserAuthenticated(){
        if(this.authService.getUser() != undefined){
            return true;
        }
        this.redirectToLogin();
        return false;
    }

    private checkIsUserCaptain(){
        if(this.authService.getUser().role == 'captain'){
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