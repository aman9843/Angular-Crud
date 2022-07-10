import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './app/services/login.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let authReq = request;
    const token = this.loginService.getToken();
    if(token != null) {
      authReq = authReq.clone({
        setHeaders: {Authorization: `${token}`}
      })
    }



    return next.handle(authReq);



  }
}

export const authInterceptorProvider = [

  {
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true,
  },

]



