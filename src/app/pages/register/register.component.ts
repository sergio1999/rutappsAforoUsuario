import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = new FormGroup({
    documento: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    typeDoc: new FormControl('', [Validators.required]),
    terminos: new FormControl(false, [Validators.required]),
  });

  documents:any = [
    { typeDocument: 'cedula', doc: "Cedula de ciudadania"},
    { typeDocument: 'cedulaExtranjera', doc: "Cedula de extrajeria" }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backPage(url){
    this.router.navigateByUrl(url)
  }

}
