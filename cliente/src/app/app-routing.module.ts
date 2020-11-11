import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SuccesComponent} from './components/succes/succes.component';
import {PerfilComponent} from './components/perfil/perfil.component';
import {ProductoComponent} from './components/producto/producto.component';
import {CatalogoComponent} from './components/catalogo/catalogo.component';
import {AddcarComponent} from './components/addcar/addcar.component';
import {HeaderUComponent} from './components/header-u/header-u.component'

const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'login',
    component: SignInComponent
  },
  {
    path:'registro',
    component: SignUpComponent
  },
  {
    path:'succes',
    component: SuccesComponent
  },
  {
    path:'perfil',
    component:PerfilComponent
  },
  {
    path:'newproducto',
    component:ProductoComponent
  },
  {
    path:'catalogo',
    component:CatalogoComponent
  },
  {
    path:'detalle',
    component:AddcarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
