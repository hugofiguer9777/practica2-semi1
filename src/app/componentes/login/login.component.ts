import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';
import { SesionService } from 'src/app/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: any = {
    "username": "",
    "pass": ""
  };

  constructor(private servicio: ServicioService, private sesion: SesionService, private router: Router) { }

  ngOnInit(): void {
    if(this.sesion.getSesionUser() != null){ //sesion iniciada
      this.router.navigate(['/home']);
    }
  }

  login(){
    if(this.user.username != "" && this.user.pass != "")
    {
      this.servicio.validarUsuario(this.user).subscribe(
        res => {
          console.log(res);
          if(res['valid'] == 1){
            this.user.foto = res['foto'];
            this.user.nombre = res['nombre'];
            delete this.user.pass;
            this.sesion.setSesionUser(this.user);
            this.router.navigate(['/home']);
          }
          else{
            alert("Usuario o contraseña incorrecta");
          }
        },
        err => {
          console.error(err);
        }
      )
    }
    else{
      alert("campos incompletos");
    }
  }

}
