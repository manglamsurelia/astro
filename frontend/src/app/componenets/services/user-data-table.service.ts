import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataTableService {

  url = environment.apiUrl 
  constructor(public httpClient:HttpClient) {
    
   }

   public allUsersData():Observable<any>{
    return this.httpClient.get(this.url + 'api/userData/showUserDataTable');
   }
   public deleteUserData(id):Observable<any>{
    return this.httpClient.delete(this.url + `api/userData/delete-UserDataTable/${id}`);
   }
   public addNewUserData(data):Observable<any>{
    return this.httpClient.post(this.url +'api/userData/create-UserDataTable', data)
   }
   public updateUserData(data,id):Observable<any>{
    return this.httpClient.patch(this.url + `api/userData/update-UserDataTable/${id}`,data)
   }
}
