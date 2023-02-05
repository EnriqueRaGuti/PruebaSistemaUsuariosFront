import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpHeaders = new HttpHeaders({ "Content-type": "application/json"});  

  constructor(private http: HttpClient) { }

  login(body:any) {
    return this.http.post("http://localhost:8080/generate-token", body, { headers: this.httpHeaders });
  }

  public getToken(){
    return localStorage.getItem('token');
  }
}
