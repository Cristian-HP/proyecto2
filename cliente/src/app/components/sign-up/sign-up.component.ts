import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service'
import { UsuarioService } from '../../services/usuario.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  NUEVO: any = {
    nombre: "",
    apellido: "",
    correo: "",
    contrasenia: "",
    fotografia: "",
    fecha_nacimiento: "",
    pais: "Guatemala"
  }
  PAISES: any = [];
  NUEVO2: any = {
    contrasenia2: "",
    fotografia2: "false"
  }
  constructor(private servicio: PaisService, private servicio2: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.getPais();
  }

  onFileChanged(event) {
    this.NUEVO.avatar = event.target.files[0]
    this.NUEVO.fotografia = event.target.files[0].name;
    document.getElementById("labelfile1").innerHTML = event.target.files[0].name;
  }

  public getPais() {
    this.servicio.pais()
      .subscribe(data => {
        this.PAISES = data;
      })
  }

  insertarUsuario() {
    if (this.NUEVO.contrasenia !== this.NUEVO2.contrasenia2) {
      alert(this.NUEVO.pais);
      alert('Las Contraseñas no Coinciden');
    } else {
      if (this.NUEVO.nombre !== "" && this.NUEVO.apellido !== "" && this.NUEVO.correo !== "" && this.NUEVO.contrasenia !== "" && this.NUEVO.fecha_nacimiento !== "") {
        this.PAISES.forEach(element => {
          if (element.nombre === this.NUEVO.pais) {
            this.NUEVO.pais = element.id_pais;
          }
        });
        if (this.NUEVO.fotografia !== "") {
          this.NUEVO.fotografia = "http://192.168.1.33:8080/" + this.NUEVO.fotografia;
          this.NUEVO2.fotografia2 = "true";
        } else {
          this.NUEVO2.fotografia2 = "false";
          this.NUEVO.fotografia = "http://192.168.1.33:8080/avatar1.png";
        }

        this.servicio2.postUsuario(this.NUEVO)
          .subscribe((data) => this.auxiliar(data));
      } else {
        alert('Faltan Datos Obligatorios');
      }
    }
  }

  async auxiliar(data) {
    if (data.status === "ERROR2") {
      alert('Ocurrio un ERROR al tratar \n De Crear su Cuenta Favor \n Intentarlo denuevo mas Tarde');
    } else {
      if (this.NUEVO2.fotografia2 !== "false") {
        this.servicio2.uploadImage(this.NUEVO.avatar)
          .subscribe(() => console.log('ok3'));
      }
      this.servicio2.confimausuari(this.NUEVO)
        .subscribe(()=> console.log('ok correo'));
      alert('Su Cuenta ha sido Registrada \n Se envio un correo para la Confirmacion');
      this.router.navigateByUrl('/login');
      
    }
  }

}
