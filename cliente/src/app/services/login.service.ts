import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpclient:HttpClient) { }

  login(data:any){
    return this.httpclient.post('http://192.168.1.33:8080/login',data);
  }
}
