import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service'
import { Router,ActivatedRoute,Params } from '@angular/router'

@Component({
  selector: 'app-succes',
  templateUrl: './succes.component.html',
  styleUrls: ['./succes.component.css']
})
export class SuccesComponent implements OnInit {

  constructor(private activatedRouted:ActivatedRoute,private router:Router,private servicio2:UsuarioService) { }

  ngOnInit(): void {
    this.activatedRouted.queryParams.subscribe(params =>{
      const idcorr = params['correo'];
      this.validar(idcorr);
    });
  }

  async validar(correo){
    let corr ={
      correo:correo
    }
    this.servicio2.vefificarRegistro(corr)
    .subscribe(()=> console.log('Vefificacion Exitosa'));
    alert('Su cuenta Fue Verifica con EXITO \n Ahora ya puedo iniciar secion');
    this.router.navigateByUrl('/login');
  }

}
