import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppFirebaseService } from 'src/app/service/app-firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { stringify } from 'querystring';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    correo: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  usuarios: any;
  visitantes = [];

  constructor(private fire : AppFirebaseService, private route: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }

  onSubmit(){

    this.fire.getUsuarios().snapshotChanges().subscribe((data) => {
      data.forEach( (e: any) => {
        this.visitantes.push({
          documento: e.payload.doc.id,
          data: e.payload.doc.data()
        })
        this.getUser();
      })
    });
  }

  getUser(){
    for (let i = 0; i < this.visitantes.length; i++) {
      if(this.visitantes[i].data.clave === this.formLogin.get('password').value && this.visitantes[i].data.correo === this.formLogin.get('correo').value){
        var datosCliente = this.visitantes[i].data;
        window.localStorage.setItem('visitante', JSON.stringify(datosCliente) )
        this.route.navigateByUrl('dashboard');
      }else{
        this.dialog.open(contentDialogError,{
          data: {
            text: 'Usuario no registrado',
            actions: true,
          },
          width : '470px' 
        });
      }
    }
  }

}

@Component({
  selector: 'contentDialogError',
  templateUrl: 'contentDialogError.html',
})
export class contentDialogError {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<contentDialogError>,
    public router: ActivatedRoute,
    public _router: Router){}
}
