import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';
import { SesionService } from 'src/app/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  publicaciones: any = [];

  publicacion: any = {
    username: "",
    contenido: ""
  }

  sesionUser: any = {
    nombre: "",
    username: "",
    foto: ""
  };

  file: any;
  extension: string;
  base64: string;
  name: string;

  constructor(private servicio: ServicioService, private sesion: SesionService, private router: Router) { }

  ngOnInit(): void {
    if(this.sesion.getSesionUser() == null){ //sesion no iniciada
      this.router.navigate(['/login']);
    }
    else{
      this.sesionUser = this.sesion.getSesionUser();
      this.publicacion.username = this.sesionUser.username;
      this.getPosts();
    }
  }

  ngOnDestroy(): void {
    
  }

  getPosts(){
    this.servicio.obtenerPublicaciones().subscribe(
      res => {
        this.publicaciones = []; //vacio el arreglo
        this.publicaciones = res['Publicaciones'];
        this.publicaciones = this.publicaciones.reverse();
      },
      err => {
        console.log(err);
      }
    )
  }
  
  publicar(){
    this.servicio.crearPublicacion(this.publicacion).subscribe(
      res => {
        this.getPosts();
        this.publicacion = {};
        this.publicacion.username = this.sesionUser.username;
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

      this.publicacion.base64 = this.base64;
      this.publicacion.extension = this.extension;
    }
  }

}
