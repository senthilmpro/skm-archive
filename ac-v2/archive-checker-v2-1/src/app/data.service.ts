import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers(name) {
    return this.http.get('/api/user/' + name);
  }

  getAllUsers(){
    return this.http.get('/api/users');
  }

}