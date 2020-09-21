import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-retrieve-pass',
  templateUrl: './retrieve-pass.component.html',
  styleUrls: ['./retrieve-pass.component.css']
})
export class RetrievePassComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  regiterForm = new FormGroup({
    correo: new FormControl('',[Validators.required])
  })

  sendEmail: boolean = false;

  constructor(private router: Router, private service : AppService) { }

  ngOnInit() {
  }

  backPage(url){
    this.router.navigateByUrl(url)
  }

  sendPassword(){
    this.blockUI.start('Cargando');
    if (this.regiterForm.get('correo').value != "juankmatiz2017@gmail.com"){
      this.sendEmail = true;
      this.blockUI.stop();
    }else {
      this.blockUI.stop();
    }
    // this.service.post()
  }

}
