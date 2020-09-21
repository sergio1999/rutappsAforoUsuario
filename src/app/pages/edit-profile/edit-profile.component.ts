import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  ciudades: any = [
    {id: 1, ciudad: "Bogotá D.C"}, {id: 2, ciudad: "Medellín"},
    {id: 3, ciudad: "Cali"}, {id: 4, ciudad: "Barranquilla"},
    {id: 5, ciudad: "Cartagena de Indias"}, {id: 6, ciudad: "Soacha	"},
    {id: 7, ciudad: "Cúcuta"}, {id: 8, ciudad: "Soledad"},
    {id: 9, ciudad: "Bucaramanga"}, {id: 10, ciudad: "Bello"},
    {id: 11, ciudad: "Villavicencio"}, {id: 12, ciudad: "Ibagué"},
    {id: 13, ciudad: "Santa Marta"}, {id: 14, ciudad: "Valledupar"},
    {id: 15, ciudad: "Manizales"}, {id: 16, ciudad: "Pereira"},
    {id: 17, ciudad: "Montería"}, {id: 18, ciudad: "Neiva"},
    {id: 19, ciudad: "Pasto"}, {id: 20, ciudad: "Armenia"}
  ]

  formEditProfile = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    // apellido: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    telefono_celular: new FormControl('', [Validators.required]),
    cedula_de_ciudadania: new FormControl('', [Validators.required]),
    correo_electronico: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required]),
    // ciudad_de_recidencia: new FormControl('', [Validators.required]),
  })

  data : any;
  hide: boolean = true;

  constructor(private router: Router,  private service: AppService, private dialog: MatDialog) { }

  ngOnInit() {
    if(!JSON.parse(window.localStorage.getItem('visitante'))){
      this.router.navigateByUrl('/')
    }else{
      this.data = JSON.parse(window.localStorage.getItem('visitante'));
      this.formEditProfile.controls['nombre'].setValue(this.data.nombre);
      // this.formEditProfile.controls['apellido'].setValue(this.data.);
      this.formEditProfile.controls['direccion'].setValue(this.data.direccion);
      this.formEditProfile.controls['telefono_celular'].setValue(this.data.celular);
      this.formEditProfile.controls['cedula_de_ciudadania'].setValue(this.data.documento);
      this.formEditProfile.controls['correo_electronico'].setValue(this.data.correo);
      this.formEditProfile.controls['contrasena'].setValue(this.data.clave);
      // this.formEditProfile.controls['ciudad_de_recidencia'].setValue(this.data.ciudad);
    }
  }

  backPage(url){
    this.router.navigateByUrl(url)
  }

  editatPerfil(){
    this.blockUI.start('Cargando');

    var data = {
      uid: this.data.uid,
      nombre: this.formEditProfile.get('nombre').value,
      celular: this.formEditProfile.get('telefono_celular').value,
      documento: this.formEditProfile.get('cedula_de_ciudadania').value,
      correo: this.formEditProfile.get('correo_electronico').value,
      clave: this.formEditProfile.get('contrasena').value,
      direccion: this.formEditProfile.get('direccion').value
    }

    this.service.put('visitante', data).subscribe((data: any) => {
      this.blockUI.stop();
      if (data.error == 0) {
        this.dialog.open(contentDialogErrorEditar,{
          data: {
            text: data.response,
            actions: true,
          },
          width : '470px' 
        });
        this.router.navigateByUrl('/dashboard')
      } else {
        this.dialog.open(contentDialogErrorEditar,{
          data: {
            text: data.response,
            actions: true,
          },
          width : '470px' 
        });
        this.router.navigateByUrl('/dashboard')
      }
    });
  }

}

@Component({
  selector: 'contentDialogErrorEditar',
  templateUrl: '../login/contentDialogError.html',
})
export class contentDialogErrorEditar {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<contentDialogErrorEditar>,
    public router: ActivatedRoute,
    public _router: Router){}
}