import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-u',
  templateUrl: './header-u.component.html',
  styleUrls: ['./header-u.component.css']
})
export class HeaderUComponent implements OnInit {

  constructor(private router:Router) { }
  USUARIO: any = {};
  ngOnInit(): void {
    this.USUARIO = JSON.parse(localStorage.getItem('UsuarioL'));
  }


  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
