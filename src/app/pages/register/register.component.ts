import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  formRegister = new FormGroup({
    documento: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    typeDoc: new FormControl('', [Validators.required]),
    terminos: new FormControl(false, [Validators.required]),
  });

  formRegisterPersonal = new FormGroup({
    correo: new FormControl('', [Validators.required]),
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
  });

  formContacto = new FormGroup({
    celular: new FormControl('', [Validators.required])
  })

  formContrasena : FormGroup;

  paso: string = 'datos-personales';

  documents:any = [
    { typeDocument: 'cedula', doc: "Cedula de ciudadania"},
    { typeDocument: 'cedulaExtranjera', doc: "Cedula de extrajeria" }
  ];

  constructor(private router: Router, private service: AppService, private dialog: MatDialog, public _fb: FormBuilder) { }

  ngOnInit() {
    this.formContrasena = this._fb.group({
      password: new FormControl('', [Validators.required,Validators.minLength(6)]),
      cpass: new FormControl('', [Validators.required,Validators.minLength(6)])
    }, {validators: this.passwordMatch('password', 'cpass')})
  }

  passwordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) =>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ passwordMatch: true });
      }else {
          matchingControl.setErrors(null);
      };
    };
  };

  backPage(url){
    this.router.navigateByUrl(url)
  }

  changePaso(paso: string){
    this.paso = paso;
  }

  registrar(){
    this.blockUI.start('Cargando');
    var dataservice = {
      "nombre": this.formRegisterPersonal.get('nombres').value + ' ' + this.formRegisterPersonal.get('apellidos').value,
      "celular": this.formContacto.get('celular').value.toString(),
      "documento": this.formRegister.get('documento').value.toString(),
      "correo": this.formRegisterPersonal.get('correo').value,
      "clave": this.formContrasena.get('password').value
    };
    this.service.post('visitante', dataservice).subscribe((data: any) => {
      this.blockUI.stop();
      if (data.error == 0) {
        this.dialog.open(contentDialogErrorRegistro,{
          data: {
            text: data.response,
            actions: true,
          },
          width : '470px' 
        });
      } else {
        this.dialog.open(contentDialogErrorRegistro,{
          data: {
            text: data.response,
            actions: true,
          },
          width : '470px' 
        });
      }
      this.router.navigateByUrl('/')
    });
  }

}

@Component({
  selector: 'contentDialogErrorRegistro',
  templateUrl: '../login/contentDialogError.html',
})
export class contentDialogErrorRegistro {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<contentDialogErrorRegistro>,
    public router: ActivatedRoute,
    public _router: Router){}
}