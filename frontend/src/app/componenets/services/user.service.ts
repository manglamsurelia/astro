import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl 
  constructor(public httpClient:HttpClient) {
    
   }
   
   public login(user):Observable<any>{
    return this.httpClient.post(this.url + 'api/auth/login',user);
   }
   public userList():Observable<any>{
    return this.httpClient.get(this.url +'api/auth/all-user');
   }
   public addUsers(userData):Observable<any>{
    return this.httpClient.post(this.url+'api/auth/registration',userData);
   }
   public changePass(userData):Observable<any>{
    return this.httpClient.patch(this.url+'api/auth/change-password',userData);
   }
   public createTodo(userData):Observable<any>{
    return this.httpClient.post(this.url+'api/todo/create-todo-list',userData);
   }
   public getAllTodos():Observable<any>{
    return this.httpClient.get(this.url+'api/todo/show-todo-list');
   }
   public updateTodo(todoData):Observable<any>{
    return this.httpClient.patch(this.url +'api/todo/update-todo-list',todoData);
   }
   public deleteTodo(todoId):Observable<any>{
    return this.httpClient.delete(this.url +`api/todo/delete-todo-list/${todoId}`)
   }
   public editTodo(todo):Observable<any>{
    return this.httpClient.patch(this.url +'api/todo/update-todo-list',todo);
   }
   ///Client Api calls
   public allClient():Observable<any>{
    return this.httpClient.get(this.url + 'api/clientTracking/showClients');
   }
   public deleteClient(id):Observable<any>{
    return this.httpClient.delete(this.url + `api/clientTracking/delete-client/${id}`);
   }
   public addNewClient(data):Observable<any>{
    return this.httpClient.post(this.url +'api/clientTracking/create-client', data)
   }
   public updateClient(data,id):Observable<any>{
    return this.httpClient.patch(this.url + `api/clientTracking/update-client/${id}`,data)
   }
}
