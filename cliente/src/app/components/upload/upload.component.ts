import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  imageForm : FormGroup;
  image:any = "../../../assets/upload1.png";
  constructor() { }

  ngOnInit(): void {
    this.imageForm = new FormGroup({
      name:new FormControl(null,Validators.required),
      file:new FormControl(null,Validators.required)
    })
  }

  onFileChange(){
    console.log("la imagen");
  }

  onSubmit(){
    console.log("se envia Formulario")
  }

}
