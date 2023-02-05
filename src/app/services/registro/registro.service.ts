import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  httpHeaders = new HttpHeaders({ "Content-type": "application/json"});  

  constructor(private http: HttpClient) { }

  registrar(body:any) {
    return this.http.post("http://localhost:8080/usuarios/registro", body, { headers: this.httpHeaders });
  }
}
