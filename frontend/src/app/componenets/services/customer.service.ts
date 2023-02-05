import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = environment.apiUrl 
  constructor(public http: HttpClient) {   }

  public customerList():Observable<any>{
    return this.http.get(this.url +'api/customer/showCustomers');
  }
  
  public addCustomer(data):Observable<any>{
    return this.http.post(this.url + 'api/customer/create-customer', data);
  }
  public updateCustomer(data,id):Observable<any>{
    return this.http.patch(this.url +`api/customer/update-customer/${id}`, data);
  }
  public deleteCustomer(id):Observable<any>{
    return this.http.delete(this.url +`api/customer/delete-customer/${id}`);
  }
}
