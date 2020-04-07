import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  API = 'http://54.219.139.14:3000';

  constructor(private http: HttpClient) { }

  validarUsuario(user: any){
    return this.http.post(`${this.API}/login`, user);
  }

  crearUsuario(user: any){
    return this.http.post(`${this.API}/registrar`, user);
  }

  obtenerPublicaciones(){
    return this.http.get(`${this.API}/publicaciones`);
  }

  crearPublicacion(post: any){
    return this.http.post(`${this.API}/publicar`, post);
  }

  obtenerUser(user: any){
    return this.http.post(`${this.API}/info`, user);
  }

  modificarPerfil(user: any){
    return this.http.put(`${this.API}/modificar`, user);
  }
}
