import {  HttpInterceptorFn  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest,HttpEvent,HttpHandler,HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable()
export class jwtInterceptor implements HttpInterceptor {
  
  constructor (){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = sessionStorage.getItem('token')
    if (token) {
   
      const request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(request);
    }

    return next.handle(req);
    
     
  }
  

}
// import { HttpInterceptorFn } from '@angular/common/http';

// export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = sessionStorage.getItem('token');
  
//   if (token) {
//     const clonedRequest = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     return next(clonedRequest);
//   }

//   return next(req);
// };
