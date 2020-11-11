import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  PRODUCTO_VER: any;
  palabras : any;
  constructor(private httpclient:HttpClient) { }

  postProducto(producto:any){
    return this.httpclient.post('http://192.168.1.33:8080/producto',producto)
  }

  uploadImage(imagen:File){
    const formData = new FormData();
    formData.append('userImage',imagen);
    return this.httpclient.post('http://192.168.1.33:8080/imagenusuario',formData);
  }

  getidpublicion(){
    return this.httpclient.get('http://192.168.1.33:8080/ultimopro');
  }

  postpalabra(palabra:any){
    return this.httpclient.post('http://192.168.1.33:8080/palabra',palabra);
  }

  getcatalogo(){
    return this.httpclient.get('http://192.168.1.33:8080/producto');
  }

  getCategoria(){
    return this.httpclient.get('http://192.168.1.33:8080/categoria');
  }

  getPalabrasClave(idprodcuto:any){
    return this.httpclient.post('http://192.168.1.33:8080/palabraclave',idprodcuto).toPromise();
  }

  postcomentario(coment:any){
    return this.httpclient.post('http://192.168.1.33:8080/comentario',coment);
  }

  getcomentario(id_public:any){
    return this.httpclient.post('http://192.168.1.33:8080/loscomentario',id_public);
  }

  setProductoVer(producto) {
    localStorage.setItem('producto', JSON.stringify(producto));
  }

  getProductoVer() {
    this.PRODUCTO_VER = JSON.parse(localStorage.getItem('producto'));
    return this.PRODUCTO_VER;
  }

  getPalabrasVer(){
    this.palabras = JSON.parse(localStorage.getItem('palabras'));
    return this.palabras;
  }

}
