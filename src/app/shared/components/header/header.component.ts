import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ResolveEnd } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  registro: boolean = false;
  cerrar: boolean = false;
  iniciar: boolean = false;

  constructor(private router: Router) { 
    router.events.subscribe((val) => {

      if(router.url.toString() == '/' || router.url.toString() == '/login'){
        this.registro = true;
        this.cerrar = false;
        this.iniciar = false;
      }else if(router.url.toString() == '/registro' || router.url.toString() == '/recuperar-contrasena'){
        this.registro = false;
        this.cerrar = false;
        this.iniciar = true;
      }else if(router.url.toString() == '/dashboard' || router.url.toString() == '/editar-perfil'){
        this.registro = false;
        this.cerrar = true;
        this.iniciar = false;
      }

    })
  }

  redirectTo(url){
    this.router.navigateByUrl(url)
  }

  ngOnInit() { }

  logout(){
    window.localStorage.clear()
    this.router.navigateByUrl('/');
  }

}
