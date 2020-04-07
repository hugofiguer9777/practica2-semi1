import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor() { }

  setSesionUser(user: any){
    localStorage.setItem('sesion', JSON.stringify(user));
  }

  setLogOut(){
    localStorage.removeItem('sesion');
  }

  getSesionUser(){
    return JSON.parse(localStorage.getItem('sesion'));
  }
}
