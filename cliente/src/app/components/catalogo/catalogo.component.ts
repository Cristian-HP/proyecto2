import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {


  ELEMENT_DATA: any = [];
  CATEGORIAS: any = [];
  AUXILIAR: any = [];
  PADRE: any = [];
  palabrascla:any;
  usuario: any;
  filtro: any = "";
  asc: boolean;
  des: boolean;
  constructor(private toastr: ToastrService, private router: Router,private servicio: ProductoService) { }

  ngOnInit(): void {
    this.getproducto();
    this.getCategoria();
    if ('true'===localStorage.getItem('logeado')) {
      this.usuario=JSON.parse(localStorage.getItem('UsuarioL'));
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  async getproducto(){
    this.servicio.getcatalogo()
      .subscribe(data => {
        this.ELEMENT_DATA = data;
        this.AUXILIAR = this.ELEMENT_DATA;
      })
  }


  async getCategoria(){
    this.servicio.getCategoria()
      .subscribe(data=>{
        this.PADRE=data;
      })
  }

  public porPrecio() {
    this.ELEMENT_DATA = this.ELEMENT_DATA.sort((a,b) => {
      return +a.precio - +b.precio;
    })
    this.asc = true;
    this.des = false;
  }

  public ascendente() {
    if(!this.asc) {
      this.ELEMENT_DATA = this.ELEMENT_DATA.reverse();
      this.asc = true
      this.des = false;
    }
  }

  public descendente() {
    if(!this.des) {
      this.ELEMENT_DATA = this.ELEMENT_DATA.reverse();
      this.des = true;
      this.asc = false;
    }
  }

  public filtroCategoria(id: string) {
    let lista = this.AUXILIAR;
    lista = lista.filter(element => element.categoria === id);
    this.ELEMENT_DATA = lista;
  }

  public todos() {
    this.ELEMENT_DATA = this.AUXILIAR;
  }

  public async seeProduct(producto:any) {
    await this.palabraclaves(producto);
    
    this.servicio.setProductoVer(producto);

    this.router.navigateByUrl('/detalle');
  }


  async palabraclaves(idproducto:any){
    let aux2 : any={
      id_publicacion:""
    };
    aux2.id_publicacion=idproducto.id_publicacion;
    this.servicio.getPalabrasClave(aux2)
    .then(async data=>{
      await localStorage.setItem('palabras', JSON.stringify(data));
    })
  }

  filtrar(){
    
  }

}
