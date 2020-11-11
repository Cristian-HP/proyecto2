import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpclient:HttpClient) { }

  postUsuario(usuario:any){
    return this.httpclient.post('http://192.168.1.33:8080/usuario',usuario)
  }

  updateUsuario(usuario:any){
    return this.httpclient.post('http://192.168.1.33:8080/usuario2',usuario)
  }

  uploadImage(imagen:File){
    const formData = new FormData();
    formData.append('userImage',imagen);
    return this.httpclient.post('http://192.168.1.33:8080/imagenusuario',formData);
  }

  confimausuari(correo:any){
    return this.httpclient.post('http://192.168.1.33:8080/confirmacion',correo);
  }

  vefificarRegistro(correo:any){
    return this.httpclient.post('http://192.168.1.33:8080/verificarRegistro',correo);
  }


}
