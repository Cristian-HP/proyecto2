import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { toTypeScript } from '@angular/compiler';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css']
})
export class AddcarComponent implements OnInit {

  producto: any;
  usuario:any;
  pabra:any;
  COMENTARIOS: any = [];
  comentario: any = {
    descripcion: "",
    id_publicacion: 0,
    autor:""

  }
  constructor(private router: Router,private servicio: ProductoService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.pabra= this.servicio.getPalabrasVer();
    this.producto = this.servicio.getProductoVer();
    this.getComentarios();
    if ('true'===localStorage.getItem('logeado')) {
      this.usuario=JSON.parse(localStorage.getItem('UsuarioL'));
    }else{
      this.router.navigateByUrl('/login');
    }
    
  }

  postComentario(){
    this.comentario.id_publicacion=this.producto.id_publicacion;
    this.comentario.autor = this.usuario.nombre;
    if(this.comentario.descripcion!==""){
      this.servicio.postcomentario(this.comentario)
          .subscribe((data) => this.auxiliar(data));
    }else{
      this.toastr.warning('No se puedo comentar \n en blanco','ALERTA')
    }
  }

  async auxiliar(data){
    if (data.status === "ERROR2") {
      this.toastr.error('Ocurrio un ERROR al tratar \n De Publicar su Comentario \n Intentarlo denuevo mas Tarde','FATAL ERROR');
    } else {
      this.toastr.success('SU Comentario Fue Publicado','EXITO')
      this.comentario.descripcion="";
      this.getComentarios();
    }
  }

  public getComentarios() {
    let aux2:any={
      id_publicacion:""
    };

    aux2.id_publicacion=this.producto.id_publicacion;
    this.servicio.getcomentario(aux2)
      .subscribe( data => {
        this.COMENTARIOS = data;
      })
  }

}
