import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
//pour get les données aprés login du user et accées l'autorisation de get sinon pas de reception aucune données
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        const token = localStorage.getItem('AuthToken');
        if (localStorage.getItem('AuthToken') ) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('AuthToken')
            )});

          }
          return next.handle(req);

    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
