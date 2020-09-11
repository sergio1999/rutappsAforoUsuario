import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    documento: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    password: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.formLogin.value)
  }

}
