import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppFirebaseService } from 'src/app/service/app-firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { stringify } from 'querystring';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  formLogin = new FormGroup({
    correo: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  hide: boolean = true;
  usuarios: any;
  visitantes = [];

  constructor(private fire : AppFirebaseService, private route: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }

  onSubmit(){
    this.blockUI.start('Cargando');
    this.fire.getUsuarios().snapshotChanges().subscribe((data) => {
      data.forEach( (e: any) => {
        this.visitantes.push({
          documento: e.payload.doc.id,
          data: e.payload.doc.data()
        })
      })
      this.blockUI.stop();
      this.getUser();
    });
  }

  getUser(){
    var exist = false;
    for (let i = 0; i < this.visitantes.length; i++) {
      if(this.visitantes[i].data.clave === this.formLogin.get('password').value && this.visitantes[i].data.correo === this.formLogin.get('correo').value){
        var datosCliente = this.visitantes[i].data;
        datosCliente.uid = this.visitantes[i].documento;
        exist = true;
      }
    }

    if(exist){
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
