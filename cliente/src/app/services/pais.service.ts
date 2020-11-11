import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private httpclient:HttpClient) { }
  pais(){
    return this.httpclient.get('http://192.168.1.33:8080/pais');
  }
  postpais(id:any){
    return this.httpclient.post('http://192.168.1.33:8080/pais',id);
  }
}
