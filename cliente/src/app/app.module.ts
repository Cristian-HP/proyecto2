import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }from '@angular/forms'
import { SuccesComponent } from './components/succes/succes.component';
import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UploadComponent } from './components/upload/upload.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { AddcarComponent } from './components/addcar/addcar.component';
import { HeaderUComponent } from './components/header-u/header-u.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    SuccesComponent,
    PerfilComponent,
    UploadComponent,
    ProductoComponent,
    CatalogoComponent,
    AddcarComponent,
    HeaderUComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
