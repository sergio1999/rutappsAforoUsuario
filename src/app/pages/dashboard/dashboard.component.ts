import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  datosQr : String;
  data : any;
  @ViewChild('codigo', { static: true }) codigoElement: ElementRef;

  constructor(private route : Router) { }

  ngOnInit() {
    if(!JSON.parse(window.localStorage.getItem('visitante'))){
      this.route.navigateByUrl('/')
    }else{
      this.data = JSON.parse(window.localStorage.getItem('visitante'));
      console.log(this.data)
      var datos = {
        documento: this.data.documento,
        celular: this.data.celular
      }
      this.datosQr = JSON.stringify(datos);
    }
  }

  editprofile(){
    console.log('edit')
  }

  saveAsImage(codigo: any) {
    var canvas = codigo.qrcElement.nativeElement.querySelector("canvas");
    var dataURL = canvas.toDataURL();

    // fetches base 64 date from image
    const parentElement = dataURL;

    // converts base 64 encoded image to blobData
    let blobData = this.convertBase64ToBlob(parentElement);

    // saves as image
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
      window.navigator.msSaveOrOpenBlob(blobData, 'Qrcode');
    } else { // chrome
      const blob = new Blob([blobData], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'codigo-qr';
      link.click();
    }
  }

  private convertBase64ToBlob(Base64Image: any) {
    // SPLIT INTO TWO PARTS
    const parts = Base64Image.split(';base64,');
    // HOLD THE CONTENT TYPE
    const imageType = parts[0].split(':')[1];
    // DECODE BASE64 STRING
    const decodedData = window.atob(parts[1]);
    // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
    const uInt8Array = new Uint8Array(decodedData.length);
    // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // RETURN BLOB IMAGE AFTER CONVERSION
    return new Blob([uInt8Array], { type: imageType });
  }

}
