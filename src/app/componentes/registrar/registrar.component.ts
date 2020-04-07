import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';
import { SesionService } from 'src/app/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  user: any = {
    nombre: "",
    username: "",
    pass: ""
  }

  sesionUser: any = {};

  username: any = {
    username: ""
  }

  fotoperfil: string = "";

  confirmar: string;

  file: any;
  extension: string;
  base64: string;
  name: string;

  constructor(private servicio: ServicioService, private sesion: SesionService, private router: Router) { }

  ngOnInit(): void {
    if(this.sesion.getSesionUser() != null){ //sesion iniciada
      this.router.navigate(['/home']);
    }
  }

  registrarse() {
    if(this.user.username != "" && this.user.pass != "" && this.confirmar != "")
    {
      if(this.user.pass == this.confirmar) {
        this.servicio.crearUsuario(this.user).subscribe(
          res => {
            if(res['Message'] == "Insertado"){
              this.username.username = this.user.username;
              this.getInfo();
            }
            else {
              alert("Error al crear el usuario");
            }
          },
          err => {
            console.log(err);
          }
        )
      }
      else {
        alert("La contraseña no coincide");
      }
    }
    else {
      alert("Campos vacios");
    }
  }

  getInfo(){
    this.servicio.obtenerUser(this.username).subscribe(
      res => {
        this.sesionUser = res[0];
        delete this.sesionUser.pass;
        this.sesion.setSesionUser(this.sesionUser);
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    )
  }

  changeListener($event) : void {
    this.file = $event.target.files[0];
    if(this.file != null){
      this.getFile(this.file);
    }
  }

  getFile(newFile) {
    console.log(newFile);
    const reader = new FileReader();
    reader.readAsDataURL(newFile);
    reader.onload = (e) => {
      this.name = newFile.name.split('.')[0];
      this.base64 = reader.result as string;
      this.base64 = this.base64.split(',')[1];
      this.extension = newFile.name.split('.')[1];

      this.fotoperfil = e.target.result.toString();

      this.user.base64 = this.base64;
      this.user.extension = this.extension;
    }
  }
}
