import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaisService } from '../../services/pais.service'
import { UsuarioService } from '../../services/usuario.service'
import { FormControl,FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  imageForm : FormGroup;
  image:any = "../../../assets/upload1.png";
  file:any;
  actualizar = false;
  login: any;
  usuario: any;
  Nuevo: any;
  PAISES: any = [];
  NUEVO2: any = {
    contrasenia2: "",
    contrasenia1:"",
    fotografia2: "false"
  }
  constructor(private toastr:ToastrService,private servicio: PaisService, private router: Router,private servicio2: UsuarioService) { }

  ngOnInit(): void {
    this.getPais();
    this.imageForm = new FormGroup({
      name:new FormControl(null,Validators.required),
      file:new FormControl(null,Validators.required)
    });
    if ('true'===localStorage.getItem('logeado')) {
      this.toastr.success('EXITO');
      this.usuario= JSON.parse(localStorage.getItem('UsuarioL'));
      let envi= {id:""};
      envi.id = this.usuario.id_pais;
      let paisna=this.servicio.postpais(envi).subscribe( data=>{
        this.usuario.pais = data;
      })
      this.usuario.fecha_nacimiento = this.usuario.fecha_nacimiento.replace("/","-");
      this.usuario.fecha_nacimiento = this.usuario.fecha_nacimiento.substring(0,10);
      console.log(this.usuario.fecha_nacimiento);
    }else{
      this.router.navigateByUrl('/login');
    }
  }
  updateUser(mostrar?: boolean) {
    this.actualizar = mostrar;
    this.getPais();
    this.imageForm = new FormGroup({
      name:new FormControl(null,Validators.required),
      file:new FormControl(null,Validators.required)
    })
    console.log("acutaliza")
  }

  onFileChange(event){
    if (event.target.files && event.target.files.length> 0){
      const file = event.target.files[0];
      if(file.type.includes("image")){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.usuario.avatar = event.target.files[0]
        this.usuario.foto = event.target.files[0].name;
        this.NUEVO2.fotografia2="true";
        reader.onload = function load(){
          this.image = reader.result;
        }.bind(this);
        this.file = file;
      }
    }else{
      
    }
  }

  update(){
    if(this.NUEVO2.fotografia2==="true"){
      this.usuario.foto = "http://192.168.1.33:8080/"+this.usuario.foto;
      this.servicio2.uploadImage(this.usuario.avatar)
          .subscribe(() => console.log('ok3'));
    }else{
      this.usuario.fotografia=this.usuario.foto;
    }
    if(this.NUEVO2.contrasenia1!==""){
      if(this.NUEVO2.contrasenia1===this.NUEVO2.contrasenia2){
        this.usuario.contrasenia = this.NUEVO2.contrasenia1;
      }else{
        //this.toastr.info(this.usuario.pais.nombre);
        this.toastr.error('ERROR LA Contraseña \n No Coincide','FATAL ERROR');
      }
    }
    this.PAISES.forEach(element => {
      if (element.nombre === this.usuario.pais.nombre) {
        this.usuario.id_pais = element.id_pais;
      }
    });


    this.servicio2.updateUsuario(this.usuario)
      .subscribe( (data)=> this.auxiliar(data) );

  }

  public getPais() {
    this.servicio.pais()
      .subscribe(data => {
        this.PAISES = data;
      })
  }

  async auxiliar(data){
    if (data.status === "ERROR2") {
      this.toastr.error('Ocurrio un ERROR al tratar \n De Actualizar su Cuenta Favor \n Intentarlo denuevo mas Tarde','ERROR FATAL');
    } else {
      this.toastr.success('Su Cuenta ha \n Sido Actualizada','EXITO')
      this.actualizar = false;
      localStorage.clear();
      localStorage.setItem('UsuarioL',JSON.stringify(this.usuario));
      localStorage.setItem('logeado','true');
    }
  }
}
