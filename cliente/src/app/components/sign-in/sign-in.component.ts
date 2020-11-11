import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  variable:any=['a','b'];
  encontrado: boolean = false;
  USUARIOS: any = [];
  CARRITOS: any = [];
  USER: any = {
    correo: "",
    contrasenia: ""
  }
  usr: any = {};

  constructor(private servicio:LoginService,private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  async loginuser():Promise<void>{
    if(this.USER.correo !=="" && this.USER.contrasenia !==""){
      this.servicio.login(this.USER).subscribe((data)=> this.axuliar2(data));
    }else{
      this.toastr.error('Faltan Parametros Obligatorios','ERROR FATAL');
    }
  }

  async axuliar2(data){
    if(data.error ==true){
      localStorage.setItem('UsuarioL',JSON.stringify(data));
      localStorage.setItem('logeado','true');
      this.toastr.success('Inicio de seccion','EXITO');
      this.router.navigateByUrl('/perfil');

    }else{
      this.toastr.error('Credenciales Incorrectas','ERROR FATAL');
      localStorage.clear();
    }
  }

}
