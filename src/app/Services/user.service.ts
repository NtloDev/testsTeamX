import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../Models/user.model";
import {environment} from "../../environments/environment";
import  { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user` , user) ;

  }

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(`${this.apiUrl}/users`) ;
  }

  getOneUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${id}`) ;
  }

  updateUser(id: string , user: User): Observable<User>{
    return this.http.patch<User>(`${this.apiUrl}/user/${id}` , user) ;

  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/user/${id}`) ;
  }
}
