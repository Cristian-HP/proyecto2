import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  imageForm: FormGroup;
  image: any = "../../../assets/upload1.png";
  file:any;
  usuario:any;
  publicacion:any ={
    id_publicacion:0,
    palabra:""
  };
  NEW_PRODUCT: any = {
    nombre: "",
    detalle_producto: "",
    precio: 0.0,
    fotoproducto: "",
    categoria: "",
    id_usuario: 0,
    palabras: ""
  };
  constructor(private toastr: ToastrService, private router: Router,private servicio: ProductoService) { }

  ngOnInit(): void {
    this.imageForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      file: new FormControl(null, Validators.required)
    });
    if ('true'===localStorage.getItem('logeado')) {
      this.usuario=JSON.parse(localStorage.getItem('UsuarioL'));
    }else{
      this.router.navigateByUrl('/login');
    }
  }


  insertProducto() {
    if (this.NEW_PRODUCT.nombre !== "" && this.NEW_PRODUCT.detalle_producto !== "" && this.NEW_PRODUCT.precio > 0 && this.NEW_PRODUCT.fotoproducto !== "" && this.NEW_PRODUCT.categoria !== "" && this.NEW_PRODUCT.palabras !== "") {
      //this.toastr.success('Parametros Completos','EXITO');
      this.NEW_PRODUCT.id_usuario=this.usuario.id_usuario;
      this.NEW_PRODUCT.fotoproducto="http://192.168.1.33:8080/"+this.NEW_PRODUCT.fotoproducto;
      this.servicio.postProducto(this.NEW_PRODUCT)
          .subscribe((data) => this.auxiliar(data));
    } else {
      this.toastr.success(this.usuario.id_usuario);
      this.toastr.error('Faltan Parametros \n OBLIGATORIOS', 'ERROR FATAL')
    }
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.NEW_PRODUCT.avatar = event.target.files[0]
        this.NEW_PRODUCT.fotoproducto = event.target.files[0].name;
        reader.onload = function load() {
          this.image = reader.result;
        }.bind(this);
        this.file = file;
      }
    } else {

    }
  }

  async auxiliar(data){
    if (data.status === "ERROR2") {
      this.toastr.error('Ocurrio un ERROR al tratar \n De Publicar su Producto \n Intentarlo denuevo mas Tarde','FATAL ERROR');
    } else {
      this.servicio.getidpublicion().subscribe((data) => this.auxiliar2(data));
      this.servicio.uploadImage(this.NEW_PRODUCT.avatar)
      .subscribe(() => console.log('ok3'));
    }
  }

  async auxiliar2(data){
    this.publicacion.id_publicacion=data.id_publicacion;
    let pala = this.NEW_PRODUCT.palabras.split(",");
    for (let elemento of pala){
      this.publicacion.palabra=elemento;
      this.servicio.postpalabra(this.publicacion)
        .subscribe((data)=>console.log('okpalabra'));
    }
    this.toastr.success(this.publicacion.id_publicacion);
    this.toastr.success('SU Producto fue \n Publicado con Exito','EXITO');
    this.router.navigateByUrl('/newproducto');
    this.publicacion.id_publicacion=0;
    this.publicacion.palabra="";
    this.NEW_PRODUCT.nombre="";
    this.NEW_PRODUCT.detalle_producto= "";
    this.NEW_PRODUCT.precio= 0.0;
    this.NEW_PRODUCT.fotoproducto="";
    this.NEW_PRODUCT.categoria= "";
    this.NEW_PRODUCT.id_usuario= 0;
    this.NEW_PRODUCT.palabras="";

  }


}
