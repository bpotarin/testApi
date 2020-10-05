import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  serverUrl = 'http://localhost:3000/';

  getEmpList(): Observable<any> {
    let url = this.serverUrl + 'emps/listEmps';
    return this.http.get(url);
  }

  checkLogin(loginUser): Observable<any> {
    //console.log(loginUser);
    return this.http.post(this.serverUrl + 'login', { loginUser });
  }
}
