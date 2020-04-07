import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';
import { SesionService } from 'src/app/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  user: any = {
    nombre: "",
    username: "",
    pass: "",
    foto: ""
  }

  nuevaFoto: any = {
    nombre: "",
    username: "",
    pass: "",
    extension: "",
    base64: ""
  }

  newSesionUser: any = {};

  fotoperfil: string = "";

  file: any;
  extension: string;
  base64: string;
  name: string;

  constructor(private servicio: ServicioService, private sesion: SesionService, private router: Router) { }

  ngOnInit(): void {
    if(this.sesion.getSesionUser() == null){ //sesion iniciada
      this.router.navigate(['/login']);
    }
    this.user = this.sesion.getSesionUser();
    this.fotoperfil = this.user.foto;
  }

  actualizar(){
    if(this.nuevaFoto.base64 != ""){ // con foto
      this.servicio.modificarPerfil(this.nuevaFoto).subscribe(
        res =>{
          this.actualizarSesion(this.nuevaFoto.username);
          this.router.navigate(['/home']);
        },
        err => {
          console.log(err);
        }
      )
    }
    else{
      this.servicio.modificarPerfil(this.user).subscribe(
        res =>{
          this.actualizarSesion(this.user.username);
          this.router.navigate(['/home']);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  actualizarSesion(user: string){
    this.servicio.obtenerUser({ username: user }).subscribe(
      res => {
        this.newSesionUser = res[0];
        delete this.newSesionUser.pass;
        console.log(res[0]);
        this.sesion.setSesionUser(this.newSesionUser);
      },
      err => {
        console.log(err);
      }
    )
  }

  cancelar(){
    this.router.navigate(['/home']);
  }

  changeListener($event) : void {
    this.file = $event.target.files[0];
    if(this.file != null){
      this.getFile(this.file);
    }
  }

  getFile(newFile) {
    const reader = new FileReader();
    reader.readAsDataURL(newFile);
    reader.onload = (e) => {
      this.name = newFile.name.split('.')[0];
      this.base64 = reader.result as string;
      this.base64 = this.base64.split(',')[1];
      this.extension = newFile.name.split('.')[1];

      this.fotoperfil = e.target.result.toString();

      this.nuevaFoto.base64 = this.base64;
      this.nuevaFoto.extension = this.extension;
      this.nuevaFoto.nombre = this.user.nombre;
      this.nuevaFoto.pass = this.user.pass;
      this.nuevaFoto.username = this.user.username;
    }
  }

}
