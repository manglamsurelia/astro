import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  currentUrl:any;
  gettoken: any;
	payload: any = [];
  expDate:any;

  constructor(private router:Router,
    private _toastr: ToastrService) {
   this.currentUrl =  this.router.url
  //  console.log("interceptor Url",this.currentUrl)
  debugger
   /********************************************************/
try{

   this.gettoken = window.atob(localStorage.getItem("token").split(".")[1]);
		this.payload.push(JSON.parse(this.gettoken));
    this.expDate =  this.payload[0]['exp'];

    if( Math.round(Date.now() / 1000) > this.expDate)
    {
    this._toastr.warning("Session Expired Please Login Again")
    }
  }catch(e){}
   /********************************************************/
  }

//   readonly emailTypeMEssage = [
// 'http://49.12.79.8:3300/api/customers/get-tags'
//   ]

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
/***********************Loader****************************************/
    // let loadingRef: LoadingOverlayRef;
    // Promise.resolve(null).then(() => loadingRef = this.loadingService.open());
/*********************************************************************/
    const authToken = `Bearer ${localStorage.getItem("token")}`;
    const header =  {
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json , text/plain , */*",
      "Authorization": authToken,
    }
    // if(this.emailTypeMEssage.includes(request.url)){
    //   delete header["Authorization"];
    //   header['Cookie']='REACT_APP_API_URL=http%3A%2F%2F49.12.79.8%3A3300; REACT_APP_API_SUBSCRIPTION_URL=ws%3A%2F%2F49.12.79.8%3A3300%2Fsubscriptions; REACT_APP_CDN_HOST=http%3A%2F%2F49.12.79.8%3A3200; auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IlIzN0FQTEVHbzhGVHF5REo5IiwiZW1haWwiOiJhZG1pbkBlcnhlcy5pbyIsImRldGFpbHMiOnsiZnVsbE5hbWUiOiJBZG1pbiJ9LCJpc093bmVyIjp0cnVlLCJncm91cElkcyI6WyJGZURUNktFaEJ3RzRvbU45ayJdLCJicmFuZElkcyI6W10sInVzZXJuYW1lIjoiYWRtaW4ifSwiaWF0IjoxNTk2NTE4MzU4LCJleHAiOjE1OTY3Nzc1NTh9.jFLM6tPmEQZcNVgTMeiOncJhYb53Eshq7Nk37SJbv-Y';
    // }

    const authReq = request.clone({
      setHeaders: header
    });
    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
        // console.log("Event", event);
        // if (event instanceof HttpResponse && loadingRef) {
        //       loadingRef.close();
        // }
      },
      (err: any) => {
        // if (loadingRef) {
        //   loadingRef.close();
        // }
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
         return;
        }
        if(localStorage.getItem('token')){
          window.location.reload();
        }
        if(err.status ==401){
          console.log("wait till.. login")
       }
       else if(err.status ==401){
          sessionStorage.clear();
          localStorage.clear();
          window.location.reload();

        }
      }
    }));
     
  }
}


 // map((event: HttpEvent<any>) => {
      //   // if (event instanceof HttpResponse && loadingRef) {
      //   //       loadingRef.close();
      //   //     }
      //   if (event instanceof HttpResponse) {
      //     const res = event.body;
      //     // console.log("Interceptor", res);
      //     if (event.status == 401) {
      //       localStorage.clear();
      //       console.log("Invalid Token")
      //       window.location.reload(true);
      //       // route to login page with error msg  
      //     }
      //     if (res.status) {
      //       return event;
      //     }
      //     else {
      //       return event;
      //     }
      //   }
      //   else if (event instanceof HttpErrorResponse) {
      //     const res = event;
      //     console.log("Interceptor ErrorResponse", res);
      //     if (event.status == 401) {
      //       localStorage.clear();
      //       console.log("Invalid Token")
      //       window.location.reload(true);
      //       // route to login page with error msg  
      //       return event;
      //     }
      //     else {
      //       return event;
      //     }
      //   }
      //   else {
      //     return event;
      //   }
      // }));