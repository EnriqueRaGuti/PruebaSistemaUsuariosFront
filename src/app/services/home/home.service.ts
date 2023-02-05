import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  httpHeaders = new HttpHeaders({ "Content-type": "application/json"});  

  constructor(private http: HttpClient) { }

  usuarios() {
    return this.http.get("http://localhost:8080/usuarios/");
  }

  eliminarUsuario(id:any) {
    return this.http.delete("http://localhost:8080/usuarios/" + id ).toPromise();
  }

  actualizarUsuario(id:number, body:any) {
    return this.http.put("http://localhost:8080/usuarios/" + id ,body).toPromise();
  }
}
